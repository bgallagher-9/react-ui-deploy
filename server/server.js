const express = require('express');
const path = require('path');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
// app.get('/api/recipes', function (req, res) {
//   res.set('Content-Type', 'application/json');
//   res.send('{"message":"Hello from the custom server!"}');
// });

app.get('/api/recipes', function(req, res) {
  const url = `http://www.recipepuppy.com/api/?q=${req.query.foodQuery}&i=${req.query.ingredientQuery}`;
  // console.log(req.query, 'url', url);
  request(url, function(err, resp, body) {
    body = JSON.parse(body);
    res.send(body)
  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
