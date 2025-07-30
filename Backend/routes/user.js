import express from 'express';
import auth from '../Middlewares/authMiddleware.js';
import { signup } from '../Controllers/auth.js';
import { signin } from '../Controllers/auth.js';
import { addProject, commentOnProject, editProfile, fetchProjects } from '../Controllers/user.js';

const router = express.Router();

router.post('/signin' , signin);
router.post('/signup' , signup);
router.post('/edit-profile/:id', auth , editProfile);
router.post('/add-project/:id', auth, addProject);
router.get('/fetchProjects' , auth , fetchProjects);
router.post('/comment-project/:id', auth, commentOnProject);
export default router;