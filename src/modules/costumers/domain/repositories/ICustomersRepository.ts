import { ICustomer } from "../models/ICustomer"
import { ICreateCustomer } from "../models/ICreateCustomer"
import { ICustomerPaginate } from "../models/ICustomerPaginate"

export interface ICustomersRepository {
  findAll(): Promise<ICustomer[] | undefined>

  findAllPaginate(): Promise<ICustomerPaginate>

  findByName(name: string): Promise<ICustomer | undefined>

  findById(id: string): Promise<ICustomer | undefined>

  findByEmail(email: string): Promise<ICustomer | undefined>

  create(data: ICreateCustomer): Promise<ICustomer>

  save(data: ICustomer): Promise<ICustomer>

  remove(customer: ICustomer): Promise<void>
}
