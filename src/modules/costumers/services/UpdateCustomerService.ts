import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer'
import { ICustomer } from '../domain/models/ICustomer'


class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}
  public async execute({ id, name, email }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer does not exists.')
    }

    const customerUpdateEmail = await this.customersRepository.findByEmail(email)

    if (customerUpdateEmail && customerUpdateEmail.id !== id) {
      throw new AppError('There is already a customer with this email.')
    }

    customer.name = name
    customer.email = email

    await this.customersRepository.save(customer)

    return customer
  }
}

export default UpdateCustomerService
