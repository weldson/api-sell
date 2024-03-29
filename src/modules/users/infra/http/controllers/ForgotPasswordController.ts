import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
