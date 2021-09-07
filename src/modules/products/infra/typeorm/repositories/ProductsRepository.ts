import { EntityRepository, In, Repository } from 'typeorm'
import Product from '../entities/Product'

interface IFindProducts {
  id: string
}
@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product| undefined> {
    const product = await this.findOne({
      where: {
        name
      }
    })

    return product
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id)

    const exitsProducts = await this.find({
      where: {
        id: In(productIds)
      }
    })

    return exitsProducts
  }
}

export default ProductsRepository
