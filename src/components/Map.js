import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';
import * as Settings from '../utils/Settings';
import * as ExternalAPI from '../utils/ExternalAPI';

class Map extends Component {
  markers = [];

  map;

  currentQuery = '';

  state = {
    query: '',
  };

  calledAPIAlready = false; // como a API chama um evento que por sua vez muda o state do app

  static propTypes = {
    places: PropTypes.array.isRequired,
    changePlaces: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { query: '' };
    this.showMarkers.bind(this);
  }

  showMarkers() {
    if (window.google) {
      const placeDetails = new window.google.maps.InfoWindow({});

      this.props.places.filter((p) => p.name.includes(this.currentQuery)).map((place) => {
        const latlong = { lat: place.location.lat, lng: place.location.lng };

        const marker = new window.google.maps.Marker({
          position: latlong,
          map: this.map,
          title: place.id,
          animation: window.google.maps.Animation.DROP,
        });

        marker.addListener('click', function () {
          placeDetails.setContent(`<b>${place.name}</b> ---
               Address: ${place.location.address
    ? place.location.address : place.location.city
      ? place.location.city : 'Unavailable'}`);
          placeDetails.open(this.map, marker);

          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
          }
        });

        this.markers.push(marker);
      });
    } else {
      console.error('window undefined');
    }
  }

  componentDidUpdate() {
    this.removeAllMarkers();
    this.showMarkers();
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    // https://www.npmjs.com/package/react-async-script-loader

    if (isScriptLoadSucceed) {
      if (this.calledAPIAlready === false) {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: Settings.DEFAULT_ZOOM_LEVEL,
          center: Settings.CURITIBA,
        });
      } else {
      }
    } else {
      console.error('erro ao carregar script');
      alert('Erro ao carregar script do maps');
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.currentQuery = nextProps.searchTerm;

    return (
      this.props.searchTerm !== nextProps.searchTerm
      || this.state.query !== nextState.searchTerm
    );
  }

  componentDidMount() {
    ExternalAPI.getPlaces().then((places) => {
      this.calledAPIAlready = true;
      this.props.changePlaces(places);
      this.removeAllMarkers();
      this.showMarkers();
    }).catch((error) => {
      console.log(error);
    });
  }

  removeAllMarkers() {
    this.markers.forEach((mk) => {
      mk.setMap(null);
    });
  }

  updateMarkers() {
    this.removeAllMarkers();

    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: Settings.DEFAULT_ZOOM_LEVEL,
      center: Settings.CURITIBA,
    });

    const allPlaces = this.props.places;

    const placeDetails = new window.google.maps.InfoWindow({});

    allPlaces.forEach((place) => {
      const latlong = { lat: place.location.lat, lng: place.location.lng };

      const marker = new window.google.maps.Marker({
        position: latlong,
        map,
        title: place.name,
        animation: window.google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        placeDetails.setContent(`${place.name} --
           Address: ${place.location.address ? place.location.address : place.location.city ? place.location.city : 'Unavailable'}`);
        placeDetails.open(map, marker);

        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      });

      this.markers.push(marker);
    });

    window.google.maps.event.trigger(map, 'resize');
  }

  render() {
    return (
      <div id="mapa">
        <div id="map" role="application" tabIndex="0" style={{ height: '100vh', marginTop: '0px', marginBottom: '0px' }} />
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyB9U__HyENMn3a-UYk68jb3zjsSu_8elwQ&libraries=places'],
)(Map);

// Esta thread do stack overflow auxiliou na resolução do carregamento do
// google maps com o react sem bibliotecas externas
// https://stackoverflow.com/questions/41709765/
// how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require/45677810#45677810
