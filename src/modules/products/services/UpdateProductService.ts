import { getCustomRepository } from 'typeorm'
import ProductRepository from '@modules/typeorm/repositories/ProductRepository'
import AppError from '@shared/errors/AppError'
import Product from '@modules/typeorm/entities/Product'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)

    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found.')
    }

    const productExists = await productRepository.findByName(name)

    if (productExists) {
      throw new AppError('There is already a product with this name')
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await productRepository.save(product)

    return product
  }
}

export default UpdateProductService
