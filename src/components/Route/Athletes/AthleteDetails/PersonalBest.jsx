import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon } from "mdbreact";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default function PersonalBest({ id, info, refresh }) {
  const inputRef = useRef(null);
  const [percentage, setPercentage] = useState(50);
  const [editingPersonalBest, setEditingPersonalBest] = useState(false);
  const [personalBest, setPersonalBest] = useState(info);

  const updateRecords = e => {
    // first, target the scores for current id, and select all scores
    const elements = document
      .getElementById("scores-" + id)
      .getElementsByClassName("scores-best form-control");
    const editBtn = document.getElementById("updatePr");
    if (
      e.target.id === "triggerEdit" ||
      e.target.innerHTML.includes("Modify") ||
      e.target.className.includes("prfield") ||
      e.target.tagName === "INPUT" ||
      e.target.id === "updatePr"
    ) {
      // remove 'disabled' attribute
      e.target.autofocus = true;
      Object.keys(elements).map(key => (elements[key].disabled = false));
      Array.from(elements).map(
        element => (element.style.backgroundColor = "#33b5e5")
      );
      Array.from(elements).map(element => (element.style.color = "#fff"));
      // change button text:
      setEditingPersonalBest(true);
      editBtn.innerHTML = `<div id="savePr"> <i class="fas fa-save fa-2x mr-1"> </i> Update</div>`;
    } else {
      // initialize a new object
      const newScore = {};
      // add new scores to the newScore object
      Object.keys(elements).map(
        key =>
          (newScore[elements[key].name] = parseInt(elements[key].value) || 0)
        // remove 0 from numbers starting with 0 (ex: 0123) and if nothing entered, puts 0
      );

      const URI = athletesAPI + id;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // ABSOLUTELY necessary to specify Content-Type!

      fetch(URI, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ personalBest: newScore })
      })
        .then(response => response.json())
        .then(data => {
          Object.keys(elements).map(key => (elements[key].disabled = true));
          Array.from(elements).map(
            element => (element.style.backgroundColor = "#fff")
          );
          Array.from(elements).map(element => (element.style.color = "black"));
          setEditingPersonalBest(false);
          setPersonalBest(data.updatedField.personalBest);
          refresh();
          editBtn.innerHTML = `<div> <i class="fas fa-cog fa-2x mr-1"> </i> Change</div>`;
        })
        .catch(err => console.log(err));
      // !editBtn.innerText = `...`;     Nu uita: TREBUIE REPARAT AICI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
  };
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("updatePr").focus();
      updateRecords(e);
    }
  };

  return (
    <div>
      <h3 className="text-light mt-3 mb-2 p-2 headingStyle bg-dark">
        <MDBIcon icon="dumbbell" /> Personal Best
      </h3>
      <div className="detailsContainer mb-3 mt-0">
        <ListGroup
          className="card bg-dark p-0 w-100"
          variant="flush"
          style={{ padding: "0.5rem 0", color: "black" }}
          id={"scores-" + id}
        >
          <div className="d-flex align-items-center justify-content-around">
            <Button
              className="font-weight-bol"
              onClick={updateRecords}
              id="updatePr"
              variant={!editingPersonalBest ? "info" : "success"}
              size="sm"
            >
              <i className="fas fa-cog fa-2x mr-1" id="triggerEdit"></i> Change
            </Button>
            <h2 className="mt-2 font-weight-bold text-white border pr-3 pl-3">
              {percentage}%
            </h2>
          </div>
          {Object.keys(personalBest).map((key, index) => (
            <ListGroup.Item
              as={Form}
              key={index}
              onClick={updateRecords}
              onKeyPress={handleKeyPress}
              style={{
                backgroundColor: "#353539",
                color: "white",
                paddingLeft: "25px"
              }}
            >
              <Row style={{ lineHeight: "30px" }}>
                <Col className="p-0 w-25 ml-0">
                  <Form.Label>
                    <div style={{ textTransform: "capitalize" }}>{key}</div>
                  </Form.Label>
                </Col>
                <Col className="p-0 w-25 ml-4 prfield">
                  <Form.Control
                    disabled={true}
                    type="number"
                    className="scores-best text-center"
                    name={key}
                    defaultValue={personalBest[key]}
                  />
                </Col>
                <div className="ml-4">
                  <i className="far fa-arrow-alt-circle-right fa"></i>
                </div>
                <Col className="p-0 w-25">
                  <div>
                    {(parseInt(personalBest[key]) * percentage) / 100}
                    <small>kg</small>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="p-0 text-light mt-1 ml-3 card bg-info text-center">
          <div className="m-1 font-weight-bold">98%</div>
          <input
            ref={inputRef}
            className="mx-auto prSlider"
            type="range"
            name="percentage"
            min="10"
            max="98"
            draggable
            step="1"
            onChange={() => setPercentage(inputRef.current.value)}
          />
          <div className="m-1 font-weight-bold">10%</div>
        </div>
      </div>
    </div>
  );
}
