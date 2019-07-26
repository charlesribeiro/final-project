import React, {Component} from "react";
import PropTypes from 'prop-types';


class SideBar extends Component
{

    static propTypes = {
        places: PropTypes.array.isRequired
    }

    componentDidMount(){
      console.log(this.places);
    }



    render()
    {

        console.log(this.state);
        console.log(this.props.places);

        return(<div tabIndex="0"> 
        <ul>
          {this.props.places.map((place) => {
            return (
              <li>{'- ' + place.name}</li>
            )
          })}
        </ul>
        </div>);
    }
}

export default SideBar;