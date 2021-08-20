import { Router } from 'express'
import productRouter from '@modules/products/routes/products.routes'

const routes = Router()

routes.use('/products', productRouter)

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello dev!' })
})

export default routes
