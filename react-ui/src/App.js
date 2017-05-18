import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RecipePuppySearch from './recipepuppysearch.js';
import SavedRecipes from './savedrecipes.js';



class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <nav>
            <Link to="/">Search</Link>
            <Link to="/saved">Saved Recipes</Link>
          </nav>
          <Route path="/" exact component={RecipePuppySearch} />
          <Route path="/saved" component={SavedRecipes} />
        </div>
      </Router>
    );
  }
}


export default App;
