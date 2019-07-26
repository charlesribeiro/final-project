import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';




class Map extends Component{
    constructor(props) {
        console.log(props);
        super(props);
    }
    componentWillReceiveProps({isScriptLoadSucceed}){

        var curitiba = {lat: -25.4809, lng: -49.3044};
        var myLatLng2 = {lat: -25.4819, lng: -49.3044};

        if (isScriptLoadSucceed) {

            // var markers = [marker];

            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: {lat: -25.4809, lng: -49.3044}
            });

            var marker = new window.google.maps.Marker({
                position: curitiba,
                map: map,
                title: 'Testes!'
              });

            var marker2 = new window.google.maps.Marker({
                position: myLatLng2,
                map: map,
                title: 'Testes 2!'
              });

            marker2.setMap(null);
      
        }
        else{
            console.error("erro ao carregar script");
            alert("script not loaded");
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
