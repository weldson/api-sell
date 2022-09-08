import { Request, Response } from 'express';
import ResetPasswordEmailService from '../../../services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response) {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordEmailService();

    await resetPassword.execute({ token, password });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
