import { getRepository, Repository } from 'typeorm';

import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/costumers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/costumers/domain/models/ICreateCustomer';
import { ICustomerPaginate } from '@modules/costumers/domain/models/ICustomerPaginate';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
    const customers = await this.ormRepository.find();

    return customers;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const customers = await this.ormRepository.createQueryBuilder().paginate();

    return customers as ICustomerPaginate;
  }

  public async save(customer: ICustomer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({name, email});

    await this.ormRepository.save(customer);

    return customer;
  }

   public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer)
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email
      }
    });

    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name
      }
    });

    return customer;
  }
}

export default CustomersRepository;
