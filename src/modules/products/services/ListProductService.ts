import { getCustomRepository } from 'typeorm'
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository'
import Product from '@modules/products/typeorm/entities/Product'

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const products = await productsRepository.find()

    return products
  }
}

export default ListProductService
