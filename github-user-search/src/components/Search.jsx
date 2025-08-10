

import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsers([]);
    setTotalCount(0);
    setError(null);
    setPage(1);

    if (username.trim()) {
      setLoading(true);
      try {
        const data = await fetchUserData(username.trim(), location, minRepos, 1, perPage);
        setUsers(data.users);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await fetchUserData(username.trim(), location, minRepos, nextPage, perPage);
      setUsers(prev => [...prev, ...data.users]);
      setPage(nextPage);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-4 font-sans">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">GitHub Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          required
        />

        <label htmlFor="location" className="text-sm font-medium text-gray-700">Location (optional)</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter location"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />

        <label htmlFor="minRepos" className="text-sm font-medium text-gray-700">Minimum Public Repositories (optional)</label>
        <input
          id="minRepos"
          type="number"
          min="0"
          value={minRepos}
          onChange={e => setMinRepos(e.target.value)}
          placeholder="e.g. 10"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
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
      {users.length > 0 && (
        <div className="w-full max-w-2xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map(user => (
            <div key={user.id} className="flex flex-col items-center p-6 bg-white rounded-lg shadow font-sans">
              <img src={user.avatar_url} alt={user.name || user.login} className="w-20 h-20 rounded-full mb-3" />
              <h3 className="text-lg font-bold mb-1">{user.name || user.login}</h3>
              <p className="text-gray-700 mb-1">{user.location ? `Location: ${user.location}` : "Location not specified"}</p>
              <p className="text-gray-700 mb-1">Public Repos: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}
      {users.length > 0 && users.length < totalCount && !loading && (
        <button
          onClick={handleLoadMore}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 font-sans"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
