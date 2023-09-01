import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function BallotField({
	role,
	selectedName,
	selectedScore,
	handleName,
	handleScore,
	residents,
}) {
	return (
		<Form.Group as={Col}>
			<Form.Label>{role}</Form.Label>
			<Form.Select
				value={selectedName}
				onChange={(e) => {
					if (e.target.value) handleName(e.target.value);
				}}
			>
				<option value="">--Select Debater--</option>
				<option value="iron">Ironperson</option>
				{residents
					.slice()
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((resident) => (
						<option key={resident.name} value={resident.name}>
							{resident.name}
						</option>
					))}
			</Form.Select>
			{selectedName ? (
				<Form.Control
					className="mt-1"
					min="50"
					max="100"
					placeholder="Score"
					type="number"
					value={selectedScore}
					onChange={(e) => {
						if (e.target.value.length <= 2) handleScore(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key !== "Backspace" && isNaN(e.key)) {
							e.preventDefault();
						}
					}}
				></Form.Control>
			) : (
				<></>
			)}
		</Form.Group>
	);
}

export default BallotField;
