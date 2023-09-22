import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../src/components/HomePage/HomePage';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';

test('renders book search app title', () => {
  render(
    <Provider store={store}>
      <HomePage />
    </Provider>
  );

  const titleElement = screen.getByText(/Book Search App/i);
  expect(titleElement).toBeInTheDocument();
});
