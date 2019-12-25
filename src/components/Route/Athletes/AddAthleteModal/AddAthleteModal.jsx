import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default class AddAthleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      selectedFile: null
    };
  }

  onChangeFileHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    console.log(isValid);

    this.setState({
      isValidated: isValid
    });

    if (isValid === false) {
      event.stopPropagation();
    } else {
      console.log("Form validated and submitted");

      const personalBest = form.formPersonalBest;
      const personalScore = {};
      for (let i = 0; i < personalBest.length; i++) {
        personalScore[personalBest[i].name] =
          parseInt(personalBest[i].value) || 0;
      }

      console.log(personalScore);

      const formData = new FormData();
      formData.append("name", form.formName.value);
      formData.append("phoneNumber", form.formPhone.value);
      formData.append("email", form.formEmail.value);
      formData.append("age", form.formAge.value);
      formData.append("sex", form.formGender.value);
      formData.append("personalBest", JSON.stringify(personalScore));
      formData.append("photo", this.state.selectedFile);

      fetch(athletesAPI, {
        method: "POST",
        body: formData
      })
        .then(
          response => {
            return response.json();
          },
          error => {
            console.log(error);
          }
        )
        .then(this.props.changeCount)
        .then(this.props.onHide); // this will close the modal
    }
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        message={this.props.message}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new Athlete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* FORM STARTS HERE */}
          <Form
            noValidate
            // validated={this.state.isValidated}
            onSubmit={this.handleSubmit}
          >
            {/* NAME */}
            <Form.Group as={Row} controlId="formName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Athlete's name"
                />
              </Col>
            </Form.Group>
            {/* PHONE */}
            <Form.Group as={Row} controlId="formPhone">
              <Form.Label column sm={2}>
                Phone
              </Form.Label>
              <Col sm={10}>
                <Form.Control required type="text" placeholder="Phone number" />
              </Col>
            </Form.Group>
            {/* EMAIL ADDRESS */}
            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control required type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {/* AGE SELECTION */}
            <Form.Group as={Row} controlId="formAge">
              <Form.Label column sm={2}>
                Age
              </Form.Label>
              <Col sm={10}>
                <Form.Control required type="number" placeholder="Enter age" />
              </Col>
            </Form.Group>
            {/* GENDER SELECTION */}
            <fieldset>
              <Form.Group as={Row} controlId="formGender">
                <Form.Label as="legend" column sm={2}>
                  Sex
                </Form.Label>
                <Col sm={10}>
                  <Form.Check type="radio" label="M" value="M" name="gender" />
                  <Form.Check type="radio" label="F" value="F" name="gender" />
                </Col>
              </Form.Group>
            </fieldset>
            {/* PERSONAL BEST SCORE */}
            <Form.Group as={Row} controlId="formPersonalBest">
              <Form.Label column lg={12}>
                Personal Best
              </Form.Label>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Benchpress"
                  name="benchpress"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Strictpress"
                  name="strictpress"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Pushpress"
                  name="pushpress"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Row"
                  name="row"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Backsquat"
                  name="backsquat"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Frontsquat"
                  name="frontsquat"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Deadlift"
                  name="deadlift"
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Trapbardeadlift"
                  name="trapbardeadlift"
                />
              </Col>
            </Form.Group>
            {/* PHOTO UPLOAD */}
            <Form.Group as={Row} controlId="formPhoto">
              <Form.Label column sm={2}>
                Photo
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="file" onChange={this.onChangeFileHandler} />
              </Col>
            </Form.Group>
            {/* SUBMIT BUTTON */}
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
          {/* FORM ENDED RIGHT ABOVE */}
        </Modal.Body>
        {/* OPTIONAL FOOTER - UNCOMMENT BELOW TO DISPLAY */}
        {/* <Modal.Footer>
                <Button variant="danger" size="sm" onClick={this.onHide}>Cancel</Button>
            </Modal.Footer> */}
      </Modal>
    );
  }
}
