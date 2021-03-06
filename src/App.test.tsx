import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nasa Image and Audio Library text', () => {
  render(<App />);
  const textElement = screen.getByText(/Nasa Image and Audio Library/i);
  expect(textElement).toBeInTheDocument();
});
