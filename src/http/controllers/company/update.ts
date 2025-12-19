import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeUpdateUseCase } from '../../../usecases/factories/makeUpdateUseCase.js'
import { CompanyStatus } from '@prisma/client'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateBodySchema = z.object({
    name: z.string().optional(),
    tradeName: z.string().optional(),
    status: z.nativeEnum(CompanyStatus).optional(),
    segmentation: z.string().optional(),
    obs: z.string().optional(),
    address: z.string().optional(),
    dateOfPayment: z.coerce.date().optional(),
  })

  const { id } = updateParamsSchema.parse(request.params)
  const { name, tradeName, status, segmentation, obs, address, dateOfPayment } =
    updateBodySchema.parse(request.body)

  try {
    const updateCompanyUseCase = makeUpdateUseCase()

    await updateCompanyUseCase.execute({
      id,
      name,
      tradeName,
      status,
      segmentation,
      obs,
      address,
      dateOfPayment,
    })

    return reply.status(200).send()
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return reply.status(404).send({ message: 'Company not found' })
    }
    if (err?.code === 'P2002') {
      return reply.status(409).send({ message: 'Unique constraint violation' })
    }
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
