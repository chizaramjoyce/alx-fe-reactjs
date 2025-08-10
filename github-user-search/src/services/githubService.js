// Example service for API calls
export const fetchUser = async (username) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  const headers = apiKey
    ? { Authorization: `token ${apiKey}` }
    : {};
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  });
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};
