
import AppError from '@/shared/errors/AppError'

import FakeStorageProvider from '@/shared/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatarService: UpdateUserAvatarService

describe('UpdateUserAvatarService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository, fakeStorageProvider
    )
  })

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })


  it('should not be able to update user avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })

})
