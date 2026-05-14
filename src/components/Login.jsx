import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCred.user); // Pass user back to App
      console.log('Email login successful');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user); // Pass user back to App
      console.log('Google Sign-In successful');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-500 text-sm">or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl mr-2" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
