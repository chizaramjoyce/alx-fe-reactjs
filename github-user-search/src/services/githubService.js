import axios from "axios";

export const fetchUserData = async (
  username,
  location = "",
  minRepos = "",
  page = 1,
  perPage = 5
) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  const headers = apiKey
    ? { Authorization: `token ${apiKey}` }
    : {};

  // Build the search query
  let query = `${username ? `${username} in:login` : ""}`;
  if (location) {
    query += ` location:${location}`;
  }
  if (minRepos) {
    query += ` repos:>=${minRepos}`;
  }

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url, { headers });
    if (response.data.items && response.data.items.length > 0) {
      // Fetch full user details for each user in parallel
      const userDetails = await Promise.all(
        response.data.items.map(async (user) => {
          try {
            const userResponse = await axios.get(user.url, { headers });
            return userResponse.data;
          } catch {
            return null;
          }
        })
      );
      // Filter out any failed requests
      return {
        users: userDetails.filter(Boolean),
        totalCount: response.data.total_count,
      };
    } else {
      return {
        users: [],
        totalCount: 0,
      };
    }
  } catch (error) {
    throw error.response?.data || { message: "User not found" };
  }
};
