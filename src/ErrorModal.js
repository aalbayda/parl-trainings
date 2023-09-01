import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ErrorModal({ show, onHide, errorMessage }) {
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Error</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{errorMessage}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ErrorModal;
