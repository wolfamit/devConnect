import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../api';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      if (isSignIn) {
        const userData = { email, password };
        if (!email || !password) {
          alert('Please fill in all fields');
          return;
        }
        const response = await signin(userData, navigate);
        console.log('Sign In Response:', response);
      } else {
        const userData = { email, password, name };
        if (!email || !password || !name) {
          alert('Please fill in all fields');
          return;
        }
        const response = await signup(userData, navigate);
        console.log('Sign Up Response:', response);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center">
      <motion.div
        className="max-w-md mx-auto p-8 bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </motion.h2>
        <div className="space-y-6">
          {!isSignIn && (
            <motion.input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)} // Fixed bug
              className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
              required
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            />
          )}
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={isSignIn ? 0 : 1}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={isSignIn ? 1 : 2}
          />
          <motion.button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </div>
        <motion.div
          className="mt-4 text-center text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {isSignIn ? (
            <span>
              Don't have an account?{' '}
              <button
                className="text-indigo-300 hover:text-indigo-400 underline"
                onClick={() => setIsSignIn(false)}
                type="button"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                className="text-indigo-300 hover:text-indigo-400 underline"
                onClick={() => setIsSignIn(true)}
                type="button"
              >
                Sign In
              </button>
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;