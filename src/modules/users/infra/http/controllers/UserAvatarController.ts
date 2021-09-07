import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService'

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService()

    const user = updateAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename as string
    })

    return response.json(classToClass(user))
  }
}

export default UserAvatarController
