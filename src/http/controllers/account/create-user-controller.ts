import { Request, Response } from "express";
import { CreateUserUseCase } from "src/use-cases/create-user-use-case";
import { container } from "tsyringe";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body
    
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user =  await createUserUseCase.execute({name, email, password});

    response.status(201).json({user});
  }
}