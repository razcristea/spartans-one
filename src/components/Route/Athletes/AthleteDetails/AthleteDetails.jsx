import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AthleteDetails({ info }) {
  const { name, age, sex, email, photo, _id, personalBest } = info;
  return (
    <Fragment>
      <Card key={_id} className="rounded-0 mb-5">
        <div eventkey={_id}>
          <Card.Body className="text-center">
            <Card.Img
              as={Image}
              src={photo}
              style={{
                maxHeight: 300,
                objectFit: "contain",
                imageOrientation: "from-image"
              }}
            />
            <Card.Title as={"h3"}>{name}</Card.Title>
            <Card.Text>
              <small className="text-muted">{email}</small>
              <span style={{ display: "block" }}>
                {" "}
                Age: {age} | Sex: {sex}
              </span>
            </Card.Text>
            <ListGroup
              variant="flush"
              style={{ padding: "1rem 0" }}
              id={"scores-" + _id}
            >
              {Object.keys(personalBest).map((key, index) => (
                <ListGroup.Item as={Form} key={index}>
                  <Row>
                    <Col>
                      <Form.Label>
                        <span style={{ textTransform: "capitalize" }}>
                          {key}
                        </span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={true}
                        type="number"
                        className="scores-best"
                        name={key}
                        defaultValue={personalBest[key]}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <ButtonGroup size="sm" aria-label="Action Buttons">
              <Button variant="success" className="m-1">
                <i className="fas fa-user-cog"></i> Edit
              </Button>
              <Button variant="secondary" className="m-1">
                <i className="fas fa-backward"></i> Back to MyAthletes
              </Button>
            </ButtonGroup>
          </Card.Body>
        </div>
      </Card>
    </Fragment>
  );
}
