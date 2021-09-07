import { EntityRepository, Repository } from 'typeorm'

import Order from '../entities/Order'
import Customer from '@modules/costumers/infra/typeorm/entities/Customer'

interface IProduct {
  product_id: string
  price: number
  quantity: number
}

interface IRequest {
  customer: Customer
  products: IProduct[]
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['customer', 'order_products']
    })

    return order
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products
    })

    await this.save(order)

    console.log(order)
    return order
  }
}

export default OrdersRepository
