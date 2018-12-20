import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { provide } from 'inversify-binding-decorators';

import { Mailer } from '../../Core/Kernel/Mailer';
import KernelTypes from '../../Config/Types/KernelTypes';

@provide(KernelTypes.Mailer)
export class NodeMailer implements Mailer {
  public async send(): Promise<void> {
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

  private setup(): Mail {
    return createTransport({
      host: 'host',
      port: 123,
      auth: {
        user: 'user',
        pass: 'pass'
      }
    });
  }
}
