import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideBar extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

  constructor(props) {
    console.log(props);
    super(props);
  }

  componentDidMount() {
    console.log(this.places);
  }

  click() {
    console.log('click', this);
  }

  render() {
    console.log(this.props.places);

    return (
      <div className="sidebar" tabIndex="0">
        <ul className="location-list" role="tablist" className="menuitems">
          {this.props.places.filter((p) => p.name.includes(this.props.searchTerm)).map((place) => (
            <button onClick={(e) => this.click(e, place)} id={place.id}>
              {' '}
              {place.name}
            </button>
          ))}
        </ul>
      </div>
    );
  }
}

export default SideBar;
