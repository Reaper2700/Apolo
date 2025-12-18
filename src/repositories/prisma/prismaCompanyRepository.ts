import type { Prisma, Company } from '@prisma/client'
import type { CompanyRepository } from '../companyRepository.js'
import { prisma } from '../../lib/prisma.js'

export class PrismaCompanyRepository implements CompanyRepository {
  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    const company = await prisma.company.create({ data })

    return company
  }

  async findById(id: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({ where: { id } })

    return company
  }

  async findByCNPJ(cnpj: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({ where: { cnpj } })

    return company
  }

  async findAll(): Promise<Company[]> {
    const company = await prisma.company.findMany()

    return company
  }

  async update(
    id: string,
    data: Prisma.CompanyUpdateInput,
  ): Promise<Company | null> {
    const company = await prisma.company.update({ where: { id }, data })

    return company
  }
}
