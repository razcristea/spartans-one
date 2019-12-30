import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";
import "./AddAthlete.css";

import {
  addAthleteFields,
  personalBestFields
} from "../../../../helpers/addAthlete";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

class AddAthleteV2 extends React.Component {
  state = {
    name: "",
    phone: "",
    email: "",
    age: "",
    genre: "",
    personalBest: {
      benchpress: "" || 0,
      strictpress: "" || 0,
      pushpress: "" || 0,
      row: "" || 0,
      backsquat: "" || 0,
      frontsquat: "" || 0,
      deadlift: "" || 0,
      trapDeadlift: "" || 0
    },
    selectedFileName: "Upload Photo...",
    selectedFile: null
  };
  _handleKeyPress = (target, e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      switch (target) {
        case "name":
          this.phone.setFocus();
          break;
        case "phone":
          this.email.setFocus();
          break;
        case "email":
          this.age.setFocus();
          break;
        case "age":
          this.benchpress.setFocus();
          break;
        case "benchpress":
          this.strictpress.setFocus();
          break;
        case "strictpress":
          this.pushpress.setFocus();
          break;
        case "pushpress":
          this.row.setFocus();
          break;
        case "row":
          this.backsquat.setFocus();
          break;
        case "backsquat":
          this.frontsquat.setFocus();
          break;
        case "frontsquat":
          this.deadlift.setFocus();
          break;
        case "deadlift":
          this.trapDeadlift.setFocus();
          break;
        case "trapDeadlift":
          this.checkbox.focus();
          break;
        default:
          this.name.setFocus();
          break;
      }
    }
  };
  onChangeFileHandler = event => {
    this.setState({
      selectedFileName: event.target.files[0].name,
      selectedFile: event.target.files[0]
    });
  };
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    if (isValid) {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("phoneNumber", this.state.phone);
      formData.append("email", this.state.email);
      formData.append("age", this.state.age);
      formData.append("sex", this.state.genre);
      formData.append("personalBest", JSON.stringify(this.state.personalBest));
      formData.append("photo", this.state.selectedFile);

      fetch(athletesAPI, {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(answer => {
          this.props.onHide();
          this.props.showServerResponse(
            `${this.state.name} has joined The Box and Valy's Athletes!`
          );
        })
        .then(
          setTimeout(() => {
            this.props.changeCount();
          }, 3500)
        );
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changePrHandler = event => {
    this.setState({
      personalBest: {
        ...this.state.personalBest,
        [event.target.name]: parseInt(event.target.value) || 0
      }
    });
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
        <Modal.Header className="text-light modalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            <MDBIcon icon="user-plus" /> Add Athlete
          </Modal.Title>
          <button
            type="button"
            className="close text-white"
            onClick={this.props.onHide}
          >
            <span>&times;</span>
          </button>
        </Modal.Header>
        <form
          className="needs-validation addform"
          onSubmit={this.submitHandler}
          noValidate
        >
          <Modal.Body className="bg-dark text-light">
            <MDBRow>
              {addAthleteFields.map((field, index) => (
                <MDBCol md="4" key={index}>
                  <MDBInput
                    icon={field.icon}
                    value={this.state[field.name]}
                    name={field.name}
                    onChange={this.changeHandler}
                    type={field.type}
                    ref={input => {
                      this[field.name] = input;
                    }}
                    onKeyUp={this._handleKeyPress.bind(this, field.name)}
                    label={field.label}
                    outline
                    required
                  >
                    <div className="invalid-feedback">
                      {field.invalidMessage}
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </MDBInput>
                </MDBCol>
              ))}
              <MDBCol md="4">
                <MDBIcon icon="camera" />
                <div className="custom-file">
                  <input
                    type="file"
                    onChange={this.onChangeFileHandler}
                    className="custom-file-input"
                    id="FormPhoto"
                  />
                  <label className="custom-file-label" htmlFor="FormPhoto">
                    {this.state.selectedFileName}
                  </label>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div className="mt-3">
                  Gender: <MDBIcon icon="male" /> / <MDBIcon icon="female" />
                </div>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    onChange={this.changeHandler}
                    id="male"
                    name="genre"
                    value="M"
                    required
                  />
                  <label className="custom-control-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="custom-control custom-radio mb-3">
                  <input
                    type="radio"
                    className="custom-control-input"
                    onChange={this.changeHandler}
                    id="female"
                    name="genre"
                    value="F"
                    required
                  />
                  <label className="custom-control-label" htmlFor="female">
                    Female
                  </label>
                  <div className="invalid-feedback">
                    Please select male or female!
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
            <div className="mt-2 mb-2 text-center">
              <MDBIcon icon="dumbbell" /> Personal Best:
            </div>
            <MDBRow className="mt-3">
              {personalBestFields.map((field, index) => (
                <MDBCol md="3" key={index}>
                  <MDBInput
                    onChange={this.changePrHandler}
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    ref={input => {
                      this[field.name] = input;
                    }}
                    onKeyUp={this._handleKeyPress.bind(this, field.name)}
                    outline
                  />
                </MDBCol>
              ))}
            </MDBRow>
            <MDBCol md="12" className="mb-3 mt-3">
              <div className="custom-control custom-checkbox pl-3">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  name="checkbox"
                  value=""
                  id="invalidCheck"
                  required
                  ref={input => {
                    this.checkbox = input;
                  }}
                  onKeyUp={this._handleKeyPress.bind(this, "checkbox")}
                />
                <label className="custom-control-label" htmlFor="invalidCheck">
                  Check the box if the info submitted is correct
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </MDBCol>
          </Modal.Body>
          <Modal.Header className="modalFooter">
            <MDBBtn color="success" type="submit">
              <MDBIcon icon="share-square" /> Submit
            </MDBBtn>
            <MDBBtn color="danger" onClick={this.props.onHide}>
              <MDBIcon icon="ban" /> Cancel
            </MDBBtn>
          </Modal.Header>
        </form>
      </Modal>
    );
  }
}

export default AddAthleteV2;
