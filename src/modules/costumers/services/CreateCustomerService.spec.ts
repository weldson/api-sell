import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/costumers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Naruto Uzumaki',
      email: 'naruto@email.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Shold not be able to create customers with duplicated e-mails', async () => {
    await createCustomer.execute({
      name: 'Naruto Uzumaki',
      email: 'naruto@email.com',
    });

    expect(
      createCustomer.execute({
        name: 'Naruto Uzumaki',
        email: 'naruto@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
