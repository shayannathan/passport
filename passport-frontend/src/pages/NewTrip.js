import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./NewTrip.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import AutoComplete from "../components/AutoComplete";

export default function NewTrip() {
  const file = useRef(null);
  const history = useHistory();
  const [location, setLocation] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return location && tripDate;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      console.log(location);
      await createTrip({ location, tripDate, content, attachment });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createTrip(trip) {
    return API.post("trips", "/trips", {
      body: trip
    });
  }

  return (
    <div className="NewTrip">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="" controlId="email">
          <Form.Label>Location</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
        </Form.Group>
        <Form.Group size="" controlId="email">
          <Form.Label>Trip Date</Form.Label>
          <Form.Control
            autoFocus
            type="date"
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}