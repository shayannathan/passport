import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import MapContainer from "../components/MapContainer"
import travel1 from '../assets/travel1.jpg'
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        //const trips = await loadNotes(); will call api
        const trips = [];
        setTrips(trips);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderTripsList(notes) {
    return (
      <>
        <LinkContainer to="/trips/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Add a new trip</span>
          </ListGroup.Item>
        </LinkContainer>
        {notes.map(({ noteId, content, createdAt }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Passport</h1>
        <p className="text-muted">Welcome All Travelers!</p>
        <img src={travel1} alt="travel1"></img>
      </div>
    );
  }
  //<img src={require('../assets/travel1.jpg')} alt="travel1"></img> 
  //Adding images like this won't work for some reason, must import them for webpack to know

  function renderTrips() {
    return (
      <div className="trips">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Trips</h2>
        <ListGroup>{!isLoading && renderTripsList(trips)}</ListGroup>
        <div className="py-3">
          <MapContainer className="py-3"/>
        </div>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderTrips() : renderLander()}
    </div>
  );
}