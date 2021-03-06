import AppError from '@/shared/errors/AppError'

import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

describe('ListProviderDayAvailabilityService', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )

    // Altera o funcionamento padrão do método Date retorando 2021/jan/1 11:00:00
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 11).getTime()
    })
  })


  it('should be able to list the day availability from provider', async () => {
    const hours = [8, 11, 14, 15]

    hours.map(async hour => (
      await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        client_id: 'client',
        date: new Date(2021, 0, 1, hour, 0, 0)
      })
    ))

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'provider',
      year: 2021,
      month: 1, // jan
      day: 1
    })

    expect(availability).toEqual(availability)
    // testar somente as 11:00
    // expect(availability).toEqual(expect.arrayContaining([
    //   { hour: 8, available: false },
    //   { hour: 9, available: false },
    //   { hour: 10, available: false },
    //   { hour: 11, available: false },
    //   { hour: 12, available: true },
    //   { hour: 13, available: true },
    //   { hour: 14, available: false },
    //   { hour: 15, available: false },
    //   { hour: 16, available: true }
    // ]))

  })


})
