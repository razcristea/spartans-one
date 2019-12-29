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
  onKeyUp = (target, event) => {
    if (event.keyCode === 13) {
      switch (target) {
        case "name":
          this.phone.focus();
          break;
        case "phone":
          this.email.focus();
          break;
        case "email":
          this.age.focus();
          break;
        case "age":
          this.benchpress.focus();
          break;
        case "benchpress":
          this.strictpress.focus();
          break;
        case "strictpress":
          this.pushpress.focus();
          break;
        case "pushpress":
          this.row.focus();
          break;
        case "row":
          this.backsquat.focus();
          break;
        case "backsquat":
          this.frontsquat.focus();
          break;
        case "frontsquat":
          this.deadlift.focus();
          break;
        case "deadlift":
          this.trapbardeadlift.focus();
          break;
        case "trapbardeadlift":
          this.photo.focus();
          break;
        case "photo":
          this.submitBtn.focus();
          break;
        default:
          this.name.focus();
      }
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
          <Form noValidate onSubmit={this.handleSubmit}>
            {/* NAME */}
            <Form.Group as={Row} controlId="formName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Athlete's name"
                  ref={input => {
                    this.name = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "name")}
                />
              </Col>
            </Form.Group>
            {/* PHONE */}
            <Form.Group as={Row} controlId="formPhone">
              <Form.Label column sm={2}>
                Phone
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Phone number"
                  ref={input => {
                    this.phone = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "phone")}
                />
              </Col>
            </Form.Group>
            {/* EMAIL ADDRESS */}
            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  ref={input => {
                    this.email = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "email")}
                />
              </Col>
            </Form.Group>
            {/* AGE SELECTION */}
            <Form.Group as={Row} controlId="formAge">
              <Form.Label column sm={2}>
                Age
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter age"
                  ref={input => {
                    this.age = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "age")}
                />
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
                  ref={input => {
                    this.benchpress = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "benchpress")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Strictpress"
                  name="strictpress"
                  ref={input => {
                    this.strictpress = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "strictpress")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Pushpress"
                  name="pushpress"
                  ref={input => {
                    this.pushpress = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "pushpress")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Row"
                  name="row"
                  ref={input => {
                    this.row = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "row")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Backsquat"
                  name="backsquat"
                  ref={input => {
                    this.backsquat = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "backsquat")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Frontsquat"
                  name="frontsquat"
                  ref={input => {
                    this.frontsquat = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "frontsquat")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Deadlift"
                  name="deadlift"
                  ref={input => {
                    this.deadlift = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "deadlift")}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Trapbardeadlift"
                  name="trapbardeadlift"
                  ref={input => {
                    this.trapbardeadlift = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "trapbardeadlift")}
                />
              </Col>
            </Form.Group>
            {/* PHOTO UPLOAD */}
            <Form.Group as={Row} controlId="formPhoto">
              <Form.Label column sm={2}>
                Photo
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="file"
                  onChange={this.onChangeFileHandler}
                  ref={input => {
                    this.photo = input;
                  }}
                  onKeyUp={this.onKeyUp.bind(this, "photo")}
                />
              </Col>
            </Form.Group>
            {/* SUBMIT BUTTON */}
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                variant="success"
                type="submit"
                ref={button => {
                  this.submitBtn = button;
                }}
                onKeyUp={this.onKeyUp.bind(this, "submitBtn")}
              >
                Submit
              </Button>
            </Col>
            <Form.Group as={Row}></Form.Group>
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
