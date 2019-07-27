import React, {Component} from "react";
import PropTypes from 'prop-types';


class SideBar extends Component
{

    static propTypes = {
        places: PropTypes.array.isRequired
    }

    
    constructor(props) {
      console.log(props);
      super(props);
    }

    componentDidMount(){
      console.log(this.places);
    }



    render()
    {

        console.log(this.state);
        console.log(this.props.places);

        return(<div class="sidebar" tabIndex="0"> 
        <ul>
          {this.props.places.map((place) => {
            return (
              <a>{'- ' + place.name}</a>
            )
          })}
        </ul>
        </div>);
    }
}

export default SideBar;