import React, { Component } from "react";
import { MDBInput, MDBIcon } from "mdbreact";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

export default class EditInfoModal extends Component {
  render() {
    console.log(this.props);
    return (
      <MDBContainer>
        <MDBModal
          isOpen={this.props.isShowing}
          toggle={() => this.props.show(!this.props.isShowing)}
        >
          <MDBModalHeader toggle={() => this.props.show(!this.props.isShowing)}>
            Edit athlete
          </MDBModalHeader>
          <MDBModalBody>
            <div className="form-group">
              <MDBInput label="Name" icon="user" />
              <MDBInput label="Phone" icon="phone" />
              <MDBInput label="Email" icon="envelope-open" />
              <MDBIcon icon="male" /> / <MDBIcon icon="female" />
              {/* <MDBInput label="Age" />
              <MDBInput label="Sex" /> */}
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.props.show(!this.props.isShowing)}
            >
              Close
            </MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
