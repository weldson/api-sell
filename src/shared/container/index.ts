import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/costumers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
