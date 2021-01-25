import { generate } from 'shortid'

export interface CreateAppointmentDTO {
  provider:string
  date: Date
}

export default class Appointment {

  id: string
  provider: string
  date: Date

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = generate()
    this.provider = provider
    this.date = date
  }

}
