import React, { Component } from 'react';
import { Debounce } from 'react-throttle';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
  };

  changeSearchStatus = (event) => {
    const searchTerm = event.target.value;
    this.props.changeSearchTerm(searchTerm);
  };

  render() {
    return (
      <div className="search-restaurants-bar" role="application">

        <div className="search-restaurants-input-wrapper">
          <Debounce time="500" handler="onChange">
            <input type="text" onChange={this.changeSearchStatus} placeholder="Buscar restaurantes" />
          </Debounce>
        </div>
      </div>
    );
  }
}

export default SearchBar;
