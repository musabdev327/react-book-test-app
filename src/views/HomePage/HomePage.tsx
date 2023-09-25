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
  const { booksToDisplay, maxPage } = useSelector((state: RootState) =>
    selectedBooks(state, searchQuery, currentPage)
  );
  const loading = useSelector((state: RootState) => state.book.loading);
  const error = useSelector((state: RootState) => state.book.error);


  useEffect(() => {
    AppDispatch(fetchBooks());
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      AppDispatch(fetchBooks());
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const getRandomImage = () => {
    const randomImages = ['https://edit.org/images/cat/book-covers-big-2019101610.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpP-TqlC_wJRlyQ8P0tlAZ58v2S_LkvxSJgQ&usqp=CAU'
    ]
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
  };

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
        {booksToDisplay.map((book) => (
          <li key={book.id} className={styles.resultsItem}>
            <Link to={`/book/${book.id}`} state={{ randomImage: book.cover_image ? '' : getRandomImage() }}>{book.title}</Link>
            {searchQuery && <div className={styles.coverImageContainer}>
              <img
                  src={book.cover_image || getRandomImage()}
                  alt={`Cover for ${book.title}`}
                  className={styles.coverImage}
              />
            </div>}
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
        <span className={styles.pageNumber}>Page {currentPage} of {maxPage}</span>
        <button
          onClick={() => {
            if (currentPage < maxPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={currentPage === maxPage}
          className={`${styles.button} ${styles.paginationButton}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
