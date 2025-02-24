
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    try {
      // Prepare the login data
      const loginData = { email, password };

      // Send the login data to the server
      const response = await fetch('http://localhost:3000/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully logged in
        console.log('Logged in successfully:', data);
        data.data.token && localStorage.setItem('token', data.data.token);
        // Redirect to the user profile page after successful login
        navigate('/twitterprofile');
      } else {
        // Show error message from the server
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-2 w-full max-w-4xl min-h-[70vh] flex">
        {/* Left Side: Image Section */}
        <div className="w-1/2 hidden md:block">
          <img src="src/assets/gomez.webp" alt="login illustration" className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/2 p-18">
          <h2 className="text-3xl font-bold text-red-50 mb-8 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-white text-lg font-stretch-expanded mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border rounded w-full text-white py-4 px-4 focus:ring-2 focus:ring-gray-500 transition duration-300"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-white text-lg font-stretch-expanded mb-2 mt-5" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none border rounded w-full text-white py-4 px-4 focus:ring-2 focus:ring-gray-500 transition duration-300"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Login Button */}
            <div className="flex items-center mt-7 justify-center">
              <button
                className="border border-gray-300 hover:cursor-pointer font-stretch-expanded text-white py-3 px-6 rounded-full transition-transform duration-200 hover:scale-105 w-full"
                type="submit"
              >
                Login
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center mt-4 justify-center">
              <a href="/forgetpassword" className="text-blue-500 hover:underline cursor-pointer">
                Forget Password?
              </a>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-white text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline cursor-pointer">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
