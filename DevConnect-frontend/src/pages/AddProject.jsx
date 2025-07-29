import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { addProject } from '../api'; // Assumes this function is defined

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    github: '',
    liveLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await addProject(formData);
      alert('Project added successfully!');
      console.log(res.data);
      setFormData({ title: '', description: '', techStack: '', github: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add project.');
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
    <div className="min-h-screen bg-gradient-to-br pt-[80px] p-3 from-green-400 via-teal-500 to-blue-500 flex flex-col">
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
          Add Your Project
        </motion.h2>
        <div className="space-y-6">
          <motion.input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          />
          <motion.textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
            rows={4}
            required
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          />
          <motion.input
            type="text"
            name="techStack"
            placeholder="Technologies Used (e.g., React, Node)"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          />
          <motion.input
            type="url"
            name="github"
            placeholder="GitHub Repo URL"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          />
          <motion.input
            type="url"
            name="liveLink"
            placeholder="Live URL optional"
            value={formData.liveLink}
            onChange={handleChange}
            className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          />
          <motion.button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Submit Project
          </motion.button>
        </div>
      </motion.div>
    </div>
  </>
  );
};

export default AddProject;