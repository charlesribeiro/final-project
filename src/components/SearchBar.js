import React, { Component } from 'react';
import { Debounce  } from 'react-throttle';
import PropTypes from 'prop-types';


class SearchBar extends Component{

    static propTypes = {
        searchTerm: PropTypes.string.isRequired,
        changeSearchTerm: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        console.log(props);
        super(props);
    }

    changeSearchStatus=(event)=>{
        
        const searchTerm = event.target.value;
        console.log("pesquisa", searchTerm);
        this.props.changeSearchTerm(searchTerm);
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
                <Debounce  time="500" handler="onChange">
                    <input type="text" onChange={this.changeSearchStatus} placeholder="Buscar restaurantes"/>
                </Debounce >
            </div>
        </div>)
        ;
    }
}

export default SearchBar
