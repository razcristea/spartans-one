import React, { PureComponent } from "react";
import Modal from "react-bootstrap/Modal";
import "./AlertMessage.css";

export default class AlertMessage extends PureComponent {
  render() {
    return (
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
      >
        <Modal.Body>
          <p className="delete-message">{this.props.messageAlertDeleted}</p>
        </Modal.Body>
      </Modal>
    );
  }
}
