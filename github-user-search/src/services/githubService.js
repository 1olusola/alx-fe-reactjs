import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

export async function fetchUserData(username) {
  const { data } = await axios.get(`${BASE_URL}/${username}`);
  return data;
}