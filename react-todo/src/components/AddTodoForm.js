import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add-todo-form">
      <input
        type="text"
        placeholder="Enter a new todo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-button">Add</button>
    </form>
  );
}

export default AddTodoForm;
