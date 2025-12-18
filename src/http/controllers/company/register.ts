import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeRegisterUserCase } from '../../../usecases/factories/makeRegisterUserCase.js'
import { ca } from 'zod/locales'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    tradeName: z.string(),
    cnpj: z.string(),
    segmentation: z.string().optional(),
    obs: z.string().optional(),
    address: z.string().optional(),
    dateOfPayment: z.coerce.date().optional(),
  })

  const { name, tradeName, cnpj, segmentation, obs, address, dateOfPayment } =
    registerBodySchema.parse(request.body)

  try {
    const registerCompanyUseCase = makeRegisterUserCase()

    const { company } = await registerCompanyUseCase.execute({
      name,
      tradeName,
      cnpj,
      segmentation,
      obs,
      address,
      dateOfPayment,
    })
  } catch (err) {
    console.log(err)
  }

  return reply.status(201).send()
}
