import { InterfaceUsersRepository } from 'src/repositories/interface-users-repository'
import { PrismaUserRepository } from 'src/repositories/prisma/prisma-users-repository'
import { container } from 'tsyringe'


container.registerSingleton<InterfaceUsersRepository>(
  'PrismaUserRepository',
  PrismaUserRepository
)
 
