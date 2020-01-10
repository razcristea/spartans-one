import React, { Component } from "react";
import { MDBInput } from "mdbreact";

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
    return (
      <MDBContainer>
        <MDBModal
          isOpen={this.props.isShowing}
          toggle={() => this.props.show(!this.props.isShowing)}
          centered
        >
          <MDBModalHeader
            toggle={() => this.props.show(!this.props.isShowing)}
            style={{
              backgroundColor: "#1f1f1f",
              border: "2px ridge white",
              color: "#fff"
            }}
          >
            Edit info
          </MDBModalHeader>
          <MDBModalBody className="bg-dark text-white border">
            <div className="form-group">
              <MDBInput label="Name" icon="user" />
              <MDBInput label="Phone" icon="phone" />
              <MDBInput label="Email" icon="envelope-open" />
              <MDBInput label="Sex" icon="transgender" />
              <MDBInput label="Age" icon="baby" />
            </div>
          </MDBModalBody>
          <MDBModalFooter
            style={{
              backgroundColor: "#1f1f1f",
              border: "2px ridge white",
              color: "#fff"
            }}
          >
            <MDBBtn
              color="danger"
              onClick={() => this.props.show(!this.props.isShowing)}
            >
              Close
            </MDBBtn>
            <MDBBtn color="success">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
