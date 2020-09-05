import { EyewitnessOptions, WebhookOptions } from "./interfaces";
import { Injectable, Inject } from "@nestjs/common";
import { EYEWITNESS_OPTIONS } from "./provider.map";
import { Mailman } from "@squareboat/nest-mailman";
import { HttpMethodService } from "./httpMethod.service";
import { WebhookSupportMethod } from "./webhookSupportMethod.enu";

@Injectable()
export class EyewitnessService {
  private static config: EyewitnessOptions;
  constructor(@Inject(EYEWITNESS_OPTIONS) private config: EyewitnessOptions) {
    EyewitnessService.config = config;
  }

  static alert(options: Record<string, any>) {
    const { emails, view, subject, webhookConfig } = EyewitnessService.config;
    const finalSubject = (subject || ":error Error Captured").replace(
      ":error",
      options.exception.name
    );

    Mailman.init().to(emails).subject(finalSubject).view(view, options).queue();

    if (webhookConfig) {
      webhookConfig.forEach((e) => {
        EyewitnessService.handleAPICall(e, options);
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

    if (method.toLowerCase() == WebhookSupportMethod.GET) {
      return HttpMethodService.get(httpCallOptions);
    } else {
      return HttpMethodService.post(httpCallOptions);
    }
  }
}
