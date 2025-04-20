// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

// GET /users/:userId/foods
router.get('/', async (req, res) => {
    try {
        // look up the user from session
        const currentUser = await User.findById(req.session.user._id);
        // render the foods/index.ejs
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry,
        });
    } catch (error) {
        // if any errors redirect back home
        res.redirect('/');
    }
});

// GET /users/:userId/foods/new
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
});

// GET /users/:userId/foods/:recipeId
router.get('/:recipeId', async (req, res) => {
    try {
    // look up the user from session
    const currentUser = await User.findById(req.session.user._id);
    // find the recipe by the recipe id from req.params
    const recipe = currentUser.pantry.id(req.params.recipeId);
    // render the show.ejs passing the recipe data in the context object
    res.render('foods/show.ejs', {
        recipe: recipe,
    });
    } catch (error) {
    // if error occurs, redirect back home
    res.redirect('/');
    }
});

// POST /users/:userId/foods
router.post('/', async (req, res) => {
    try {
        // look up the user from DB
        const currentUser = await User.findById(req.session.user._id);
        // push req.body to the pantry array of the current user
        currentUser.pantry.push(req.body);
        // save changes to the user
        await currentUser.save();
        // redirect user back to the foods index view
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        // if error occurs, log them and redirect back home
        res.redirect('/');
    }
});


// DELETE //users/:userId/applications/:applicationsId
router.delete('/:recipeId', async (req, res) => {
    try {
        // look up the user from DB
        const currentUser = await User.findById(req.session.user._id);
        // Use the mongoose .delete() method to delete a recipe using id from req.params
        currentUser.pantry.id(req.params.recipeId).deleteOne();
        // save the changes
        await currentUser.save();
        // redirect back to the foods index view
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        //if error occurs, redirect back home and log error
        console.log(error)
        res.redirect('/')
    }
})

// GET /users/:userId/foods/edit
router.get('/:recipeId/edit', async (req, res) => {
    try {
        // look for user in DB
        const currentUser = await User.findById(req.session.user._id);
        const currentRecipe = currentUser.pantry.id(req.params.recipeId);
        res.render('foods/edit.ejs', {
            recipe: currentRecipe,
        });
    } catch (error) {
        res.redirect('/');
    }
});

module.exports = router;
