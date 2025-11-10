import { Request, Response } from 'express'
import { BooksProvider } from '../providers/books'
import { calculateMetrics } from '../services/metricsService'

export const handleGetMetrics = (booksProvider: BooksProvider) => {

    //TODO: create & validate schemas for request and response 
  return async (req: Request, res: Response) => {

    //TODO create pagination & filtering mechanism for large datasets
    try {
      const { author } = req.query as { author?: string }
      const books = await booksProvider.getBooks()

      const metrics = calculateMetrics(books, author)

      //TODO if Api grows implement Success & Error response standarization in file http-response-factory
      return res.status(200).json(metrics)
    } catch (err) {
      console.error('Error in metrics controller:', err)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}