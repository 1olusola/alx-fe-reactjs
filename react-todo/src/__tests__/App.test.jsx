import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders TodoList component in App', () => {
  render(<App />);
  
  // Check if TodoList is rendered within App
  expect(screen.getByText('Todo List')).toBeInTheDocument();
});
