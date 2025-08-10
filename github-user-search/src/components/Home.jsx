import React from "react";

const Home = () => (
  <div>
      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-lg mx-auto max-w-2xl p-8">
  <h2 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow font-sans">GitHub User Search</h2>
  <p className="text-lg text-gray-800 mb-6 text-center max-w-md font-sans">
          Welcome to the GitHub User Search App! Enter a username to find GitHub profiles and view their details.
        </p>
        <div className="w-full flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Search GitHub username..."
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-sans"
            disabled
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition font-sans"
            disabled
          >
            Search
          </button>
        </div>
  <div className="mt-8 text-gray-500 text-sm font-sans">(Search functionality coming soon)</div>
      </section>
  </div>
);

export default Home;
