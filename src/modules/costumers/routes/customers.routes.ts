import { Router } from 'express'
import CustomersController from '../controllers/CustomersController'
import { celebrate, Joi, Segments } from 'celebrate'

const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.get('/', customersController.list)

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.show
)

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }),
  customersController.create
)

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email()
    }
  }),
  customersController.update
)

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customersController.delete
)

export default customersRouter
