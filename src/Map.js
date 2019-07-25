import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';




class Map extends Component{
    constructor(props) {
        console.log(props);
        super(props);
    }
    componentWillReceiveProps({isScriptLoadSucceed}){

        var myLatLng = {lat: -25.4809, lng: -49.3044};

        if (isScriptLoadSucceed) {

            // var markers = [marker];

            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: {lat: -25.4809, lng: -49.3044}
            });

            var marker = new window.google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Testes!'
              });
      
        }
        else{
            console.error("erro ao carregar script");
            alert("script not loaded");
        }
    }

    render(){
        return(
            <div>
                <div id="map" style={{height: "600px"}}></div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyB9U__HyENMn3a-UYk68jb3zjsSu_8elwQ&libraries=places"]
)(Map)

//https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require/45677810#45677810
