import { Injectable, HttpService } from "@nestjs/common";
import * as querystring from "query-string";

@Injectable()
export class CustomHttpService {
  private static httpSerice: HttpService;
  constructor(private httpService: HttpService) {
    CustomHttpService.httpSerice = httpService;
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

  static get(httpCallOptions: {
    url: string;
    payload: Record<string, any>;
    header: Record<string, any>;
  }) {
    const { url, payload, header } = httpCallOptions;
    return CustomHttpService.httpSerice
      .get(
        `${url}?${querystring.stringify(payload, { arrayFormat: "bracket" })}`,
        {
          headers: header,
        }
      )
      .toPromise()
      .then((response: Record<string, any>) => {
        return response;
      })
      .catch((error: Record<string, any>) => {
        throw error;
      });
  }

  static post(httpCallOptions: {
    url: string;
    payload: Record<string, any> | string;
    header: Record<string, any>;
  }) {
    const { url, payload, header } = httpCallOptions;
    return CustomHttpService.httpSerice
      .post(url, payload, { headers: header })
      .toPromise()
      .then((response: Record<string, any>) => {
        return response;
      })
      .catch((error: Record<string, any>) => {
        throw error;
      });
  }
}
