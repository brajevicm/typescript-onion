import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { provide } from 'inversify-binding-decorators';

import { Mailer } from '../../Core/Kernel/Mailer';
import { KernelTypes } from '../../Config/Types/KernelTypes';

@provide(KernelTypes.Mailer)
export class NodeMailer implements Mailer {
  public async send(): Promise<void> {
    if (process.env.MAIL_ENABLED) {
      const from = '"Support" <support@email.com>';
      const to = 'to@email.com';

      const transport: Mail = this.setup();

      const email = {
        from,
        to,
        subject: 'Mail subject',
        text: 'Mail body.'
      };

      await transport.sendMail(email);
    }
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
