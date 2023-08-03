const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate an access token and include it in the response
        const accessToken = jwt.sign(
            {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET_KEY, // Replace 'YOUR_SECRET_KEY' with your actual secret key
            {
                expiresIn: '1h', // Set the expiration time of the token (e.g., 1 hour)
            }
        );

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.getUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    try {
        // Fetch the user from the database based on the provided user ID
        const user = await User.findById(userId);

        if (!user) {
            // If the user with the provided ID is not found, return a 404 status code and an error message
            return res.status(404).json({ error: 'User not found' });
        }

        const { fullName, email } = user;

        // If the user is found, return the user details in the response
        res.json({
            fullName, email
        });
    } catch (error) {
        // If there is any error during the database query, return a 500 status code and an error message
        res.status(500).json({ error: 'Internal server error' });
    }
});


exports.currentUser = asyncHandler(async (req, res) => {
    // console.log(req.user)
    res.json(req.user)
})