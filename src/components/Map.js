import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import * as Settings from '../utils/Settings'
import PropTypes from 'prop-types';
import * as ExternalAPI from '../utils/ExternalAPI';

class Map extends Component{

    markers = [];

    map;

    state = {
        query:"",
    }

    currentQuery="";

    

    calledAPIAlready = false; //como a API chama um evento que por sua vez muda o state do app 

    constructor(props) {
        console.log(props);
        super(props);

        this.state={query:""};
        this.showMarkers.bind(this);

    }


    static propTypes = {
        places: PropTypes.array.isRequired,
        changePlaces: PropTypes.func.isRequired,
        searchTerm: PropTypes.string.isRequired,
    }

    showMarkers()
    {

        if(window.google)
        {
        let placeDetails = new window.google.maps.InfoWindow({})

        // console.log(this.props.places.filter(p=>p.name.includes(this.props.searchTerm)));
        console.log(this.props.places.filter(p=>p.name.localeCompare(this.currentQuery)));
        // debugger;

          this.props.places.filter(p=>p.name.includes(this.currentQuery)).map(place=>{
            // console.log("place", place);
            //debugger;

            let latlong = {lat: place.location.lat, lng: place.location.lng}

            var marker = new window.google.maps.Marker({
                position: latlong,
                map: this.map,
                title: place.id,
                animation: window.google.maps.Animation.DROP
                // icon: `${place.categories[0].icon.prefix}90${place.categories[0].icon.suffix} //tentativa de carregar
                // ícone vindo da API do Foursquare. O ícone vem, porém transparente.
                // `
              });

              marker.addListener('click', function(){

                console.log(place);
                
                placeDetails.setContent(`<b>${place.name}</b> ---
               Address: ${place.location.address 
                ? place.location.address: place.location.city 
                ? place.location.city: "Unavailable"}`)  
                placeDetails.open(this.map, marker);

                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                  } else {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                  }
              })

              this.markers.push(marker);
            
          })
        }
        else
        {
            console.error("window undefined");
        }
    }

    componentDidUpdate()
    {
        // debugger;

        this.removeAllMarkers();
        this.showMarkers();
        
        console.log(this.props.places);

    }

    componentWillUpdate()
    {
        // debugger;
        console.log("componentWillUpdate",this.props.places);
    }
    componentWillMount()
    {
        // debugger;
        console.log("componentWillMount",this.props.places);
    }



    componentWillReceiveProps({isScriptLoadSucceed}){

        //https://www.npmjs.com/package/react-async-script-loader

        if (isScriptLoadSucceed) {

            if(this.calledAPIAlready == false)
            {

            this.map = new window.google.maps.Map(document.getElementById('map'), {
                    zoom: Settings.DEFAULT_ZOOM_LEVEL,
                    center: Settings.CURITIBA
            });

            }
            else
            {
                console.log(this.props);
            }
        
        }
        else{
            console.error("erro ao carregar script");
            alert("Erro ao carregar script do maps");
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        console.log(nextProps, nextState);

        // this.setState({query: nextProps.searchTerm});

        console.log("shouldComponentUpdate", this.props);
        console.log("shouldComponentUpdate", nextProps);

        this.currentQuery = nextProps.searchTerm; 

        return (this.props.searchTerm !== nextProps.searchTerm)|| 
        (this.state.query !== nextState.searchTerm);

        // if(this.props && this.props.places){
        //     // debugger;
        //     this.props.places.map(place=>{console.log("chegou o place", place)});

        //     // this.updateMarkers();
        // }
        // debugger;
    }

    componentDidMount(){
        debugger;

        ExternalAPI.getPlaces().then(places => {
            this.calledAPIAlready=true;
            this.props.changePlaces(places); 
            this.removeAllMarkers();
            this.showMarkers();

            }).catch(error=>
                {
                    alert("Falha ao obter dados da API do Foursquare");
                    console.log(error);}
            );
        console.log("componentDidMount ",this.props.places);
    }

    removeAllMarkers()
    {
        this.markers.map(mk =>{
            mk.setMap(null);
        })

    }

    updateMarkers()
    {

        this.removeAllMarkers();

        var map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: Settings.DEFAULT_ZOOM_LEVEL,
            center: Settings.CURITIBA
        });


        let allPlaces = this.props.places;
      
        console.log(this.state.places);

        let placeDetails = new window.google.maps.InfoWindow({})

        allPlaces.map(place=>{
        console.log(place);

        let latlong = {lat: place.location.lat, lng: place.location.lng}

        var marker = new window.google.maps.Marker({
            position: latlong,
            map: map,
            title: place.name,
            animation: window.google.maps.Animation.DROP
            // icon: `${place.categories[0].icon.prefix}90${place.categories[0].icon.suffix}
            // `
          });

          marker.addListener('click', function(){
            placeDetails.setContent(`${place.name} --
           Address: ${place.location.address?place.location.address: place.location.city?place.location.city: "Unavailable"}`)  
            placeDetails.open(map, marker);

            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
              }
          })

          

          this.markers.push(marker);
        
      })

      window.google.maps.event.trigger(map,'resize');



    }

    render(){

        // debugger;

        console.log(this.props.places);
        return(

            <div id="mapa">
                <div id="map" role ="application"  tabIndex = "0" style={{height: "100vh", marginTop: "0px", marginBottom: "0px"}}></div>
            </div>
        )
    }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyB9U__HyENMn3a-UYk68jb3zjsSu_8elwQ&libraries=places"]
)(Map)


//Esta thread do stack overflow auxiliou na resolução do carregamento do google maps com o react sem bibliotecas externas
//https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require/45677810#45677810
