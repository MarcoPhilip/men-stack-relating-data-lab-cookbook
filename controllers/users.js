// controllers/users.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

// Get all users
router.get('/', async (req, res) => {
    try {
        // look for all users from DB 
        const allUsers = await User.find({});
        // render the users/index.ejs
        res.render('users/index.ejs', {
            allUsers,
        });
    } catch (error) {
        // if error occurs, log and then redirect back home
        console.log(error);
        res.redirect('/');
    }
});

// SHOW route for /users controller
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.render('users/show.ejs', { user });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})



module.exports = router;
