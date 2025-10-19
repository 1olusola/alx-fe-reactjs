import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    setError("");
    alert("Registered (mock): " + JSON.stringify({ username, email, password }, null, 2));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}
