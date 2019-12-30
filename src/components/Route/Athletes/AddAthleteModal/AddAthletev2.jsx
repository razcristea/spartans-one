import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";

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
        <Modal.Header
          className="text-light"
          style={{
            backgroundColor: "#1f1f1f",
            position: "sticky",
            top: "0",
            left: "0",
            right: "0",
            zIndex: "100"
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            <MDBIcon icon="user-plus" /> Add new Athlete
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
          className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate
          style={{ backgroundColor: "#1f1f1f" }}
        >
          <Modal.Body className="bg-dark text-light">
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  icon="user"
                  value={this.state.name}
                  name="name"
                  onChange={this.changeHandler}
                  type="text"
                  id="FormName"
                  label="Name"
                  outline
                  required
                >
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  icon="phone"
                  value={this.state.phone}
                  name="phone"
                  onChange={this.changeHandler}
                  type="text"
                  id="FormPhone"
                  label="Phone Number"
                  outline
                  required
                >
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  icon="envelope-open"
                  value={this.state.email}
                  onChange={this.changeHandler}
                  type="email"
                  id="FormEmail"
                  name="email"
                  label="Email address"
                  outline
                  required
                >
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  icon="baby"
                  value={this.state.age}
                  onChange={this.changeHandler}
                  type="number"
                  id="FormAge"
                  name="age"
                  label="Age"
                  outline
                  required
                >
                  <div className="invalid-feedback">
                    Please provide athlete's age.
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                </MDBInput>
              </MDBCol>
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
                  Genre: <MDBIcon icon="male" /> / <MDBIcon icon="female" />
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
                    You must select a genre!
                  </div>
                </div>
              </MDBCol>
            </MDBRow>

            <div className="mt-2 mb-2 text-center">
              <MDBIcon icon="dumbbell" /> Personal Best:
            </div>
            <MDBRow className="mt-3">
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="benchpress"
                  name="benchpress"
                  label="Benchpress"
                  outline
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="strictpress"
                  name="strictpress"
                  label="Strictpress"
                  outline
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="pushpress"
                  name="pushpress"
                  label="Pushpress"
                  outline
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="row"
                  name="row"
                  label="Row"
                  outline
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="backsquat"
                  name="backsquat"
                  label="Backsquat"
                  outline
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="frontsquat"
                  name="frontsquat"
                  label="Frontsquat"
                  outline
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="deadlift"
                  name="deadlift"
                  label="Deadlift"
                  outline
                />
              </MDBCol>
              <MDBCol md="3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="trapDeadlift"
                  name="trapDeadlift"
                  label="Trapbardeadlift"
                  outline
                />
              </MDBCol>
            </MDBRow>
            <MDBCol md="12" className="mb-3 mt-3">
              <div className="custom-control custom-checkbox pl-3">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck"
                  required
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
          <Modal.Header
            style={{
              backgroundColor: "#1f1f1f",
              position: "sticky",
              bottom: "0"
            }}
          >
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
