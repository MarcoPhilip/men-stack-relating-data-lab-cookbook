const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  // Define the properties of food schema
  foodName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  }
});



const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // embed the foodSchema
  pantry: [foodSchema],
  recipe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    }
  ]
});


const User = mongoose.model('User', userSchema);

module.exports = User;


