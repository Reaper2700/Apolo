import { PrismaCompanyRepository } from '../../repositories/prisma/prismaCompanyRepository.js'
import { UpdateCompanyUseCase } from '../company/update.js'

export function makeUpdateUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepository)
  return updateCompanyUseCase
}
