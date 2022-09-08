import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    await redisCache.invalidate('api-sell-PRODUCT_LIST');

    const product = productsRepository.create({ name, price, quantity });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
