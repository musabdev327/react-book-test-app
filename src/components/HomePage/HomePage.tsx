import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setSearchQuery,
  fetchBooks,
  useAppDispatch,
} from '../../redux/store';
import { selectedBooks } from '../../redux/bookSelectors';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const AppDispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const searchQuery = useSelector((state: RootState) => state.book.searchQuery);
  let filteredBooks = useSelector((state: RootState) =>
    selectedBooks(state, searchQuery, currentPage)
  );
  const loading = useSelector((state: RootState) => state.book.loading);
  const error = useSelector((state: RootState) => state.book.error);
  const searchResults = useSelector((state: RootState) => state.book.searchResults);
  const maxPages = Math.ceil(searchResults.length / 5);

  useEffect(() => {
    AppDispatch(fetchBooks());
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      AppDispatch(fetchBooks());
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Search App</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={styles.input}
        />
      </div>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ol className={styles.results}>
        {filteredBooks.map((book) => (
          <li key={book.id} className={styles.resultsItem}>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ol>
      <div className={styles.pagination}>
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className={`${styles.button} ${styles.paginationButton}`}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>Page {currentPage}</span>
        <button
          onClick={() => {
            if (currentPage < maxPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={currentPage === maxPages}
          className={`${styles.button} ${styles.paginationButton}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
