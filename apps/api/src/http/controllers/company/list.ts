import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeListUseCase } from '../../../usecases/factories/makeListUseCase.js'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(10),
  })

  const { page, pageSize } = querySchema.parse(request.query)

  const listCompanies = makeListUseCase()
  const result = await listCompanies.execute({ page, pageSize })

  return reply.status(200).send({
    data: result.companies,
    meta: { total: result.total, page: result.page, pageSize: result.pageSize },
  })
}
