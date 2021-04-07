import React, { useState, useEffect, useRef } from "react";
import config from "../config";
import Form from "react-bootstrap/Form";

export default function LocationSearch(props) {
    
    const autoCompleteRef = useRef(null);

    let autoComplete;

    // Similar to componentDidMount and commponentDidUpdate
    useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsAPIKey}&libraries=places`,
          () => handleScriptLoad(autoCompleteRef)
        );
    }, []);

    // Calls Google Maps to get AutoComplete
    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    // Constructs AutoComplete object with our configurations (has its own action listener)
    function handleScriptLoad(autoCompleteRef) {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { types: ["(cities)"] }
        );
        autoComplete.setFields(["formatted_address", "geometry"]);
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect()
        );
    }

    // Function that happens when place changes
    async function handlePlaceSelect() {
        const addressObject = autoComplete.getPlace();
        const city = addressObject.formatted_address;
        const latTemp = addressObject.geometry.location.lat();
        const lngTemp = addressObject.geometry.location.lng();
        const newTrip = {
            location: city,
            lat: latTemp,
            lng: lngTemp
        };
        props.onChange(newTrip);
    }

    return (
        <div className="search-location-input">
          <Form.Control
            ref={autoCompleteRef}
            placeholder="Enter a City"
            value={props.location}
          />
        </div>
    );
}