import type { Company, Prisma } from '@prisma/client'
import type { CompanyRepository } from '../../repositories/companyRepository.js'

interface ListCompanyUseCaseRequest {
  page?: number
  pageSize?: number
  where?: Prisma.CompanyWhereInput
  orderBy?:
    | Prisma.CompanyOrderByWithRelationInput
    | Prisma.CompanyOrderByWithRelationInput[]
}

interface ListCompanyUseCaseResponse {
  companies: Company[]
  total: number
  page: number
  pageSize: number
}

export class ListCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({
    page,
    pageSize,
    where,
    orderBy,
  }: ListCompanyUseCaseRequest = {}): Promise<ListCompanyUseCaseResponse> {
    const {
      data,
      total,
      page: p,
      pageSize: ps,
    } = await this.companyRepository.findAll({ page, pageSize, where, orderBy })

    return { companies: data, total, page: p, pageSize: ps }
  }
}
