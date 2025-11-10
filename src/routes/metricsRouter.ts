import { Router } from 'express'
import { handleGetMetrics } from '../controllers/metricsController'
import { ExternalBooksProvider } from '../providers/externalBooksProvider'

const router = Router()

const booksProvider = ExternalBooksProvider()

//Implement Swagger or similar tool for API documentation
router.get('/', handleGetMetrics(booksProvider))

export default router