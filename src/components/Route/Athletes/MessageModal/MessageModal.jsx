import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

export default class MessageModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.message}</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }
}
