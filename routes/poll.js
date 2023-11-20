const express = require('express');
const router = express.Router();
const Poll = require('../models/poll'); // Adjust the path to your Poll model
const User = require('../models/user'); // Adjust the path to your User model

// Route for voting on an option
router.post('/:option', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }

    const option = req.params.option;

    try {
        const user = await User.findByPk(req.user.id);
        if (user.hasVoted) {
            return res.send('You have already voted');
        }

        const poll = await Poll.findOne();
        if (option === 'option1') {
            poll.option1Votes += 1;
        } else if (option === 'option2') {
            poll.option2Votes += 1;
        } else {
            return res.status(400).send('Invalid option');
        }
        
        await poll.save();

        user.hasVoted = true;
        await user.save();

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your vote');
    }
});


module.exports = router;