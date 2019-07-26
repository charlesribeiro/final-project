import React, { Component } from 'react';
import { Debounce  } from 'react-throttle';



class SearchBar extends Component{

    render(){
        return(
        <div className="search-books-bar">
        
            <div className="search-books-input-wrapper">
                <Debounce  time="200" handler="onChange">
                    <input type="text" onChange={this.changeSearchStatus} placeholder="Search by title or author"/>
                </Debounce >
            </div>
        </div>)
        ;
    }
}

export default SearchBar
