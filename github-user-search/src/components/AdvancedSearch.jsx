import { useState } from 'react';
import { fetchUsersAdvanced } from '../services/githubService';

export default function AdvancedSearch() {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    await search(1);
  };

  const search = async (pageNum) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchUsersAdvanced({ q, location, minRepos, page: pageNum });
      setUsers(pageNum === 1 ? data.items : [...users, ...data.items]);
      setTotal(data.total_count);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    search(next);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          className="px-3 py-2 border rounded"
          placeholder="Username"
          value={q}
          onChange={(e) => setQ(e.target.value)}
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
      {error && <p className="mt-4 text-red-600">Looks like we cant find the user</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="border rounded p-4 bg-white shadow">
            <img
              src={u.avatar_url}
              alt={u.login}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="font-semibold">{u.login}</h3>
            <a
              href={u.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {!loading && users.length < total && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
