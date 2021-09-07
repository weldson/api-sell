import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import CreateUserService from '../services/CreateUserService'
import ListUserService from '../services/ListUserService'

class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService()

    const users = await listUser.execute()
    return response.json(classToClass(users))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.json(classToClass(user))
  }
}
export default UsersController
