import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import config from "../config";

//May need to not hard-code styling
const mapStyles = {
  width: '1110px',
  height: '79%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google}
        zoom={9}
        style={mapStyles}
        initialCenter={
          {
            lat: 37.65,
            lng: -122.33
          }
        }
      />
    );
  }

  
}

export default GoogleApiWrapper({
    apiKey: config.googleMapsAPIKey
})(MapContainer);