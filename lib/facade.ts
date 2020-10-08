import { ArgumentsHost } from "@nestjs/common";
import { EyewitnessService } from "./service";

export class Eyewitness {
  private static doNotReportExceptions: any[] = [];

  /**
   * Function for adding exceptions to "doNoReport" list.
   * @param exceptions
   */
  static doNotReport(exceptions: Array<any>) {
    const exceptionNames: any[] = [];
    exceptions.forEach((e) => {
      exceptionNames.push(e.name);
    });
    Eyewitness.doNotReportExceptions = exceptionNames;
  }

  /**
   * Watch the exception filter, runs on every thrown exception
   * @param exception
   * @param host
   */
  static watch(exception: any, host: ArgumentsHost) {
    if (Eyewitness.doNotReportExceptions.includes(exception.constructor.name)) {
      return;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<any>();

    EyewitnessService.alert(exception, host);

    return {};
  }
}
