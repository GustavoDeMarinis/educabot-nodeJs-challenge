import { Router } from 'express'
import { handleGetMetrics } from '../controllers/metricsController'
import { ExternalBooksProvider } from '../providers/externalBooksProvider'

const router = Router()

const booksProvider = ExternalBooksProvider()

router.get('/', handleGetMetrics(booksProvider))

export default router