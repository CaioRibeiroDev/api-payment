import { Router } from 'express'
import { CreateUserController } from 'src/http/controllers/account/create-user-controller'

export const routes: Router = Router()

const createUserController = new CreateUserController()

routes.post('/create-user', createUserController.handle)
