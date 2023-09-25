import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import HomePage from './views/HomePage/HomePage';
import BookDetailPage from './views/BookDetailPage/BookDetailPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router basename="/react-book-test-app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
