//Modules for server
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
//Models
const User = require('../models/User');

//Route for user sigup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // Check if user already exists
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Create a new user
        const newUser = new User({
            userName: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).send({ msg: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Route For User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Check password
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Create and sign JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch(err){
        res.status(500).json({ message: 'Server error' });
    }
});

//Check if user logged in or not
router.post('/loggedInStatus', async(req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json(true);
    } catch (err) {
        res.json(false);
    }
})

module.exports = router;