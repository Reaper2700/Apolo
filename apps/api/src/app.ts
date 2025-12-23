import fastify from 'fastify'
import { CompanyRoutes } from './http/controllers/company/routes.js'

export const app = fastify()

app.register(CompanyRoutes)
