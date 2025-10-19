import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
export default function TodoList() {
const [todos, setTodos] = useState([
{ id: 1, text: "Learn React",     done: false },
{ id: 2, text: "Build projects",  done: false }
]);
const addTodo = text =>
setTodos([...todos, { id: Date.now(), text, done: false }]);
const toggleTodo = id =>
setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
const deleteTodo = id =>
setTodos(todos.filter(t => t.id !== id));
return (
<>
<AddTodoForm addTodo={addTodo} /><ul>
<button onClick={() => deleteTodo(t.id)}>Delete

))}

</>
);
}
