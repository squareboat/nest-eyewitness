import { Injectable, HttpService } from "@nestjs/common";
@Injectable()
export class HttpMethodService {
  private static httpSerice: HttpService;
  constructor(private httpService: HttpService) {
    HttpMethodService.httpSerice = httpService;
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
    payload?: Record<string, any>;
    header?: Record<string, any>;
  }) {
    const { url, payload, header } = httpCallOptions;
    return HttpMethodService.httpSerice
      .get(`${url}${HttpMethodService.makeQueryParam(payload)}`, {
        headers: header,
      })
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  static post(httpCallOptions: {
    url: string;
    payload?: Record<string, any> | string;
    header?: Record<string, any>;
  }) {
    const { url, payload, header } = httpCallOptions;
    return HttpMethodService.httpSerice
      .post(url, payload, { headers: header })
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
