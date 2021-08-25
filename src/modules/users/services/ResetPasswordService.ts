import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { isAfter, addHours } from 'date-fns'

import UsersRepository from '../typeorm/repositories/UsersRepository'
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository'
import User from '../typeorm/entities/User'
import { hashSync } from 'bcryptjs'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const userToken = await userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User Token does not exists.')
    }

    const user = await usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const compareDate = addHours(userToken.created_at, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = hashSync(password, 8)

    await usersRepository.save(user)
  }
}

export default ResetPasswordService
