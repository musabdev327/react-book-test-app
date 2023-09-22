import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const storedBooks = (state: RootState) => state.book.searchResults; 

export const selectedBooks = createSelector(
  [storedBooks, (state: RootState, title: string) => title, (state: RootState, title: string, currentPage: number) => currentPage],
  (books, title, currentPage) => {
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredBooks = title
      ? books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))
      : books;

    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);

    return booksToDisplay;
  }
);
