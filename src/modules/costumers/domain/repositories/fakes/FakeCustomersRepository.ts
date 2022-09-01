import { v4 as uuidv4 } from 'uuid';

import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/costumers/domain/models/ICustomer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';
import Customer from '@modules/costumers/infra/typeorm/entities/Customer';
import { ICreateCustomer } from '../../models/ICreateCustomer';

class FakeCustomersRepository
  implements ICustomersRepository {
  private customers: Customer[] = [];
  private customersPaginate: Customer[] = [];

  public async findAll(): Promise<ICustomer[] | undefined> {
    return this.customers
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    return this.customers;
  }

  public async save(customer: ICustomer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id
    )

    this.customers[findIndex] = customer

    return customer
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer()

    customer.id = uuidv4()
    customer.name = name
    customer.email = email
    customer.created_at = new Date()
    customer.updated_at = new Date()

    this.customers.push(customer)

    return customer
  }

  public async remove(customer: ICustomer): Promise<void> {

  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id)
    return customer
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email)
    return customer
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name)
    return customer
  }
}

export default FakeCustomersRepository
