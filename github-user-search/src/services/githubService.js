import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';
const BASE_SEARCH_URL = 'https://api.github.com/search/users';

export async function fetchUserData(username) {
  const { data } = await axios.get(`${BASE_URL}/${username}`);
  return data;
}

export async function fetchUsersAdvanced({ q, location, minRepos, page = 1 }) {
  let query = q;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const { data } = await axios.get(BASE_SEARCH_URL, {
    params: { q: query, per_page: 10, page },
  });
  return data;
}