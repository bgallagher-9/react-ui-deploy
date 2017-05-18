
const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipes.js');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
// var mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27020/mongodata/recipetestdeploy';
var mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27021/test';
mongoose.connect(mongoURL);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api/recipes', function(req, res) {
  const url = `http://www.recipepuppy.com/api/?q=${req.query.foodQuery}&i=${req.query.ingredientQuery}`
  // console.log(req.query, 'url', url);
  request(url, function(err, resp, body) {
    body = JSON.parse(body);
    res.send(body)
  });
});

app.post('/api/recipe', function(req, res) {

  // console.log('posting', req.body);

  var recipe = new Recipe();
  recipe.name = req.body.title;
  recipe.url = req.body.href;
  recipe.save(function() {
  })
  res.send('congrats?');
})

app.get('/api/savedrecipes', function(req, res) {
  Recipe.find({})
    .exec(function(err, data) {
    //  console.log(arguments);
      res.send(data);
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
