import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import UpdateProfileService from '../../../services/UpdateProfileService'
import ShowProfileService from '../../../services/ShowProfileService'

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService()
    const userId = request.user.id

    const user = await showProfile.execute({ userId })

    return response.json(classToClass(user))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body
    const updateProfile = new UpdateProfileService()
    const userId = request.user.id

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      old_password
    })

    return response.json(classToClass(user))
  }
}

export default ProfileController
