import { Book } from '../models/book'

export interface BooksProvider {
  getBooks: () => Promise<Book[]>
}