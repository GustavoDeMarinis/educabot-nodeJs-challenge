import { Request, Response } from 'express'
import { BooksProvider } from '../providers/books'
import { calculateMetrics } from '../services/metricsService'

export const handleGetMetrics = (booksProvider: BooksProvider) => {
  return async (req: Request, res: Response) => {
    try {
      const { author } = req.query as { author?: string }
      const books = await booksProvider.getBooks()

      const metrics = calculateMetrics(books, author)
      return res.status(200).json(metrics)
    } catch (err) {
      console.error('Error in metrics controller:', err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}