import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Avatar from '../components/Avatar';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const linkVariants = {
    hover: { scale: 1.1, color: '#a5b4fc', transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  const avatarVariants = {
    hover: { scale: 1.1, rotate: 10, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="fixed top-0 w-full bg-gradient-to-r from-white to-blue-500/90 backdrop-blur-md shadow-lg z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/home" className="font-bold text-xl text-indigo-800">
            DevConnect
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Links */}
        <div
          className={`flex-col md:flex-row md:flex items-center md:space-x-6 font-medium text-black ${
            menuOpen ? 'flex mt-4 space-y-4 md:space-y-0' : 'hidden md:flex'
          }`}
        >
          <motion.div whileHover="hover" variants={linkVariants}>
            <Link to="/edit-profile" className="hover:text-indigo-300 transition">
              Edit Profile
            </Link>
          </motion.div>
          <motion.div whileHover="hover" variants={linkVariants}>
            <Link to="/add-project" className="hover:text-indigo-300 transition">
              Add Project
            </Link>
          </motion.div>
          <motion.div whileHover="hover" variants={linkVariants}>
            <Link to="/search-projects" className="hover:text-indigo-300 transition">
              Search Projects
            </Link>
          </motion.div>

          {/* Avatar and Logout - visible on both mobile & desktop */}
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <motion.div whileHover="hover" variants={avatarVariants}>
              <Avatar py="20px" px="20px" borderRadius="50%" />
            </motion.div>
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
