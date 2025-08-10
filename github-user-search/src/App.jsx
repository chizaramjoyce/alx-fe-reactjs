import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
        <nav className="bg-blue-600 text-white p-4 shadow font-sans">
          <ul className="flex space-x-4 font-sans">
            <li><Link to="/" className="hover:underline font-sans">Home</Link></li>
            {/* Add more links here */}
          </ul>
        </nav>
        <main className="flex-1 container mx-auto p-6 font-sans">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
