import React, { Component } from "react";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBIcon
} from "mdbreact";

export default class EditInfoModal extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBModal
          isOpen={this.props.isShowing}
          toggle={() => this.props.show(!this.props.isShowing)}
        >
          <MDBModalHeader
            toggle={() => this.props.show(!this.props.isShowing)}
            className="m-4"
          >
            Edit Athlete
          </MDBModalHeader>

          <MDBModalBody className="editModal">
            <div className="form-group">
              <MDBInput label="Name" icon="user" />
              <MDBInput label="Phone" icon="phone" />
              <MDBInput label="Email" icon="envelope-open" />
              <MDBInput label="Sex" icon="transgender" />
              <MDBInput label="Age" icon="baby" />
              <MDBIcon icon="camera" size="lg" className="mr-3" />
              Photo
              <div className="custom-file m-2">
                <input type="file" className="custom-file-input" />
                <label
                  className="custom-file-label"
                  id="editPhoto"
                  htmlFor="editPhoto"
                ></label>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="danger"
              onClick={() => this.props.show(!this.props.isShowing)}
            >
              <MDBIcon icon="ban" size="sm" className="m-2" /> Cancel
            </MDBBtn>
            <MDBBtn color="success">
              <MDBIcon icon="check" size="sm" className="m-2" />
              Save
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
