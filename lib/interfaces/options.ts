import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export enum WebhookSupportMethod {
  GET = "GET",
  POST = "POST",
}

export interface WebhookOptions {
  url: string;
  method: WebhookSupportMethod;
  header: Record<string, any>;
  requestBuilder?: (payload: any) => Record<string, any>;
}

export interface WebhookConfig {
  webhookOptions: WebhookOptions[];
}

export interface EyewitnessOptions {
  emails: string[];
  view: string;
  subject?: string;
  webhookConfig?: WebhookOptions[];
}

export interface EyewitnessOptionsFactory {
  createEyewitnessOptions(): Promise<EyewitnessOptions> | EyewitnessOptions;
}

export interface EyewitnessAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useExisting?: Type<EyewitnessOptions>;
  useClass?: Type<EyewitnessOptions>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EyewitnessOptions> | EyewitnessOptions;
  inject?: any[];
}
