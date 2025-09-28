import { useState } from 'react';
import { fetchUserData, fetchUsersAdvanced } from '../services/githubService';

export default function Search() {
  /* ---------- state ---------- */
  const [username, setUsername]   = useState('');
  const [location, setLocation]   = useState('');
  const [minRepos, setMinRepos]   = useState('');
  const [users, setUsers]         = useState([]);      // array for advanced
  const [user, setUser]           = useState(null);    // single user for simple
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(false);
  const [page, setPage]           = useState(1);
  const [total, setTotal]         = useState(0);

  /* ---------- handlers ---------- */
  const isAdvanced = location || minRepos;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError(false);
    setUser(null);
    setUsers([]);
    setPage(1);

    try {
      if (isAdvanced) {
        const data = await fetchUsersAdvanced({
          q: username.trim(),
          location,
          minRepos,
          page: 1,
        });
        setUsers(data.items);
        setTotal(data.total_count);
      } else {
        const data = await fetchUserData(username.trim());
        setUser(data);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const next = page + 1;
    setPage(next);
    setLoading(true);
    try {
      const data = await fetchUsersAdvanced({
        q: username.trim(),
        location,
        minRepos,
        page: next,
      });
      setUsers((prev) => [...prev, ...data.items]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          className="px-3 py-2 border rounded"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="px-3 py-2 border rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          className="px-3 py-2 border rounded"
          placeholder="Min repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      </form>

      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-600">Looks like we cant find the user</p>}

      {/* single user result (simple) */}
      {user && (
        <div className="mt-6 flex items-center gap-4">
          <img src={user.avatar_url} alt={user.name} className="w-20 h-20 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              View GitHub Profile
            </a>
          </div>
        </div>
      )}

      {/* list result (advanced) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="border rounded p-4 bg-white shadow">
            <img src={u.avatar_url} alt={u.login} className="w-16 h-16 rounded-full mb-2" />
            <h3 className="font-semibold">{u.login}</h3>
            <a href={u.html_url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
              View Profile
            </a>
          </div>
        ))}
      </div>

      {!loading && isAdvanced && users.length < total && (
        <div className="mt-6 text-center">
          <button onClick={loadMore} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
