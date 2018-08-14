import React from "react";
import Modal from "react-modal";
import "./ModalHOC.css";

Modal.setAppElement("#root");

const ModalHOC = props => {
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      className="Modal container"
      overlayClassName="Overlay"
      contentLabel="Message"
    >
      <div className="container has-text-right">
        <span className="icon is-large has-text-right" onClick={props.closeModal}>
          <i className="far fa-times-circle fa-lg" />
        </span>
      </div>
      <div className="container">{props.children}</div>
    </Modal>
  );
};

export default ModalHOC;
