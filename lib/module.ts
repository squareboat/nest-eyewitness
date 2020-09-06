import {
  Module,
  DynamicModule,
  Provider,
  Type,
  HttpModule,
  Inject,
} from "@nestjs/common";
import {
  EyewitnessOptions,
  EyewitnessAsyncOptions,
  EyewitnessOptionsFactory,
} from "./interfaces";
import { EYEWITNESS_OPTIONS } from "./provider.map";
import { EyewitnessService } from "./service";
import { CustomHttpService } from "./http";
import { MailmanModule } from "@squareboat/nest-mailman";
import { MailmanConfigFactory } from "./mailmanConfig";

@Module({
  imports: [HttpModule],
  providers: [EyewitnessService, CustomHttpService, MailmanConfigFactory],
  exports: [EyewitnessService],
})
export class EyewitnessModule {
  /**
   * Register options
   * @param options
   */
  static register(options: EyewitnessOptions): DynamicModule {
    return {
      global: true,
      module: EyewitnessModule,
      imports: [
        MailmanModule.registerAsync({
          useClass: MailmanConfigFactory,
        }),
      ],
      exports: [MailmanConfigFactory],
      providers: [
        EyewitnessService,
        MailmanConfigFactory,
        {
          provide: EYEWITNESS_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(options: EyewitnessAsyncOptions): DynamicModule {
    return {
      global: true,
      module: EyewitnessModule,
      providers: [
        MailmanConfigFactory,
        this.createStorageOptionsProvider(options),
        EyewitnessService,
      ],
      exports: [MailmanConfigFactory],
    };
  }

  private static createStorageOptionsProvider(
    options: EyewitnessAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EYEWITNESS_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<EyewitnessOptions>,
    ];

    return {
      provide: EYEWITNESS_OPTIONS,
      useFactory: async (optionsFactory: EyewitnessOptionsFactory) =>
        await optionsFactory.createEyewitnessOptions(),
      inject,
    };
  }
}
