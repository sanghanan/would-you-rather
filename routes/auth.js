const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await User.findOne({ where: { username: username } });
        if (userExists) {
            req.flash('error', 'Username already exists');
            return res.redirect('/register');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        });

        res.redirect('/login?message=Thank you for registering');
    } catch (error) {
        res.status(500).send('Error during registration');
    }

});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/', // Redirect to the desired page after successful login
        failureRedirect: '/login?error=User does not exist',
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
