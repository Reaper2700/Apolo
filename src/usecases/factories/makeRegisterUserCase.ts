import { PrismaCompanyRepository } from '../../repositories/prisma/prismaCompanyRepository.js'
import { CreateCompanyUseCase } from '../company/register.js'

export function makeRegisterUserCase() {
  const companyRepository = new PrismaCompanyRepository()
  const registerCompanyUseCase = new CreateCompanyUseCase(companyRepository)

  return registerCompanyUseCase
}
