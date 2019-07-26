import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import * as Settings from '../utils/Settings'
import PropTypes from 'prop-types';
import * as ExternalAPI from '../utils/ExternalAPI';

class Map extends Component{
    constructor(props) {
        console.log(props);
        super(props);
    }

    static propTypes = {
        places: PropTypes.array.isRequired
    }

    

    componentWillReceiveProps({isScriptLoadSucceed}){

        

        var myLatLng2 = {lat: -25.4819, lng: -49.3044};

        if (isScriptLoadSucceed) {

            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: Settings.DEFAULT_ZOOM_LEVEL,
                center: Settings.CURITIBA
            });


            let allPlaces =[];
            ExternalAPI.getPlaces().then(places => {
          
          allPlaces=places;
          console.log(allPlaces);
          this.setState({places: allPlaces});
          console.log(this.state.places);

          allPlaces.map(place=>{
            console.log(place);

            let latlong = {lat: place.location.lat, lng: place.location.lng}

            var marker = new window.google.maps.Marker({
                position: latlong,
                map: map,
                title: place.name
              });
            
          })
    
        });

            console.log("foi", this.places);

            // var markers = [marker];

            

           

           

            var marker2 = new window.google.maps.Marker({
                position: myLatLng2,
                map: map,
                title: 'Testes 2!'
              });

            marker2.setMap(null);
      
        }
        else{
            console.error("erro ao carregar script");
            alert("erro ao carregar script do Maps");
        }
    }

    render(){
        return(
            <div id="mapa">
                <div id="map" style={{height: "93vh", marginTop: "53px", marginBottom: "-53px"}}></div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyB9U__HyENMn3a-UYk68jb3zjsSu_8elwQ&libraries=places"]
)(Map)

//https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require/45677810#45677810
