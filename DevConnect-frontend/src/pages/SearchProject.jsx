import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';
import { fetchProjects, commentProject } from '../api';

// Skeleton loader component
const ProjectSkeleton = () => (
  <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 animate-pulse">
    <div className="h-6 bg-gray-400/20 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-400/20 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-400/20 rounded w-5/6 mb-4"></div>
    <div className="h-4 bg-gray-400/20 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-400/20 rounded w-1/3"></div>
  </div>
);

const SearchProject = () => {
  const [search, setSearch] = useState('');
  const [projects, setProjects] = useState([]);
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);

  const fetchProjectss = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetchProjects({ search, token });
      setProjects(res.projects);
    } catch (error) {
      alert('Error fetching projects');
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectss();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCommentChange = (projectId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [projectId]: value,
    }));
  };

  const handleCommentSubmit = async (projectId) => {
    // const commentText = commentInputs[projectId]?.trim();
    // if (!commentText) {
    //   alert('Comment cannot be empty!');
    //   return;
    // }
    console.log(projectId , comment)
    try {
      const res = await commentProject(projectId, comment);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                comments: [...project.comments, { username: user.name, text: commentText }],
              }
            : project
        )
      );
      setCommentInputs((prev) => ({
        ...prev,
        [projectId]: '',
      }));
      alert(res.message);
    } catch (error) {
      alert('Error posting comment');
      console.error('Error posting comment:', error);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 8px 20px rgba(99, 102, 241, 0.4)' },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex flex-col">
      <Navbar />
      <motion.div
        className="max-w-5xl mx-auto p-6 pt-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 text-center bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover Projects
        </motion.h1>

        <motion.div
          className="relative mb-8"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
        >
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by title or tech stack..."
            className="w-full p-4 pr-12 bg-white/10 backdrop-blur-lg text-white placeholder-gray-300 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 shadow-lg"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300">🔍</span>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 hover:shadow-2xl hover:border-indigo-400 transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ y: -5 }}
              >
                <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-gray-200 text-sm mb-3">{project.description}</p>
                <p className="text-sm text-gray-300 mb-3">
                  <span className="font-semibold">Tech:</span> {project.techStack}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-400 transition font-medium"
                >
                  GitHub Repo →
                </a>

                <div className="mt-4">
                  <h3 className="font-semibold text-md text-white mb-2">Comments:</h3>
                  {project.comments.length > 0 ? (
                    <ul className="space-y-3 mb-4 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-white/10">
                      {project.comments.map((comment, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <Avatar px="10px" py="10px" />
                          <div className="text-sm text-gray-200 bg-white/5 p-2 rounded-lg">
                            <span className="font-semibold text-white">{comment.commenter}:</span>{' '}
                            {comment.comment}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm mb-4">No comments yet.</p>
                  )}

                  <div className="flex gap-2">
                    <motion.input
                      type="text"
                      value={comment || ''}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 p-2 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.button
                      onClick={() => handleCommentSubmit(project._id)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Post
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            className="text-gray-300 text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No projects match your search.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default SearchProject;