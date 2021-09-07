import { getCustomRepository } from 'typeorm'

import User from '../typeorm/entities/User'
import UsersRepository from '../typeorm/repositories/UsersRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  userId: string
}

class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.')
    }

    return user
  }
}

export default ShowProfileService
