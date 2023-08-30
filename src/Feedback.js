import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function Feedback() {
	return (
		<Container className="mt-5 justify-content-center align-items-center ">
			<Form className="mb-5 p-4 border rounded shadow">
				<h2 className="text-center">Feedback Form</h2>
				<Form.Group as={Row} className="mt-3">
					<Form.Label>Date of Round</Form.Label>
					<Form.Control type="date" name="date" />
				</Form.Group>
				<Form.Group as={Row} className="mt-3">
					<Form.Label>Name of Judge</Form.Label>
					<Form.Select>
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
				</Form.Group>
				<Form.Group as={Row} className="mt-3">
					<Form.Label>Score</Form.Label>
					<Form.Control
						min="1"
						max="10"
						type="number"
						style={{ textAlign: "center" }}
						name="date"
						onKeyDown={(e) => {
							if (e.key !== "Backspace" && isNaN(e.key)) {
								e.preventDefault();
							}
						}}
					/>
				</Form.Group>
				<Row className="mt-5">
					<Button variant="success">Submit Feedback</Button>
				</Row>
			</Form>
			&nbsp;
		</Container>
	);
}

export default Feedback;
