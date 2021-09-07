import { getCustomRepository } from 'typeorm'

import AppError from '@shared/errors/AppError'
import redisCache from '@shared/cache/RedisCache'
import ProductsRepository from '../typeorm/repositories/ProductsRepository'

interface IRequest {
  id: string
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found.')
    }

    await redisCache.invalidate('api-sell-PRODUCT_LIST')

    await productsRepository.remove(product)
  }
}

export default DeleteProductService
