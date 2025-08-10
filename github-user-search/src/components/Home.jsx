import React from "react";
import Search from "./Search";

const Home = () => {
  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-lg mx-auto max-w-2xl p-8">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow font-sans">GitHub User Search</h2>
        <p className="text-lg text-gray-800 mb-6 text-center max-w-md font-sans">
          Welcome to the GitHub User Search App! Enter a username to find GitHub profiles and view their details.
        </p>
        <Search />
      </section>
    </div>
  );
};

export default Home;
