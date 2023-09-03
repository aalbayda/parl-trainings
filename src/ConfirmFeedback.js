import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ConfirmFeedback({ feedback, show, onClose, onConfirm }) {
	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirm feedback</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to submit this feedback?</p>
				<b>Date of Round:</b>{" "}
				{new Date(feedback.date).toLocaleString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}{" "}
				@{feedback.time}
				<br></br>
				<b>Judge name:</b> {feedback.receiver}
				<br></br>
				<b>Score:</b> {feedback.score}
				<br></br>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="success" onClick={onConfirm}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmFeedback;
