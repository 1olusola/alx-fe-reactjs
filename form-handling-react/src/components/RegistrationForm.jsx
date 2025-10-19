import { useState } from "react";
export default function RegistrationForm() {
const [form, setForm] = useState({ username: "", email: "", password: "" });
const [error, setError] = useState("");
const handleChange = e =>
setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = e => {
e.preventDefault();
if (!form.username || !form.email || !form.password)
return setError("All fields are required");
setError("");
alert("Registered (mock): " + JSON.stringify(form, null, 2));
};
return (
<form onSubmit={handleSubmit}>}
<input name="username" placeholder="Username" value={form.username} onChange={handleChange} /><input name="email"    placeholder="Email"    value={form.email}    onChange={handleChange} /><input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" /><button type="submit">

);
}
