import React, { useState, useEffect, useRef } from "react";
import config from "../config";
import Form from "react-bootstrap/Form";

export default function LocationSearch() {
    const [location, setLocation] = useState("");
    //const [lat, setLat] = useState("");
    //const [lng, setLng] = useState("");
    const autoCompleteRef = useRef(null);

    let autoComplete;

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

    async function handlePlaceSelect() {
        const addressObject = autoComplete.getPlace();
        const location1 = addressObject.formatted_address;
        //const lat = addressObject.geometry.location.lat();
        //const lng = addressObject.geometry.location.lng();
        setLocation(location1);
        //setLat(lat);
        //setLng(lng);
        console.log(location1);
        console.log(this.location);
    }

    useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsAPIKey}&libraries=places`,
          () => handleScriptLoad(autoCompleteRef)
        );
    }, []);
    
    return (
        <div className="search-location-input">
          <Form.Control
            ref={autoCompleteRef}
            onChange={event => setLocation(event.target.value)}
            placeholder="Enter a City"
            value={location}
          />
        </div>
    );
}