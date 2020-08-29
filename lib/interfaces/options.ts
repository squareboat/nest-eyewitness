import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface EyewitnessOptions {
  emails: string[];
  view: string;
  subject?: string;
}

export interface EyewitnessOptionsFactory {
  createEyewitnessOptions(): Promise<EyewitnessOptions> | EyewitnessOptions;
}

export interface EyewitnessAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<EyewitnessOptions>;
  useClass?: Type<EyewitnessOptions>;
  useFactory?: (
    ...args: any[]
  ) => Promise<EyewitnessOptions> | EyewitnessOptions;
  inject?: any[];
}
