import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/'); // Use navigate instead of window.location.href for SPA consistency
    } else {
      setData(JSON.parse(localStorage.getItem('user')));
    }
  }, [navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const emojiVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-500 to-purple-400 flex flex-col">
      <Navbar />
      <motion.div
        className="pt-[70px] px-6 text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
          variants={titleVariants}
        >
          Welcome to <span className='text-gray-400'>DevConnect</span>
        </motion.h1>
        <motion.span
          className="text-5xl md:text-7xl block mt-4"
          variants={emojiVariants}
        >
          👩‍💻👨‍💻
        </motion.span>
        <motion.p
          className="text-lg text-gray-200 mt-4 max-w-2xl mx-auto"
          variants={textVariants}
        >
          A platform where developers share their amazing projects and connect with the community through comments and collaboration.
        </motion.p>

        <motion.div
          className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20"
          variants={textVariants}
        >
          <h2 className="text-2xl font-semibold text-white">
            Hello, {data?.name || 'Guest'}!
          </h2>
          <p className="text-gray-300 mt-2">Email: {data.email}</p>
          <p className="text-gray-300 mt-2">Bio: {data.bio}</p>
          <p className="text-gray-300 mt-2">Skills: {data.skills}</p>
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => navigate('/add-project')}
            className="px-8 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg text-lg transition duration-300 ease-in-out"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            ➕ Add Your Project
          </motion.button>
          <motion.button
            onClick={() => navigate('/search-projects')}
            className="px-8 py-3 rounded-full text-white bg-purple-600 hover:bg-purple-700 shadow-lg text-lg transition duration-300 ease-in-out"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            🔍 Search Projects
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;