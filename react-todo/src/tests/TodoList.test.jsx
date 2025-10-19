import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if component renders
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByText('Manage your tasks efficiently')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if form elements are present
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
    
    // Check if todos list is present
    expect(screen.getByTestId('todos-list')).toBeInTheDocument();
  });

  // Test 2: Initial Statistics
  test('displays correct initial statistics', () => {
    render(<TodoList />);
    
    expect(screen.getByTestId('total-todos')).toHaveTextContent('3');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('1');
    expect(screen.getByTestId('pending-todos')).toHaveTextContent('2');
  });

  // Test 3: Adding a New Todo
  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add new todo
    await user.type(input, 'New Test Todo');
    await user.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if statistics are updated
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4');
    expect(screen.getByTestId('pending-todos')).toHaveTextContent('3');
    
    // Check if input is cleared after submission
    expect(input).toHaveValue('');
  });

  // Test 4: Adding Empty Todo
  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTodoCount = screen.getByTestId('total-todos').textContent;
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    await user.click(addButton);
    
    // Check that no new todo was added
    expect(screen.getByTestId('total-todos')).toHaveTextContent(initialTodoCount);
  });

  // Test 5: Toggling Todo Completion
  test('toggles todo completion status when clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const todoText = screen.getByTestId('todo-text-1'); // "Learn React"
    const initialCompleted = screen.getByTestId('completed-todos').textContent;
    const initialPending = screen.getByTestId('pending-todos').textContent;
    
    // Toggle todo completion
    await user.click(todoText);
    
    // Check if completion status changed in statistics
    await waitFor(() => {
      expect(screen.getByTestId('completed-todos').textContent).not.toBe(initialCompleted);
      expect(screen.getByTestId('pending-todos').textContent).not.toBe(initialPending);
    });
    
    // Check if todo item has completed class
    const todoItem = screen.getByTestId('todo-item-1');
    expect(todoItem).toHaveClass('completed');
  });

  // Test 6: Deleting a Todo
  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const deleteButton = screen.getByTestId('delete-button-1'); // Delete "Learn React"
    const initialTodoCount = screen.getByTestId('total-todos').textContent;
    
    // Delete todo
    await user.click(deleteButton);
    
    // Check if todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check if statistics are updated
    expect(screen.getByTestId('total-todos').textContent).not.toBe(initialTodoCount);
    expect(screen.getByTestId('total-todos')).toHaveTextContent('2');
  });

  // Test 7: Multiple Operations
  test('handles multiple operations correctly', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add multiple todos
    await user.type(input, 'First New Todo');
    await user.click(addButton);
    
    await user.type(input, 'Second New Todo');
    await user.click(addButton);
    
    // Check if both todos are added
    expect(screen.getByText('First New Todo')).toBeInTheDocument();
    expect(screen.getByText('Second New Todo')).toBeInTheDocument();
    
    // Toggle one todo
    const firstTodoText = screen.getByText('First New Todo');
    await user.click(firstTodoText);
    
    // Delete one todo
    const secondTodoDeleteButton = screen.getByTestId('delete-button-2'); // Delete "Build a Todo App"
    await user.click(secondTodoDeleteButton);
    
    // Check final state
    expect(screen.getByTestId('total-todos')).toHaveTextContent('4'); // 3 initial + 2 new - 1 deleted
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
  });

  // Test 8: Empty State
  test('displays empty state when no todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText('Delete');
    for (const button of deleteButtons) {
      await user.click(button);
    }
    
    // Check if empty state is displayed
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    expect(screen.getByTestId('total-todos')).toHaveTextContent('0');
    expect(screen.getByTestId('completed-todos')).toHaveTextContent('0');
    expect(screen.getByTestId('pending-todos')).toHaveTextContent('0');
  });

  // Test 9: Form Submission with Enter Key
  test('adds todo when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Type and press Enter
    await user.type(input, 'Todo with Enter{enter}');
    
    // Check if todo was added
    expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
  });

  // Test 10: Todo Item Styling
  test('applies correct styling for completed todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const todoItem = screen.getByTestId('todo-item-2'); // "Build a Todo App" (initially completed)
    const todoText = screen.getByTestId('todo-text-2');
    
    // Check if completed todo has correct styling initially
    expect(todoItem).toHaveClass('completed');
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Toggle to incomplete
    await user.click(todoText);
    
    // Check if styling is removed
    expect(todoItem).not.toHaveClass('completed');
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });
});
