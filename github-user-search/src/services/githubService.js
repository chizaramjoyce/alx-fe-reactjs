import axios from "axios";

export const fetchUserData = async (username) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  const headers = apiKey
    ? { Authorization: `token ${apiKey}` }
    : {};
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "User not found" };
  }
};
