import User from '../Models/AuthModel.js'
import Project from '../Models/ProjectsModel.js';


export const editProfile = async (req, res) => {
    try {
        const { name, email, bio, skills } = req.body;

        const { id } = req.params; // Assuming you have user ID from auth middleware
        // console.log('Editing profile for user ID:', id);
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        // console.log('Profile data:', { name, email, bio, skills });
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.skills = skills || user.skills;

        const updated = await user.save();
        return res.status(200).json({ message: 'Profile updated successfully', result: updated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const addProject = async (req, res) => {
    const { title, description, techStack, github, liveLink } = req.body;
    const { id } = req.params; // Assuming you have user ID from auth middleware
    const user = await User.findById(id);
    try {
        // Create a new project
        const newProject = await Project.create({
            userId: id,
            author : user.name,
            title: title,
            description: description,
            techStack: techStack,
            github: github,
            liveLink: liveLink,
            comments: [],
        });

        res.status(201).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const fetchProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('userId', 'name') // populate name of the author
      .populate('comments.userId', 'name') // optionally populate commenter name
      .sort({ postedOn: -1 });

    const formattedProjects = projects.map((project) => ({
      _id: project._id,
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      github: project.github,
      liveLink: project.liveLink,
      postedOn: project.postedOn,
      author: project.userId?.name || 'Unknown',

      comments: project.comments.map((c) => ({
        comment: c.comment,
        commentedAt: c.commentedAt,
        commenter: c.userId?.name || 'Anonymous'
      }))
    }));

    res.status(200).json({ success: true, projects: formattedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



export const searchProjects = async (req, res) => {
    const { query } = req.query;

    try {
        // Search for projects based on the query
        const projects = await Project.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { skills: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error searching projects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const commentOnProject = async (req, res) => {
    const { userId, comment} = req.body;
    const { id } = req.params; // Assuming you have user ID from auth middleware

    try {
        // Find the project by ID
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const user = await User.findById(userId);
        // Add the comment to the project's comments array
        project.comments.push({ userId: userId, commentAuthor : user.name , comment : comment });
        await project.save();

        res.status(200).json({ message: 'Comment added successfully', project });
    } catch (error) {
        console.error('Error commenting on project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
