import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';

import { Mailer } from '../../Core/Kernel/Mailer';
import { KernelTypes } from '../../Config/Types/KernelTypes';
import { Logger } from '../../Core/Kernel/Logger';

@provide(KernelTypes.Mailer)
export class NodeMailer implements Mailer {
  private readonly isEnabled: boolean = JSON.parse(process.env.MAIL_ENABLED);

  constructor(@inject(KernelTypes.Logger) private readonly logger: Logger) {}

  public async send(to: string, subject: string, text: string): Promise<void> {
    if (this.isEnabled) {
      const from = '"Support" <support@email.com>';
      const to = 'to@email.com';

      const transport: Mail = this.setup();

      const email = {
        from,
        to,
        subject: 'Mail subject',
        text: 'Mail body.'
      };

      try {
        await transport.sendMail(email);
        this.logger.logInfo('Email sent, info:', email);
      } catch (e) {
        this.logger.logError(e.message);
      }
    }
    this.logger.logInfo('Email not sent, disabled');
  }

  private setup(): Mail {
    return createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }
}
