import type { FastifyInstance } from 'fastify'
import { register } from './register.js'

export async function CompanyRoutes(app: FastifyInstance) {
  app.post('/companies', register)
}
