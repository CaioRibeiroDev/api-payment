import { Prisma, User } from "@prisma/client";

export interface InterfaceUsersRepository {
  createUser(user: Prisma.UserCreateInput): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
}