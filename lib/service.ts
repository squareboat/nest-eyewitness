import { EyewitnessOptions } from "./interfaces";
import { Injectable, Inject, HttpService } from "@nestjs/common";
import { EYEWITNESS_OPTIONS } from "./provider.map";
import { Mailman } from "@squareboat/nest-mailman";

@Injectable()
export class EyewitnessService {
  private static config: EyewitnessOptions;
  private static httpService: HttpService;
  constructor(
    @Inject(EYEWITNESS_OPTIONS) private config: EyewitnessOptions,
    private httpService: HttpService
  ) {
    EyewitnessService.config = config;
    EyewitnessService.httpService = httpService;
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
        EyewitnessService.httpAPICall(e.url, e.method, e.header, options);
      });
    }
  }

  static httpAPICall(
    url: string,
    method: string,
    header: Record<string, any>,
    payload: Record<string, any>
  ) {
    switch (method.toLowerCase()) {
      case "get": {
        return EyewitnessService.httpService.get(
          `${url}${EyewitnessService.makeQueryParam(payload)}`,
          {
            headers: header,
          }
        );
      }
      case "post": {
        return EyewitnessService.httpService.post(url, payload, {
          headers: header,
        });
      }
      case "patch": {
        return EyewitnessService.httpService.patch(url, payload, {
          headers: header,
        });
      }
    }
  }

  static makeQueryParam = (payload: Record<string, any>) => {
    let query =
      "?" +
      Object.keys(payload)
        .map((data) => {
          return data + "=" + encodeURIComponent(payload[data]);
        })
        .join("&");

    return query;
  };
}
