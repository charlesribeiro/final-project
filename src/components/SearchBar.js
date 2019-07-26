import React, { Component } from 'react';
import { Debounce  } from 'react-throttle';

class SearchBar extends Component{

    changeSearchStatus=(event)=>{

        const searchString = event.target.value;
        console.log("pesquisa", searchString);

        
        //this.selectMarker();
    }

    // selectMarker()
    // {
    //   var id="534f0d0f498e9e7e1f206780";
    //   window.document.querySelector(`[title="${id}"]`).click()
    // }

    render(){
        return(
        <div className="search-restaurants-bar" role="application">
        
            <div className="search-restaurants-input-wrapper">
                <Debounce  time="200" handler="onChange">
                    <input type="text" onChange={this.changeSearchStatus} placeholder="Procurar sushi"/>
                </Debounce >
            </div>
        </div>)
        ;
    }
}

export default SearchBar
