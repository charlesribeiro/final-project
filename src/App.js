import React, {Component} from 'react';
import './App.css';
import Map from './components/Map'
import SearchBar from './components/SearchBar';
import SideBar from './components/SideBar';
import * as ExternalAPI from './utils/ExternalAPI';

class App extends Component {

  state = { 

   }

   constructor(props) {
    super(props);
    this.state = {
      places:[{id:"4dc5d9df887717c8802f2143", name:"Sushi arte", location:{lat:-25.462181110065053, lgn:-49.28082373380995}}],
      markers:[],
      isInfoWindowBeingShown: false,
      searchTerm:"",
        
    }
    this.changePlaces=this.changePlaces.bind(this);
}

   changePlaces(places){
     console.log(" foi@", places);
     console.log(this.state);
     this.setState({places});
   }

   componentWillMount(){

    let allPlaces =[];


      ExternalAPI.getPlaces().then(places => {  
        
        console.log("", places);  
        allPlaces=places;
        console.log(allPlaces);
        this.setState({places});
        console.log(this.state.places);});
   
  }



  render()
  
  {
    console.log(this.state.places);
  return (
      <div className="App"> 
        <SideBar places = {this.state.places} ></SideBar>
        <SearchBar searchTerm = {this.state.searchTerm}></SearchBar>
        <Map places = {this.state.places} updateMarkers = {this.fillMarkers} changePlaces={this.changePlaces}></Map>
      </div>
  );
  }
}

export default App
