import { useState } from "react";
export default function AddTodoForm({ addTodo }) {
const [text, setText] = useState("");
const handle = e => {
e.preventDefault();
if (!text.trim()) return;
addTodo(text);
setText("");
};
return (
<form onSubmit={handle}><button>

);
}
