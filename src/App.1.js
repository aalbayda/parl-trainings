import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { ConfirmationModal } from "./ConfirmBallot";

export function App() {
	const [showModal, setShowModal] = useState(false);

	const handleShow = () => {
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const handleConfirm = () => {
		// Put your confirmation action logic here
		alert("Confirmed!"); // Replace with your desired action
		handleClose();
	};

	return (
		<div>
			<Button variant="primary" onClick={handleShow}>
				Show Confirmation
			</Button>

			<ConfirmationModal
				show={showModal}
				onClose={handleClose}
				onConfirm={handleConfirm}
			/>
		</div>
	);
}
