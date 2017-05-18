import React, { Component } from 'react';
import $ from 'jquery';

class SavedRecipes extends Component {

  constructor() {
    super();
    this.state = {
      recipeSaves: []
    }
  }

  componentDidMount(recipes) {

    $.ajax({
      url: '/api/savedrecipes'
    })
    .done((data) => {

      this.setState({
        recipeSaves: data
      });
    });
  }

  render() {
    console.log(this.state)
    const recipesSaved = this.state.recipeSaves.map((recipe, i) => {
      return <li key={recipe.name + i} >
        {recipe.name}<br/>
      {recipe.url}
      </li>
    });

    return (
      <div>
        {recipesSaved}
      </div>
    );
  }

}

module.exports = SavedRecipes;
