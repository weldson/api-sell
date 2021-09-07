import { getCustomRepository } from 'typeorm'

import RedisCache from '@shared/cache/RedisCache'
import Product from '@modules/products/typeorm/entities/Product'
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository'

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>('api-sell-PRODUCT_LIST')

    if (!products) {
      products = await productsRepository.find()

      await redisCache.save('api-sell-PRODUCT_LIST', products)
    }


    return products
  }
}

export default ListProductService
