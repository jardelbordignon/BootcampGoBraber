import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '@/shared/errors/AppError'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@/modules/users/repositories/IUserTokensRepository'
import IHashProvider from '@/modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string
  password: string
}

@injectable()
export default class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}


  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAtPlus2h = addHours(userToken.created_at, 2)

    if (isAfter(Date.now(), tokenCreatedAtPlus2h)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }

}
