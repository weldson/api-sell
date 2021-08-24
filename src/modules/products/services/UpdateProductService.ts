import { getCustomRepository } from 'typeorm'
import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'
import Product from '@modules/products/typeorm/entities/Product'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository)

    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found.')
    }

    const productExists = await productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('There is already a product with this name')
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await productsRepository.save(product)

    return product
  }
}

export default UpdateProductService
