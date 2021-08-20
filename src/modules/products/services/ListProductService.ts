import { getCustomRepository } from 'typeorm'
import ProductRepository from '@modules/typeorm/repositories/ProductRepository'
import Product from '@modules/typeorm/entities/Product'

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository)

    const products = await productRepository.find()

    return products
  }
}

export default ListProductService
