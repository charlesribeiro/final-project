import React, {Component} from 'react';
import './App.css';
import Map from './components/Map'
import SearchBar from './components/SearchBar';
import SideBar from './components/SideBar';
import * as ExternalAPI from './utils/ExternalAPI';

class App extends Component {

  state = { 
    places:[{id:"4dc5d9df887717c8802f2143", name:"Sushi arte", location:{lat:-25.462181110065053, lgn:-49.28082373380995}}],
    markers:[],
    isInfoWindowBeingShown: false,
   }

   componentDidMount(){

    let allPlaces =[];


    ExternalAPI.getPlaces().then(places => {  console.log("olha os places", places);  
    
      allPlaces=places;
      console.log(allPlaces);
      this.setState({places: allPlaces});
      console.log(this.state.places);});
   
  }



  render()
  {
  return (
      <div className="App"> 
        <SideBar places = {this.state.places} ></SideBar>
        <SearchBar></SearchBar>
        <Map places = {this.state.places} updateMarkers = {this.fillMarkers}></Map>
      </div>
  );
  }
}

export default App
