const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user'); // Adjust the path as necessary
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ where: { username: username } });
        if (userExists) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        });

        // Redirect to login page after successful registration
        res.redirect('/login'); // Adjust the redirect URL as necessary
    } catch (error) {
        res.status(500).send('Error during registration');
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/', // Redirect to the desired page after successful login
        failureRedirect: '/login', // Redirect back to the login page if there is an error
        failureFlash: true // Allow flash messages
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/login');
    });
});


module.exports = router;