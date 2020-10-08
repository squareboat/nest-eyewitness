import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { MailmanOptions } from "@squareboat/nest-mailman";

/**
 * Supported Webhook methods
 */
export enum WebhookSupportMethod {
  GET = "GET",
  POST = "POST",
}

/**
 * Webhook options
 */
export interface WebhookOptions {
  url: string;
  method: keyof typeof WebhookSupportMethod;
  header?: Record<string, any>;
  requestBuilder?: (payload: any) => Record<string, any>;
}

/**
 * EyewitnessOptions
 * contains all necessary information
 */
export interface EyewitnessOptions {
  emails: string[];
  subject?: string;
  mailman: MailmanOptions;
  webhooks?: WebhookOptions[];
}

/**
 * EyewitnessOptionsFactory,
 * to be used in useClass method in EyewitnessAsyncOptions config
 */
export interface EyewitnessOptionsFactory {
  createEyewitnessOptions(): Promise<EyewitnessOptions> | EyewitnessOptions;
}

/**
 * EyewitnessAsyncOptions,
 * to be used for async registration and loading of dynamic configurations
 */
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
