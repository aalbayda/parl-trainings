import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function Ballot() {
	const [format, setFormat] = useState("BP");
	const speaks = {
		PM: { name: "", speaks: 0 },
		LO: { name: "", speaks: 0 },
		DPM: { name: "", speaks: 0 },
		DLO: { name: "", speaks: 0 },
		MG: { name: "", speaks: 0 },
		MO: { name: "", speaks: 0 },
		GW: { name: "", speaks: 0 },
		OW: { name: "", speaks: 0 },
	};
	const handleFormat = (e) => {
		setFormat(e.target.value);
	};
	const [numPanelists, setNumPanelists] = useState(0);
	const handlePM = (e) => {};
	const handleLO = (e) => {};
	const handleDPM = (e) => {};
	const handleDLO = (e) => {};
	const handleMG = (e) => {};
	const handleMO = (e) => {};
	const handleGW = (e) => {};
	const handleOW = (e) => {};
	const handleNumPanelists = (e) => {
		setNumPanelists(parseInt(e.target.value));
	};

	return (
		<Container className="mt-5 justify-content-center align-items-center vh-100">
			<Form className="mb-5 p-4 border rounded shadow">
				<h2 className="text-center">Ballot Form</h2>
				<p className="text-center">
					Attendance is based on ballots. Only chairs should submit this form.
					<br></br>If a speaker role is empty (e.g. in cases of top half
					rounds), leave its field blank.
					<br></br>Judges should be scored in the{" "}
					<Link to="/feedback" style={{ textDecoration: "none" }}>
						{" "}
						feedback form
					</Link>
					.
				</p>
				<Row className="mt-5">
					<Form.Group as={Col}>
						<Form.Label>Date of Round</Form.Label>
						<Form.Control type="date" name="date" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Format</Form.Label>
						<Form.Select onChange={handleFormat}>
							<option value="BP">British Parliamentary</option>
							<option value="AP">Asian Parliamentary</option>
							<option value="AU">Australs</option>
						</Form.Select>
					</Form.Group>
				</Row>
				{format === "BP" ? (
					<Col>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>PM</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>LO</Form.Label>
								<Form.Select onChange={handleLO}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>DPM</Form.Label>
								<Form.Select onChange={handleDPM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>DLO</Form.Label>
								<Form.Select onChange={handleDLO}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>MG</Form.Label>
								<Form.Select onChange={handleMG}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>MO</Form.Label>
								<Form.Select onChange={handleMO}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>GW</Form.Label>
								<Form.Select onChange={handleGW}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>OW</Form.Label>
								<Form.Select onChange={handleOW}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
					</Col>
				) : (
					<Col>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>PM</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>LO</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>DPM</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>DLO</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
						<Row className="mt-5">
							<Form.Group as={Col}>
								<Form.Label>GW</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>OW</Form.Label>
								<Form.Select onChange={handlePM}>
									<option value="">--Select Speaker--</option>
									<option value="Alexi Caraga">Alexi Caraga</option>
									<option value="Angel Naguio">Angel Naguio</option>
									<option value="Bea Villalobos">Bea Villalobos</option>
									<option value="Bella Garciano">Bella Garciano</option>
									<option value="Ben Bensali">Ben Bensali</option>
									<option value="Bob Albayda">Bob Albayda</option>
									<option value="Chayong Don">Chayong Don</option>
									<option value="Elizabeth Kho">Elizabeth Kho</option>
									<option value="Francis Vendiola">Francis Vendiola</option>
									<option value="Jelo Montoya">Jelo Montoya</option>
									<option value="Jose Manalo">Jose Manalo</option>
									<option value="JR Despi">JR Despi</option>
									<option value="Kathleen Vivas">Kathleen Vivas</option>
									<option value="Kismet Soriano">Kismet Soriano</option>
									<option value="Khy Domingo">Khy Domingo</option>
									<option value="Lia Tan">Lia Tan</option>
									<option value="Louise Wee">Louise Wee</option>
									<option value="Michel Macaliho">Michel Macaliho</option>
									<option value="Melai Paner">Melai Paner</option>
									<option value="Miko del Rosario">Miko del Rosario</option>
									<option value="Miriam Perilla">Miriam Perilla</option>
									<option value="Rsean Gueco">Rsean Gueco</option>
									<option value="Vince Hubilla">Vince Hubilla</option>
									<option value="Vince Peña">Vince Peña</option>
									<option value="Yanji Ruiz">Yanji Ruiz</option>
									<option value="Guest">Guest / Non-active Resident</option>
								</Form.Select>
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									onKeyDown={(e) => {
										if (e.key !== "Backspace" && isNaN(e.key)) {
											e.preventDefault();
										}
									}}
								></Form.Control>
							</Form.Group>
						</Row>
					</Col>
				)}
				<Row className="mt-5">
					<Form.Group as={Col}>
						<Form.Label>Number of Panelists (excluding yourself)</Form.Label>
						<Form.Select
							className="mt-1"
							value={numPanelists}
							onChange={handleNumPanelists}
						>
							<option value="0">0 (solo chair)</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</Form.Select>
						{Array.from({ length: numPanelists }, () => (
							<Form.Select className="mt-1">
								<option value="">--Select Judge--</option>
								<option value="Alexi Caraga">Alexi Caraga</option>
								<option value="Angel Naguio">Angel Naguio</option>
								<option value="Bea Villalobos">Bea Villalobos</option>
								<option value="Bella Garciano">Bella Garciano</option>
								<option value="Ben Bensali">Ben Bensali</option>
								<option value="Bob Albayda">Bob Albayda</option>
								<option value="Chayong Don">Chayong Don</option>
								<option value="Elizabeth Kho">Elizabeth Kho</option>
								<option value="Francis Vendiola">Francis Vendiola</option>
								<option value="Jelo Montoya">Jelo Montoya</option>
								<option value="Jose Manalo">Jose Manalo</option>
								<option value="JR Despi">JR Despi</option>
								<option value="Kathleen Vivas">Kathleen Vivas</option>
								<option value="Kismet Soriano">Kismet Soriano</option>
								<option value="Khy Domingo">Khy Domingo</option>
								<option value="Lia Tan">Lia Tan</option>
								<option value="Louise Wee">Louise Wee</option>
								<option value="Michel Macaliho">Michel Macaliho</option>
								<option value="Melai Paner">Melai Paner</option>
								<option value="Miko del Rosario">Miko del Rosario</option>
								<option value="Miriam Perilla">Miriam Perilla</option>
								<option value="Rsean Gueco">Rsean Gueco</option>
								<option value="Vince Hubilla">Vince Hubilla</option>
								<option value="Vince Peña">Vince Peña</option>
								<option value="Yanji Ruiz">Yanji Ruiz</option>
								<option value="Guest">Guest / Non-active Resident</option>
							</Form.Select>
						))}
					</Form.Group>
				</Row>

				<Row className="mt-5">
					<Button variant="success">Submit Ballot</Button>
				</Row>
			</Form>
			&nbsp;
		</Container>
	);
}

export default Ballot;
