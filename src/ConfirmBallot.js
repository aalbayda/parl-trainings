import React, { useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function parseFormat(format) {
	if (format === "BP") return "British Parliamentary (Full Set)";
	if (format === "AP") return "Asian Parliamentary";
	if (format === "AU") return "Australs";
	if (format === "BPHalf") return "British Parliamentary (Opening Half)";
	if (format === "PMLO") return "PM-LO Exchange";
}

function getRanking(ballot) {
	if (ballot.format === "BP") {
		return `${ballot.first} > ${ballot.second} > ${ballot.third} > ${ballot.fourth}`;
	}
	if (ballot.format === "BPHalf" || ballot.format === "PMLO") {
		return `${ballot.first} > ${ballot.second}`;
	}
	if (ballot.format === "AP" || ballot.format === "AU") {
		if (ballot.first === "OG") return "Gov > Opp";
		else return "Opp > Gov";
	}
}

function ConfirmBallot({ ballot, show, onClose, onConfirm }) {
	return (
		<Modal show={show} onHide={onClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirm Ballot</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to submit this ballot?</p>
				<b>Date:</b>{" "}
				{new Date(ballot.date).toLocaleString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
				<br></br>
				<b>Chair:</b> {ballot.chair}
				<br></br>
				<b>Panel:</b> {ballot.chair}
				<br></br>
				<b>Format:</b> {parseFormat(ballot.format)}
				<br></br>
				<br></br>
				<Row>
					<Col className="text-center">
						<b>
							{ballot.format !== "AP" && ballot.format !== "AU" ? "OG" : "Gov"}
						</b>
						<br></br>
						PM: {ballot.pmName} ({ballot.pmScore})<br></br>
						{ballot.format !== "PMLO" ? (
							`DPM: ${ballot.dpmName} (${ballot.dpmScore})`
						) : (
							<></>
						)}
						<br></br>
						{ballot.format === "AP" || ballot.format === "AU" ? (
							`GW: ${ballot.gwName} (${ballot.gwScore})`
						) : (
							<></>
						)}
					</Col>
					<Col className="text-center">
						<b>
							{ballot.format !== "AP" && ballot.format !== "AU" ? "OO" : "Opp"}
						</b>
						<br></br>
						LO: {ballot.loName} ({ballot.loScore})<br></br>
						{ballot.format !== "PMLO" ? (
							`DLO: ${ballot.dloName} (${ballot.dloScore})`
						) : (
							<></>
						)}
						<br></br>
						{ballot.format === "AP" || ballot.format === "AU" ? (
							`OW: ${ballot.owName} (${ballot.owScore})`
						) : (
							<></>
						)}
					</Col>
				</Row>
				{ballot.format === "BP" ? (
					<Row>
						{" "}
						<Col className="mt-3 text-center">
							<b>CG</b>
							<br></br>
							MG: {ballot.mgName} ({ballot.mgScore})<br></br>
							GW: {ballot.gwName} ({ballot.gwScore})<br></br>
						</Col>
						<Col className="mt-3 text-center">
							<b>CO</b>
							<br></br>
							MO: {ballot.moName} ({ballot.moScore})<br></br>
							OW: {ballot.owName} ({ballot.owScore})<br></br>
						</Col>
					</Row>
				) : (
					<></>
				)}
				<Row className="mt-3 text-center">
					<div>
						<b>Rank:</b> {getRanking(ballot)}
					</div>
				</Row>
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

export default ConfirmBallot;
