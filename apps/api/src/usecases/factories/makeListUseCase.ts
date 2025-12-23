import { PrismaCompanyRepository } from '../../repositories/prisma/prismaCompanyRepository.js'
import { ListCompanyUseCase } from '../company/list.js'

export function makeListUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const listCompanyUseCase = new ListCompanyUseCase(companyRepository)
  return listCompanyUseCase
}
