// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab
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
        res.redirect('/recipes')
    }
})

// GET recipe by recipeId
router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients').populate('owner');
        res.render('recipes/show.ejs', {
            recipe,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// POST '/'
router.post('/', async (req, res) => {
    try {
        const { name, instructions } = req.body;
        let ingredients = req.body.ingredients;
        
        // if only one ing, make an array
        if (!Array.isArray(ingredients)) {
            ingredients = [ingredients];
        }

        // create and save ing docs
        const ingredientDocs = await Promise.all(
            ingredients.map(async (ing) => {
                const newIngredient = new Ingredient({
                    name: ing,
                });
                await newIngredient.save();
                return newIngredient._id;
            })
        );

        // Create the new recipe (ref to ing Id)
        const newRecipe = await Recipe({
            name,
            instructions,
            ingredients,
            owner: req.session.user._id,
        });

        await newRecipe.save();

        res.redirect(`/recipes/${newRecipe._id}`);

    } catch (error) {
        console.log(error);
        res.redirect('/recipes/new');
    }
});

// DELETE a recipe
router.delete('/:recipeId', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.recipeId);
        res.redirect('/recipes');
    } catch (error) {
        console.log(error);
        res.redirect('/recipes')
    }
});


  
module.exports = router;
