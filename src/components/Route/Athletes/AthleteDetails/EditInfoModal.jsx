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
    console.log(this.props);

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
              <MDBInput label="Name" icon="user" value={this.props.info.name} />
              <MDBInput
                label="Phone"
                icon="phone"
                value={this.props.info.phoneNumber}
              />
              <MDBInput
                label="Email"
                icon="envelope-open"
                value={this.props.info.email}
              />
              <MDBInput
                label="Sex"
                icon="transgender"
                value={this.props.info.sex}
              />
              <MDBInput label="Age" icon="baby" value={this.props.info.age} />
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
