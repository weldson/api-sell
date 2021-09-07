import { getCustomRepository } from 'typeorm'

import AppError from '@shared/errors/AppError'
import User from '../typeorm/entities/User'
import UsersRepository from '../typeorm/repositories/UsersRepository'
import { compareSync, hashSync } from 'bcryptjs'

interface IRequest {
  userId: string
  name: string,
  email: string
  password?: string
  old_password?: string
}

class UpdateProfileService {
  public async execute({
    userId,
    name,
    email,
    password,
    old_password
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const userUpdateEmail = await usersRepository.findByEmail(email)

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError('Email already in use.')
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.')
    }

    if (password && old_password) {
      const checkOldPassword = compareSync(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.')
      }

      user.password = hashSync(password, 8)
    }

    user.name = name
    user.email = email

    await usersRepository.save(user)

    return user
  }
}

export default UpdateProfileService
