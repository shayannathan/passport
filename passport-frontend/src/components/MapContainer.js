import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import config from "../config";

//May need to not hard-code styling
const mapStyles = {
  width: '1110px',
  height: '79%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

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
      >
      {this.props.data.map((trip, i) => {
        return(<Marker
          key={i}
          position = {{
            lat: trip.lat,
            lng: trip.lng
          }}
          title = {trip.location}
        />)
      })}
      </Map>
    );
  }

  
}

export default GoogleApiWrapper({
    apiKey: config.googleMapsAPIKey
})(MapContainer);