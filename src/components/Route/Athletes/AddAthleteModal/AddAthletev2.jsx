import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";

class AddAthleteV2 extends React.Component {
  state = {
    name: "",
    phone: "",
    email: "",
    age: "",
    genre: "",
    personalBest: {
      benchPress: "",
      strictPress: "",
      pushPress: "",
      row: "",
      backsquat: "",
      frontsquat: "",
      deadlift: "",
      trapbardeadlift: ""
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
    console.log(form);
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("phoneNumber", this.state.phone);
    formData.append("email", this.state.email);
    formData.append("age", this.state.age);
    formData.append("sex", this.state.genre);
    formData.append("personalBest", JSON.stringify(this.state.personalBest));
    formData.append("photo", this.state.selectedFile);

    console.log(formData);
    console.log(this.state);
    // fetch(athletesAPI, {
    //   method: "POST",
    //   body: formData
    // })
    //   .then(
    //     response => {
    //       return response.json();
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )
    //   .then(this.props.changeCount)
    //   .then(this.props.onHide); // this will close the modal
  };

  changeHandler = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };
  changePrHandler = event => {
    this.setState({
      personalBest: { [event.target.name]: parseInt(event.target.value) || 0 }
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
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title id="contained-modal-title-vcenter">
            Add new Athlete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
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
                <div className="mt-3">Genre:</div>
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

            <div className="ml-3 mb-2">
              <MDBIcon icon="dumbbell" /> Personal Best:
            </div>
            <MDBRow className="mt-3">
              <MDBCol md="2" className="m-1 ml-3 mr-3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="benchpress"
                  name="benchpress"
                  label="Benchpress"
                  outline
                />
              </MDBCol>
              <MDBCol md="2" className="m-1 ml-3 mr-3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="strictpress"
                  name="strictpress"
                  label="Strictpress"
                  outline
                />
              </MDBCol>
              <MDBCol md="2" className="ml-3 mr-3 m-1">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="pushpress"
                  name="pushpress"
                  label="Pushpress"
                  outline
                />
              </MDBCol>
              <MDBCol md="2" className="m-1 ml-3 mr-3">
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
              <MDBCol md="2" className="m-1 ml-3 mr-3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="backsquat"
                  name="backsquat"
                  label="Backsquat"
                  outline
                />
              </MDBCol>
              <MDBCol md="2" className="m-1 ml-3 mr-3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="frontsquat"
                  name="frontsquat"
                  label="Frontsquat"
                  outline
                />
              </MDBCol>
              <MDBCol md="2" className="m-1 ml-3 mr-3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="deadlift"
                  name="deadlift"
                  label="Deadlift"
                  outline
                />
              </MDBCol>
              <MDBCol md="2" className="m-1 ml-3 mr-3">
                <MDBInput
                  onChange={this.changePrHandler}
                  type="number"
                  id="trapbardeadlift"
                  name="trapbardeadlift"
                  label="Trapbardeadlift"
                  outline
                />
              </MDBCol>
            </MDBRow>
            <MDBCol md="4" className="mb-3 mt-3">
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
            <MDBBtn color="success" type="submit">
              Submit Form
            </MDBBtn>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddAthleteV2;
