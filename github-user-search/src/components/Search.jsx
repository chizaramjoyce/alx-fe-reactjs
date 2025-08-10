
import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(null);
    setError(null);
    if (username.trim()) {
      setLoading(true);
      try {
        const data = await fetchUserData(username.trim());
        setUser(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Search GitHub username..."
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-sans"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition font-sans"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-blue-600 font-sans mt-4">Loading...</div>
      )}
      {error && (
        <div className="text-red-600 font-sans mt-4">Looks like we cant find the user</div>
      )}
      {user && (
        <div className="flex flex-col items-center mt-6 p-6 bg-white rounded-lg shadow font-sans">
          <img src={user.avatar_url} alt={user.name || user.login} className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-xl font-bold mb-2">{user.name || user.login}</h3>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
