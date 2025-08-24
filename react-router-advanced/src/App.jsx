import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Profile from './components/Profile'
import ProfileDetails from './components/ProfileDetails'
import ProfileSettings from './components/ProfileSettings'
import UserProfile from './components/UserProfile'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './contexts/AuthContext'

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ display: 'inline', marginRight: '1rem' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '1rem' }}>
          <Link to="/profile">Profile</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '1rem' }}>
          <Link to="/users/123">Sample User Profile</Link>
        </li>
        <li style={{ display: 'inline' }}>
          {isAuthenticated ? (
            <button onClick={logout} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navigation />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>
              <Route
                path="/users/:userId"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
