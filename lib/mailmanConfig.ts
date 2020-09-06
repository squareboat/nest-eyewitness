import {
  MailmanOptions,
  MailmanOptionsFactory,
} from '@squareboat/nest-mailman';
import { EyewitnessService } from './service';
import { EyewitnessModule } from './module';

export class MailmanConfigFactory implements MailmanOptionsFactory {
  createMailmanOptions(): MailmanOptions | Promise<MailmanOptions> {
    return EyewitnessService.getConfig().mailman;
  }
}
