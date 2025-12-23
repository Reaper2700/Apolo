import type { Company, Prisma } from '@prisma/client'

export interface CompanyRepository {
  create(data: Prisma.CompanyCreateInput): Promise<Company>
  findById(id: string): Promise<Company | null>
  findByCNPJ(cnpj: string): Promise<Company | null>
  findAll(params: {
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
  }>
  update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company | null>
}
