import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { editProfile } from '../api'; // Assumes this function is defined
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    skills: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('Submitting form data:', formData);
    try {
      const response = await editProfile(formData , navigate);
      alert('Profile updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  // Animation variants for form elements
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen p-3 pt-[80px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      <motion.div
        className="max-w-lg mx-auto mt-12 p-8 bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Edit Your Profile
        </motion.h2>
        <div className="space-y-6">
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          />
          <motion.textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            rows={4}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          />
          <motion.input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          />
          <motion.button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default EditProfile;