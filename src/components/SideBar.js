import React, {Component} from "react";
import PropTypes from 'prop-types';


class SideBar extends Component
{

    static propTypes = {
        places: PropTypes.array.isRequired
    }

    render()
    {
        console.log(this.places); //Por algum motivo, essa lista sempre vem vazia;

        return(<div tabIndex="      0"> 
        <ul>
          {/* {this.places.map((place) => {
            return (
              <li>{'- ' + place.title}</li>
            )
          })} */}
        </ul>
        </div>);
    }
}

export default SideBar;