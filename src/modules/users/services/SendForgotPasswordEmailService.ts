import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';

import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import EtherialMail from '@config/mail/EtherialMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherialMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Sell] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
