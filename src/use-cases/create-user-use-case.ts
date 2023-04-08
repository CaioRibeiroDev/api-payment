import { hash } from "bcryptjs"
import { AppError } from "src/errors/app-error"
import { InterfaceUsersRepository } from "src/repositories/interface-users-repository"
import { inject, injectable } from "tsyringe"

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("PrismaUserRepository")
    private usersRepository: InterfaceUsersRepository
  ) {}
  
  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    const encryptPassword = await hash(password, 6)
    const existsUser = await this.usersRepository.findUserByEmail(email)

    if(existsUser) throw new AppError('User already exists')

    const user = await this.usersRepository.createUser({
      name,
      email,
      password_hash: encryptPassword
    })

    return user
  }
}