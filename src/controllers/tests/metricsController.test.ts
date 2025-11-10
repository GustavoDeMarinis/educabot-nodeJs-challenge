import { handleGetMetrics } from '../metricsController'
import { BooksProvider } from '../../providers/books'
import { Request, Response } from 'express'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import { Book } from '../../models/book'

describe('metricsController', () => {
  const mockBooks: Book[] = [
    { id: '1', name: 'Book 1', author: 'Author 1', units_sold: 100, price: 20 },
    { id: '2', name: 'Book 2', author: 'Author 2', units_sold: 200, price: 15 },
    { id: '3', name: 'Book 3', author: 'Author 1', units_sold: 300, price: 25 },
  ]

  let mockBooksProvider: BooksProvider
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>
  let jsonMock: any

  beforeEach(() => {
    mockBooksProvider = {
      getBooks: vi.fn().mockResolvedValue(mockBooks),
    }

    jsonMock = vi.fn()
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: jsonMock,
    }
    mockReq = { query: {} }
  })

  it('should return metrics without author filter', async () => {
    const handler = handleGetMetrics(mockBooksProvider)
    await handler(mockReq as Request, mockRes as Response)

    expect(mockBooksProvider.getBooks).toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(jsonMock).toHaveBeenCalledWith({
      mean_units_sold: 200,
      cheapest_book: mockBooks[1],
      books_written_by_author: [],
    })
  })

  it('should return metrics filtered by author', async () => {
    mockReq.query = { author: 'Author 1' }
    const handler = handleGetMetrics(mockBooksProvider)
    await handler(mockReq as Request, mockRes as Response)

    expect(mockBooksProvider.getBooks).toHaveBeenCalled()
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(jsonMock).toHaveBeenCalledWith({
      mean_units_sold: 200,
      cheapest_book: mockBooks[1],
      books_written_by_author: [mockBooks[0], mockBooks[2]],
    })
  })

  it('should handle provider errors gracefully', async () => {
    mockBooksProvider.getBooks = vi.fn().mockRejectedValue(new Error('API failed'))
    const handler = handleGetMetrics(mockBooksProvider)

    await handler(mockReq as Request, mockRes as Response)

    expect(mockRes.status).toHaveBeenCalledWith(500)
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Internal Server Error' })
  })
})
