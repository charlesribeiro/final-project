import React, {Component} from 'react';
import './App.css';

import Map from './components/Map'
import SearchBar from './components/SearchBar';
import SideBar from './components/SideBar';
import * as ExternalAPI from './utils/ExternalAPI';

class App extends React.Component {

  state = { 
    places:[],
    markers:[],
    isInfoWindowBeingShown: false,
   }

   componentDidMount(){

    //this.setState({places: allPlaces})
   }

   fillMarkers(places){
    console.log("fill");
   }



  render()
  {
  return (
      <div className="App"> 
        <SideBar></SideBar>
        <SearchBar></SearchBar>
        <Map places = {this.state.places} updateMarkers = {this.fillMarkers}>aaa</Map>
      </div>
  );
  }
}

export default App
