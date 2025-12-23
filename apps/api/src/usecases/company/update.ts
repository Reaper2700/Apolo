import type { Company, CompanyStatus } from '@prisma/client'
import type { CompanyRepository } from '../../repositories/companyRepository.js'

interface UpdateCompanyUseCaseRequest {
  id: string
  name?: string
  tradeName?: string
  status?: CompanyStatus
  segmentation?: string
  obs?: string
  address?: string
  dateOfPayment?: Date
}

interface UpdateCompanyUseCaseResponse {
  company: Company | null
}

export class UpdateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    id,
    name,
    tradeName,
    status,
    segmentation,
    obs,
    address,
    dateOfPayment,
  }: UpdateCompanyUseCaseRequest): Promise<UpdateCompanyUseCaseResponse> {
    const company = await this.companyRepository.update(id, {
      name,
      tradeName,
      status,
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
