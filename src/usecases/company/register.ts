import type { Company } from '@prisma/client'
import type { CompanyRepository } from '../../repositories/companyRepository.js'

interface CreateCompanyUseCaseRequest {
  name: string
  tradeName: string
  cnpj: string
  segmentation: string
  obs: string
  address: string
  dateOfPayment: Date
}

interface CreateCompanyUseCaseResponse {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    name,
    tradeName,
    cnpj,
    segmentation,
    obs,
    address,
    dateOfPayment,
  }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
    const company = await this.companyRepository.create({
      name,
      tradeName,
      cnpj,
      segmentation,
      obs,
      address,
      dateOfPayment,
    })
    return {
      company,
    }
  }
}
