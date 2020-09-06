import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { MailmanOptions } from "@squareboat/nest-mailman";

export enum WebhookSupportMethod {
  GET = "GET",
  POST = "POST",
}

export interface WebhookOptions {
  url: string;
  method: keyof typeof WebhookSupportMethod;
  header?: Record<string, any>;
  requestBuilder?: (payload: any) => Record<string, any>;
}

export interface WebhookConfig {
  webhookOptions: WebhookOptions[];
}

export interface EyewitnessOptions {
  emails: string[];
  subject?: string;
  mailman: MailmanOptions;
  webhookConfig?: WebhookOptions[];
}

export interface EyewitnessOptionsFactory {
  createEyewitnessOptions(): Promise<EyewitnessOptions> | EyewitnessOptions;
}

export interface EyewitnessAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useExisting?: Type<EyewitnessOptions>;
  useClass?: Type<EyewitnessOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EyewitnessOptions> | EyewitnessOptions;
  inject?: any[];
}
