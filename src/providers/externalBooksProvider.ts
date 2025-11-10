import axios from 'axios'
import { Book } from '../models/book'
import { BooksProvider } from './books'

export const ExternalBooksProvider = (): BooksProvider => {
  const API_URL = 'https://6781684b85151f714b0aa5db.mockapi.io/api/v1/books'

  const getBooks = async (): Promise<Book[]> => {
    try {
      const { data } = await axios.get<Book[]>(API_URL)
      return data
    } catch (error) {
      console.error('Error fetching books:', error)
      throw new Error('Failed to fetch books from external API')
    }
  }

  return { getBooks }
}