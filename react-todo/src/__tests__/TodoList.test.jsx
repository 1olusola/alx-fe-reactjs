import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

// Test 1: Initial Render
test('renders TodoList component with initial todos', () => {
  render(<TodoList />);
  
  // Check if component renders
  expect(screen.getByText('Todo List')).toBeInTheDocument();
  
  // Check if initial todos are rendered
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test 2: Adding a New Todo
test('adds a new todo when form is submitted', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add a new todo...');
  const addButton = screen.getByText('Add Todo');
  
  // Add new todo
  await user.type(input, 'New Test Todo');
  await user.click(addButton);
  
  // Check if new todo is added
  expect(screen.getByText('New Test Todo')).toBeInTheDocument();
});

// Test 3: Toggling Todo Completion
test('toggles todo completion status when clicked', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const todoText = screen.getByText('Learn React');
  
  // Initial state should not have line-through
  expect(todoText).not.toHaveStyle('text-decoration: line-through');
  
  // Toggle todo completion
  await user.click(todoText);
  
  // Should now have line-through
  expect(todoText).toHaveStyle('text-decoration: line-through');
  
  // Toggle back
  await user.click(todoText);
  
  // Should not have line-through again
  expect(todoText).not.toHaveStyle('text-decoration: line-through');
});

// Test 4: Deleting a Todo
test('deletes a todo when delete button is clicked', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const deleteButtons = screen.getAllByText('Delete');
  const todoToDelete = screen.getByText('Learn React');
  
  // Verify todo exists before deletion
  expect(todoToDelete).toBeInTheDocument();
  
  // Delete the first todo
  await user.click(deleteButtons[0]);
  
  // Verify todo is removed after deletion
  expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});

// Test 5: Form Submission with Enter Key
test('adds todo when Enter key is pressed', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add a new todo...');
  
  // Type and press Enter
  await user.type(input, 'Todo with Enter{enter}');
  
  // Check if todo was added
  expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
});

// Test 6: Empty Todo Input
test('does not add empty todo', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const initialTodos = screen.getAllByRole('listitem').length;
  const addButton = screen.getByText('Add Todo');
  
  // Try to add empty todo
  await user.click(addButton);
  
  // Check that no new todo was added
  const currentTodos = screen.getAllByRole('listitem').length;
  expect(currentTodos).toBe(initialTodos);
});

// Test 7: Multiple Operations
test('handles adding multiple todos', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add a new todo...');
  const addButton = screen.getByText('Add Todo');
  
  // Add first todo
  await user.type(input, 'First Todo');
  await user.click(addButton);
  
  // Add second todo
  await user.type(input, 'Second Todo');
  await user.click(addButton);
  
  // Check if both todos are added
  expect(screen.getByText('First Todo')).toBeInTheDocument();
  expect(screen.getByText('Second Todo')).toBeInTheDocument();
});
