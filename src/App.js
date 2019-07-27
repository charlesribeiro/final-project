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
    this.changeSearchTerm=this.changeSearchTerm.bind(this);
    
}

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }


  changeSearchTerm(searchTerm)
  {
    this.setState({searchTerm});
    console.log(this.state);
    debugger;
  }

   changePlaces(places){
     console.log(" foi@", places);
     console.log(this.state);
     this.setState({places});
   }

   componentWillMount(){



      // ExternalAPI.getPlaces().then(places => {  
        
      //   console.log("", places);  
      //   allPlaces=places;
      //   console.log(allPlaces);
      //   this.setState({places});
      //   console.log(this.state.places);});
   
  }

  render()
  
  {
    console.log(this.state.places);
  return (
      <div className="App"> 

      
        <Map places = {this.state.places} updateMarkers = {this.fillMarkers} changePlaces={this.changePlaces} searchTerm = {this.state.searchTerm}></Map>
        <SideBar searchTerm = {this.state.searchTerm} places = {this.state.places} ></SideBar>
        <SearchBar searchTerm = {this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}></SearchBar>

      </div>
  );
  }
}

export default App
