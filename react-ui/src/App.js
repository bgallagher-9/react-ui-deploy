import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';



class App extends Component {
  constructor(){
    super();
    this.state = {
      queryInputValue: '',
      liveInputValue: '',
      recipes: [],
      filters: [],
      filterInputValues: ''
    }
  }



  queryForRecipes() {
    const url = `/api/recipes?foodQuery=${this.state.liveQueryValue}&ingredientQuery=${this.state.filters.join()}`

    console.log('url', url);

    $.ajax({
      url: url
    })
    .done((data) => {
      console.log('data!', data);

      const fixedData = data.results.map((recipe) => {
        let thumbnail = recipe.thumbnail !== '' ? recipe.thumbnail: 'no-image.png'
        return {
          href: recipe.href,
          thumbnail: thumbnail,
          ingredients: recipe.ingredients,
          title: recipe.title
        }
      })
      this.setState({
        recipes: fixedData
      });
    });
  }

  handleChange(evt) {
    this.setState({
      queryInputValue: evt.target.value
    })
  }

  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.setState({
        liveQueryValue: evt.target.value,
        queryInputValue: ''
      }, () => {
        this.queryForRecipes();
      });
    }
  }

  handleSearchClick() {
    this.setState({
      liveQueryValue: this.state.queryInputValue,
      queryInputValue: ''
    }, () => {
      this.queryForRecipes();
    });
  }

  handleFilterOnKeyUp(evt) {
    if (evt.keyCode === 13) {
      const filterArray = this.state.filters.slice();
      filterArray.push(this.state.filterInputValues);
      this.setState({
        filters: filterArray,
        filterInputValues: ''
      }, () => {
        this.queryForRecipes();
      });
    }

  }

  handleFilterInputChange(evt) {
    this.setState({
      filterInputValues: evt.target.value
    })
  }

  render() {
    const items = this.state.recipes.map((recipe, i) => {
      return <li key={recipe.title + i}>
        <img src={recipe.thumbnail} alt={recipe.title} />
        {recipe.title}<br/>
        {recipe.ingredients}
      </li>
    });

    let filter;
    if (this.state.recipes.length > 0) {
      const filters = this.state.filters.map((filter, i) => {
        return <li key={filter + i}>{filter}</li>
      });
      filter = <div>
        <input
          onChange={(evt) => this.handleFilterInputChange(evt)}
          onKeyUp={(evt) => this.handleFilterOnKeyUp(evt)}
          value={this.state.filterInputValues}
          />
        <ol>
          {filters}
        </ol>
      </div>
    }

    return (
      <div className="recipe-puppy-search">
        <input
          onChange={(evt) => this.handleChange(evt)}
          onKeyUp={(evt) => this.handleKeyUp(evt)}
          value={this.state.queryInputValue}
          />
        <button onClick={() => this.handleSearchClick()}>SEARCH</button>
      {filter}
        <ol>
          {items}
        </ol>
      </div>
    );
  }
}

export default App;
