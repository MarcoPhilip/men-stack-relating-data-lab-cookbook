// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

// GET /users/:userId/foods
router.get('/', (req, res) => {
    res.render('foods/index.ejs');
});

// GET /users/:userId/foods/new
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});


module.exports = router;
