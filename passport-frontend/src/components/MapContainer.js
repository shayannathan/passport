import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import config from "../config";

const mapStyles = {
  width: '79%',
  height: '79%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google}
        zoom={14}
        //style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
    apiKey: config.googleMapsAPIKey
})(MapContainer);