import { Router } from 'express'
import ProductsController from '../controllers/ProductsController'
import { celebrate, Joi, Segments } from 'celebrate'

const productRouter = Router()
const productsController = new ProductsController()

productRouter.get('/', productsController.list)

productRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  productsController.show
)

productRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().required()
    }
  }),
  productsController.create
)

productRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number().precision(2),
      quantity: Joi.number().integer()
    }
  }),
  productsController.update
)

productRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  productsController.delete
)

export default productRouter
