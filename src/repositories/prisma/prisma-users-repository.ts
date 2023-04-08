import { Prisma } from "@prisma/client";
import { InterfaceUsersRepository } from "../interface-users-repository";
import { prisma } from "src/lib/prisma";

export class PrismaUserRepository implements InterfaceUsersRepository {
  async createUser({ 
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput) {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      }
    })
    
    return newUser
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    
    return user
  }

}