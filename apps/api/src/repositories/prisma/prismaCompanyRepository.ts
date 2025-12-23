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

  async findAll(params: {
    page?: number
    pageSize?: number
    where?: Prisma.CompanyWhereInput
    orderBy?:
      | Prisma.CompanyOrderByWithRelationInput
      | Prisma.CompanyOrderByWithRelationInput[]
  }): Promise<{
    data: Company[]
    total: number
    page: number
    pageSize: number
  }> {
    const page = Math.max(1, params.page ?? 1)
    const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 10))
    const where = params.where
    const orderBy =
      params.orderBy ??
      ({ created_at: 'desc' } as Prisma.CompanyOrderByWithRelationInput)

    const [total, data] = await Promise.all([
      prisma.company.count({ where }),
      prisma.company.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ])

    return { data, total, page, pageSize }
  }

  async update(
    id: string,
    data: Prisma.CompanyUpdateInput,
  ): Promise<Company | null> {
    const company = await prisma.company.update({ where: { id }, data })

    return company
  }
}
