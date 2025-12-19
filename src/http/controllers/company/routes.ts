import type { FastifyInstance } from 'fastify'
import { register } from './register.js'
import { update } from './update.js'

export async function CompanyRoutes(app: FastifyInstance) {
  app.post('/companies', register)
  app.put('/companies/:id', update)
}
