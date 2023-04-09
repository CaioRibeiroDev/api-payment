import { Router } from 'express'
import { CreateUserController } from 'src/http/controllers/account/create-user-controller'
import { ProcessPaymentController } from 'src/http/controllers/account/process-payment-controller'

export const routes: Router = Router()

const createUserController = new CreateUserController()
const processPaymentController = new ProcessPaymentController()

routes.post('/create-user', createUserController.handle)
routes.post('/payment', processPaymentController.handle)