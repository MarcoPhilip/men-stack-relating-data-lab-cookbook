// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab

// GET /recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({}).populate('ingredients');
        res.render('recipes/index.ejs', {
            recipes,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// GET /recipes/new
router.get('/new', async (req, res) => {
    try {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', {
        ingredients,
    });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


// GET /:recipeId
router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients').populate('owner');
        res.render('recipes/show.ejs', {
            recipe: recipe,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//POST /recipes
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const { name, instructions } = req.body;
        let ingredients = req.body.ingredients;
        currentUser.recipe.push(req.body, req.body.ingredients);
        await currentUser.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});



  
module.exports = router;
