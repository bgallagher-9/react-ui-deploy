const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', { name : String, url: String })

module.exports = Recipe;
