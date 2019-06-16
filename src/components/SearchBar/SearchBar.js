import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTermChange(e) {
  // Update searching dynamically
    this.setState({
      searching: e.target.value
    })
  }

  handleKeyPress(e) {
  // Search if person hits Enter key
    if(e.keyCode === 'Enter') {
      this.props.onSearch(this.state.searching);
    }
  }

  search() {
  // Pass input to search function in App.js
    this.props.onSearch(this.state.searching);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
        onChange={this.handleTermChange}
        onKeyPress={this.handleKeyPress}
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
