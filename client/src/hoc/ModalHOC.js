import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root')

const ModalHOC = props => {
	return (
		<Modal
			isOpen={props.modalIsOpen}
			onRequestClose={props.closeModal}
			className="Modal"
			overlayClassName="Overlay"
			contentLabel="Message"
		>
			<span className="icon is-large" onClick={props.closeModal}>
				<i className="far fa-times-circle fa-lg" />
			</span>
			{props.children}
		</Modal>
	);
};

export default ModalHOC;
