import { EyewitnessOptions } from './interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { EYEWITNESS_OPTIONS } from './provider.map';
import { Mailman } from '@squareboat/nest-mailman';

@Injectable()
export class EyewitnessService {
  private static config: EyewitnessOptions;
  constructor(@Inject(EYEWITNESS_OPTIONS) private config: EyewitnessOptions) {
    EyewitnessService.config = config;
  }

  static alert(options: Record<string, any>) {
    const { emails, view, subject } = EyewitnessService.config;
    const finalSubject = (subject || ':error Error Captured').replace(
      ':error',
      options.exception.name,
    );

    Mailman.init()
      .to(emails)
      .subject(finalSubject)
      .view(view, options)
      .queue();
  }
}
