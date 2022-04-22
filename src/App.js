import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import './App.css';
import Map from './components/Map';
import SearchBar from './components/SearchBar';

class App extends Component {
  state;

  constructor(props) {
    super(props);
    this.state = {
      places: [
        {
          id: '4dc5d9df887717c8802f2143',
          name: 'Sushi arte',
          location: { lat: -25.462181110065053, lgn: -49.28082373380995 },
        },
      ],
      //local de testes
      markers: [],
      isInfoWindowBeingShown: false,
      searchTerm: '',
      sidebarOpen: true,
      sidebarDocked: true,
    };
    this.changePlaces = this.changePlaces.bind(this);
    this.changeSearchTerm = this.changeSearchTerm.bind(this);
  }

  click = (e, marker) => {
    if (window.document.querySelector(`[title="${marker.id}"]`)) {
      window.document.querySelector(`[title="${marker.id}"]`).click();
    }
  };

  changeSearchTerm(searchTerm) {
    this.setState({ searchTerm });
  }

  changePlaces(places) {
    this.setState({ places });
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          role="navigation"
          sidebar={
            <div>
              <h1>Sushi em Curitiba</h1>
              <SearchBar
                searchTerm={this.state.searchTerm}
                changeSearchTerm={this.changeSearchTerm}
              ></SearchBar>
              <div className="sidebar" id="leftsideMenu" tabIndex="0">
                <ul className="location-list" role="tablist" className="list">
                  {this.state.places
                    .filter((p) => p.name.includes(this.state.searchTerm))
                    .map((place) => {
                      return (
                        <li onClick={(e) => this.click(e, place)} id={place.id}>
                          {place.name}{" "}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <Map
            places={this.state.places}
            updateMarkers={this.fillMarkers}
            changePlaces={this.changePlaces}
            searchTerm={this.state.searchTerm}
          ></Map>
        </Sidebar>
      </div>
    );
  }
}

export default App