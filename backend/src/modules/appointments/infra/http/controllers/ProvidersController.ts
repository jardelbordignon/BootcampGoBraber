import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListProvidersService from '@/modules/appointments/services/ListProvidersService'

export default class ProvidersController {

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listProvidersService = dependencyInjector.resolve(ListProvidersService)

    const providers = await listProvidersService.execute({ user_id })

    return response.json(classToClass(providers))
  }

}
