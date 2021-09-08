import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import { IShowCustomer } from '../domain/models/IShowCustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { ICustomer } from '../domain/models/ICustomer'

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ id }: IShowCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found.')
    }

    return customer
  }
}

export default ShowCustomerService
