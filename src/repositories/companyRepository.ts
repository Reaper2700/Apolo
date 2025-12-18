import type { Company, Prisma } from '@prisma/client'

export interface CompanyRepository {
  create(data: Prisma.CompanyCreateInput): Promise<Company>
  findById(id: string): Promise<Company | null>
  findByCNPJ(cnpj: string): Promise<Company | null>
  findAll(): Promise<Company[]>
  update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company | null>
}
