import {
    getMeanUnitsSold,
    getCheapestBook,
    getBooksWrittenByAuthor,
    calculateMetrics,
  } from '../metricsService'
  import { Book } from '../../models/book'
  
  describe('metricsService', () => {
    const books: Book[] = [
      { id: '1', name: 'Book 1', author: 'Author 1', units_sold: 100, price: 20 },
      { id: '2', name: 'Book 2', author: 'Author 2', units_sold: 200, price: 15 },
      { id: '3', name: 'Book 3', author: 'Author 1', units_sold: 300, price: 25 },
    ]
  
    it('getMeanUnitsSold should return correct average', () => {
      expect(getMeanUnitsSold(books)).toBe(200)
    })
  
    it('getCheapestBook should return the cheapest book', () => {
      expect(getCheapestBook(books)).toEqual(books[1])
    })
  
    it('getBooksWrittenByAuthor should filter books by author', () => {
      const result = getBooksWrittenByAuthor(books, 'Author 1')
      expect(result).toEqual([books[0], books[2]])
    })
  
    it('calculateMetrics should return all calculated metrics', () => {
      const result = calculateMetrics(books, 'Author 1')
      expect(result).toEqual({
        mean_units_sold: 200,
        cheapest_book: books[1],
        books_written_by_author: [books[0], books[2]],
      })
    })
  })
  