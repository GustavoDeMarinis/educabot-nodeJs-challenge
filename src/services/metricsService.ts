import { Book } from '../models/book'

export interface MetricsResponse {
  mean_units_sold: number
  cheapest_book: Book | null
  books_written_by_author: Book[]
}

export const getMeanUnitsSold = (books: Book[]): number => {
  if (books.length === 0) return 0
  const totalUnitsSold = books.reduce((sum, b) => sum + b.units_sold, 0)
  return totalUnitsSold / books.length
}

export const getCheapestBook = (books: Book[]): Book | null => {
  if (books.length === 0) return null
  return books.reduce((cheapest, b) => (b.price < cheapest.price ? b : cheapest))
}

export const getBooksWrittenByAuthor = (
  books: Book[],
  author: string
): Book[] => {
  return books.filter(
    b => b.author.toLowerCase() === author.toLowerCase()
  )
}

export const calculateMetrics = (books: Book[], author?: string): MetricsResponse => {
  return {
    mean_units_sold: getMeanUnitsSold(books),
    cheapest_book: getCheapestBook(books),
    books_written_by_author: author ? getBooksWrittenByAuthor(books, author) : [],
  }
}