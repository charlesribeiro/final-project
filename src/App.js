import React from 'react';
import logo from './logo.svg';
import './App.css';

import Map from './components/Map'
import SearchBar from './components/SearchBar';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      
      <SideBar></SideBar>

      <SearchBar></SearchBar>
      
      <Map>aaa</Map>

    </div>
  );
}

export default App;
