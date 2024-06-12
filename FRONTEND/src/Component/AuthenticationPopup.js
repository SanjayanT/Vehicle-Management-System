import React, { useState } from 'react';

const AuthenticationPopup = ({ onAuthenticate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuthenticate = () => {
    // Perform authentication here (check username and password against backend)
    if (username === 'admin' && password === 'admin123') {
      onAuthenticate(true); // Pass authentication status to parent component
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-md p-8 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Authentication Required</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
          onClick={handleAuthenticate}
        >
          Authenticate
        </button>
      </div>
    </div>
  );
};

export default AuthenticationPopup;
