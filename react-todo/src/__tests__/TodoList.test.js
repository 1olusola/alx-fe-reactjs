import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

test('renders initial todos', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React')).toBeInTheDocument();
});

test('adds a new todo', () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText('Add a new todo...');
  const button = screen.getByText('Add Todo');
  
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(button);
  
  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

test('toggles todo completion', () => {
  render(<TodoList />);
  const todo = screen.getByText('Learn React');
  
  fireEvent.click(todo);
  expect(todo).toHaveStyle('text-decoration: line-through');
});

test('deletes a todo', () => {
  render(<TodoList />);
  const deleteButtons = screen.getAllByText('Delete');
  
  fireEvent.click(deleteButtons[0]);
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});
