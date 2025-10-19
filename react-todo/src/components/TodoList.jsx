import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  // Initial state with demo todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: true },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="todo-list-container">
      <header className="todo-header">
        <h1>Todo List</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="add-todo-form">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
            className="todo-input"
            data-testid="todo-input"
          />
          <button 
            type="submit" 
            className="add-button"
            data-testid="add-button"
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Todo Statistics */}
      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-label">Total:</span>
          <span className="stat-value" data-testid="total-todos">{totalTodos}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed:</span>
          <span className="stat-value" data-testid="completed-todos">{completedTodos}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending:</span>
          <span className="stat-value" data-testid="pending-todos">{pendingTodos}</span>
        </div>
      </div>

      {/* Todo List */}
      <div className="todos-container">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          <ul className="todos-list" data-testid="todos-list">
            {todos.map(todo => (
              <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                data-testid={`todo-item-${todo.id}`}
              >
                <span 
                  className="todo-text"
                  onClick={() => toggleTodo(todo.id)}
                  data-testid={`todo-text-${todo.id}`}
                >
                  {todo.text}
                </span>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                  data-testid={`delete-button-${todo.id}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3>How to use:</h3>
        <ul>
          <li>Click on a todo to toggle completion status</li>
          <li>Click "Delete" to remove a todo</li>
          <li>Use the form above to add new todos</li>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
