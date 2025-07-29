import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/AuthModel.js'
// import { stripe } from '../utility/stripe.js';


export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User already exists, return an appropriate response
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({ result: existingUser, token});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate a JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    // Send a successful response with user data and token
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // User not found, return an appropriate response
      return res.status(401).json({ message: "User doesn't exist" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      // Incorrect password, return an appropriate response
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Send a successful response with user data and token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error('Error in login:', error);

    // Send an appropriate error response
    res.status(500).json({ message: error.message });
  }
};