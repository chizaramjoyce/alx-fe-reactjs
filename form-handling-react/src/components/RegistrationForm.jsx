import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        if (!username) {
          setErrors(prevErrors => ({ ...prevErrors, username: 'Required' }));
          return;
        }

        if (!email) {
          setErrors(prevErrors => ({ ...prevErrors, email: 'Required' }));
          return;
        }

        if (!password) {
          setErrors(prevErrors => ({ ...prevErrors, password: 'Required' }));
          return;
        }

        console.log({ username, email, password });
      }}
    >
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      {errors.username && (
        <div className="error">{errors.username}</div>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      {errors.email && (
        <div className="error">{errors.email}</div>
      )}
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {errors.password && (
        <div className="error">{errors.password}</div>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
