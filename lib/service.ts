import {
  EyewitnessOptions,
  WebhookOptions,
  WebhookSupportMethod,
} from "./interfaces";
import { CustomHttpService } from "./http";
import { Injectable, Inject, ArgumentsHost } from "@nestjs/common";
import { EYEWITNESS_OPTIONS } from "./provider.map";
import { Mailman } from "@squareboat/nest-mailman";

@Injectable()
export class EyewitnessService {
  private static config: EyewitnessOptions;
  constructor(@Inject(EYEWITNESS_OPTIONS) private config: EyewitnessOptions) {
    EyewitnessService.config = config;
  }

  static alert(exception: any, host: ArgumentsHost) {
    const { emails, view, subject, webhookConfig } = EyewitnessService.config;
    const payload = this.buildPayload(exception, host);
    const finalSubject = (subject || ":error Error Captured").replace(
      ":error",
      payload.exception.name
    );

    Mailman.init().to(emails).subject(finalSubject).view(view, payload).queue();

    if (Array.isArray(webhookConfig) && webhookConfig.length > 0) {
      webhookConfig.forEach((e) => {
        EyewitnessService.handleAPICall(e, payload);
      });
    }
  }

  static handleAPICall(
    webhookOptions: WebhookOptions,
    defaultPayload: Record<string, any>
  ) {
    const { url, method, header } = webhookOptions;
    let httpCallOptions = {
      url: url,
      payload: defaultPayload,
      header: header,
    };

    if (webhookOptions.requestBuilder) {
      httpCallOptions.payload = webhookOptions.requestBuilder(defaultPayload);
    }

    if (method == WebhookSupportMethod.GET) {
      return CustomHttpService.get(httpCallOptions);
    }
    return CustomHttpService.post(httpCallOptions);
  }

  static buildPayload(
    exception: any,
    host: ArgumentsHost
  ): Record<string, any> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<any>();

    return {
      exception: {
        name: exception.constructor.name,
        message: exception.message,
        stack: exception.stack.toString(),
      },
      request: {
        timestamp: new Date().toString(),
        headers: JSON.stringify(request.headers),
        payload: JSON.stringify({
          ...request.query,
          ...request.body,
          ...request.params,
        }),
        url:
          request.protocol + "://" + request.get("host") + request.originalUrl,
      },
    };
  }
}
