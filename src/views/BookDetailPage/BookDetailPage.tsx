import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './BookDetailPage.module.css';
import {
    fetchBooks,
    useAppDispatch,
} from '../../redux/store';


const BookDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const AppDispatch = useAppDispatch();
    const location = useLocation();
    const { randomImage } = location.state
    const book = useSelector((state: RootState) =>
        state.book.searchResults.find((item) => item.id == id)
    );

    useEffect(() => {
        AppDispatch(fetchBooks());
      }, []);

    if (!book) {
        return <p className={styles.errorMessage}>Book not found.</p>;
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>{book.title}</h1>
                <div className={styles.coverImageContainer}>
                    <img
                        src={book.cover_image || randomImage}
                        alt={`Cover for ${book.title}`}
                        className={styles.coverImage}
                    />
                </div>
                <h2>Book Info</h2>
                <p className={styles.info}>Author Id: {book.author_id}</p>
                <p className={styles.info}>Published Date: {book.publishedDate || '2023-09-22'}</p>
                <p className={styles.info}>Pages: {book.pages}</p>
            </div>
        </div>
    );
};

export default BookDetailPage;
