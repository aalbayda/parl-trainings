import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function Ballot() {
	const [residents, setResidents] = useState([]);
	const [ballot, setBallot] = useState({});

	useEffect(() => {
		getDocs(collection(db, "residents")).then((querySnapshot) => {
			const firebase_residents = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setResidents(firebase_residents);
		});
	}, []);

	const [format, setFormat] = useState("BP");
	const [date, setDate] = useState(
		`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
			2,
			"0"
		)}-${String(new Date().getDate()).padStart(2, "0")}`
	);
	const [pmName, setPMName] = useState("");
	const [loName, setLOName] = useState("");
	const [dpmName, setDPMName] = useState("");
	const [dloName, setDLOName] = useState("");
	const [mgName, setMGName] = useState("");
	const [moName, setMOName] = useState("");
	const [gwName, setGWName] = useState("");
	const [owName, setOWName] = useState("");
	const [pmScore, setPMScore] = useState("");
	const [loScore, setLOScore] = useState("");
	const [dpmScore, setDPMScore] = useState("");
	const [dloScore, setDLOScore] = useState("");
	const [mgScore, setMGScore] = useState("");
	const [moScore, setMOScore] = useState("");
	const [gwScore, setGWScore] = useState("");
	const [owScore, setOWScore] = useState("");

	const handleUpdate = async () => {
		// Error: missing field(s)
		const missingScores = [];
		if (pmName && !pmScore) missingScores.push("PM");
		if (loName && !loScore) missingScores.push("LO");
		if (dpmName && !dpmScore) missingScores.push("DPM");
		if (dloName && !dloScore) missingScores.push("DLO");
		if (mgName && !mgScore) missingScores.push("MG");
		if (moName && !moScore) missingScores.push("MO");
		if (gwName && !gwScore) missingScores.push("GW");
		if (owName && !owScore) missingScores.push("OW");
		if (missingScores.length > 0) {
			window.alert("Missing score(s) for " + missingScores.join(", ") + ".");
			return;
		}

		// Calculate results
		const newBallot = {
			date,
			format,
			pmName,
			pmScore,
			loName,
			loScore,
			dpmName,
			dpmScore,
			dloName,
			dloScore,
			mgName,
			mgScore,
			moName,
			moScore,
			gwName,
			gwScore,
			owName,
			owScore,
		};

		// Update scores
		const collectionRef = collection(db, "residents");
		if (pmName && pmScore) {
			let q = query(collectionRef, where("name", "==", pmName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							pmScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (loName && loScore) {
			let q = query(collectionRef, where("name", "==", loName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							loScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (dpmName && dpmScore) {
			let q = query(collectionRef, where("name", "==", dpmName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							loScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (dloName && dloScore) {
			let q = query(collectionRef, where("name", "==", dloName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							dloScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (mgName && mgScore) {
			let q = query(collectionRef, where("name", "==", mgName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							mgScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (moName && moScore) {
			let q = query(collectionRef, where("name", "==", moName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							moScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (gwName && gwScore) {
			let q = query(collectionRef, where("name", "==", gwName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							gwScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		if (owName && owScore) {
			let q = query(collectionRef, where("name", "==", owName));
			let querySnapshot = await getDocs(q);
			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				await updateDoc(docRef, {
					attendance: docSnapshot.data().attendance + 1,
					count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
					average_speaker_score:
						(docSnapshot.data().average_speaker_score *
							docSnapshot.data().count_rounds_debated +
							owScore) /
						(docSnapshot.data().count_rounds_debated + 1),
				});
			});
		}
		setTimeout(() => window.location.reload(), 1000);
	};

	const handleFormat = (e) => {
		setFormat(e.target.value);
	};
	const [numPanelists, setNumPanelists] = useState(0);
	const handleNumPanelists = (e) => {
		setNumPanelists(parseInt(e.target.value));
	};

	return (
		<Container className="mt-5 justify-content-center align-items-center vh-100">
			<Form className="mb-5 p-4 border rounded shadow">
				<h2 className="text-center">Ballot Form</h2>
				<p className="text-center">
					Attendance is based on ballots. Only chairs should submit this form.
					<br></br>In cases without a resident speaker, select the blank
					dropdown option.
					<br></br>Judges should be scored in the feedback form.
				</p>
				<Row className="mt-5">
					<Form.Group as={Col}>
						<Form.Label>Date of Round</Form.Label>
						<Form.Control
							type="date"
							name="date"
							defaultValue={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Format</Form.Label>
						<Form.Select onChange={handleFormat}>
							<option value="BP">British Parliamentary (Full Set)</option>
							<option value="BPHalf">
								British Parliamentary (Opening Half)
							</option>
							<option value="PMLO">PM-LO Exchange</option>
							<option value="AP">Asian Parliamentary</option>
							<option value="AU">Australs</option>
						</Form.Select>
					</Form.Group>
				</Row>
				<Col>
					<Row className="mt-5">
						<Form.Group as={Col}>
							<Form.Label>PM</Form.Label>
							<Form.Select
								value={pmName}
								onChange={(e) => {
									setPMName(e.target.value);
								}}
							>
								<option value="">--Blank; Select Name to Score--</option>
								{residents
									.slice()
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((resident) => (
										<option key={resident.name} value={resident.name}>
											{resident.name}
										</option>
									))}
							</Form.Select>
							{pmName ? (
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									placeholder="Score"
									type="number"
									value={pmScore}
									onChange={(e) => {
										if (e.target.value.length <= 2) setPMScore(e.target.value);
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
						<Form.Group as={Col}>
							<Form.Label>LO</Form.Label>
							<Form.Select onChange={(e) => setLOName(e.target.value)}>
								<option value="">--Blank; Select Name to Score--</option>
								{residents
									.slice()
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((resident) => (
										<option key={resident.name} value={resident.name}>
											{resident.name}
										</option>
									))}
							</Form.Select>
							{loName ? (
								<Form.Control
									className="mt-1"
									min="50"
									max="100"
									value={loScore}
									placeholder="Score"
									type="number"
									onChange={(e) => {
										if (e.target.value.length <= 2) setLOScore(e.target.value);
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
					</Row>
					{format !== "PMLO" ? (
						<div>
							<Row className="mt-5">
								<Form.Group as={Col}>
									<Form.Label>DPM</Form.Label>
									<Form.Select onChange={(e) => setDPMName(e.target.value)}>
										<option value="">--Blank; Select Name to Score--</option>
										{residents
											.slice()
											.sort((a, b) => a.name.localeCompare(b.name))
											.map((resident) => (
												<option key={resident.name} value={resident.name}>
													{resident.name}
												</option>
											))}
									</Form.Select>
									{dpmName ? (
										<Form.Control
											className="mt-1"
											min="50"
											max="100"
											value={dpmScore}
											placeholder="Score"
											onChange={(e) => {
												if (e.target.value.length <= 2)
													setDPMScore(e.target.value);
											}}
											type="number"
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
								<Form.Group as={Col}>
									<Form.Label>DLO</Form.Label>
									<Form.Select onChange={(e) => setDLOName(e.target.value)}>
										<option value="">--Blank; Select Name to Score--</option>
										{residents
											.slice()
											.sort((a, b) => a.name.localeCompare(b.name))
											.map((resident) => (
												<option key={resident.name} value={resident.name}>
													{resident.name}
												</option>
											))}
									</Form.Select>
									{dloName ? (
										<Form.Control
											className="mt-1"
											min="50"
											max="100"
											placeholder="Score"
											value={dloScore}
											onChange={(e) => {
												if (e.target.value.length <= 2)
													setDLOScore(e.target.value);
											}}
											type="number"
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
							</Row>
							{format === "BP" ? (
								<Row className="mt-5">
									<Form.Group as={Col}>
										<Form.Label>MG</Form.Label>
										<Form.Select onChange={(e) => setMGName(e.target.value)}>
											<option value="">--Blank; Select Name to Score--</option>
											{residents
												.slice()
												.sort((a, b) => a.name.localeCompare(b.name))
												.map((resident) => (
													<option key={resident.name} value={resident.name}>
														{resident.name}
													</option>
												))}
										</Form.Select>
										{mgName ? (
											<Form.Control
												className="mt-1"
												min="50"
												max="100"
												placeholder="Score"
												type="number"
												onChange={(e) => setMGScore(e.target.value)}
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
									<Form.Group as={Col}>
										<Form.Label>MO</Form.Label>
										<Form.Select onChange={(e) => setMOName(e.target.value)}>
											<option value="">--Blank; Select Name to Score--</option>
											{residents
												.slice()
												.sort((a, b) => a.name.localeCompare(b.name))
												.map((resident) => (
													<option key={resident.name} value={resident.name}>
														{resident.name}
													</option>
												))}
										</Form.Select>
										{moName ? (
											<Form.Control
												className="mt-1"
												min="50"
												max="100"
												placeholder="Score"
												onChange={(e) => setMOScore(e.target.value)}
												type="number"
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
								</Row>
							) : (
								<></>
							)}
							{format !== "BPHalf" ? (
								<Row className="mt-5">
									<Form.Group as={Col}>
										<Form.Label>GW</Form.Label>
										<Form.Select onChange={(e) => setGWName(e.target.name)}>
											<option value="">--Blank; Select Name to Score--</option>
											{residents
												.slice()
												.sort((a, b) => a.name.localeCompare(b.name))
												.map((resident) => (
													<option key={resident.name} value={resident.name}>
														{resident.name}
													</option>
												))}
										</Form.Select>
										{gwName ? (
											<Form.Control
												className="mt-1"
												min="50"
												max="100"
												placeholder="Score"
												type="number"
												onChange={(e) => setGWScore(e.target.value)}
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
									<Form.Group as={Col}>
										<Form.Label>OW</Form.Label>
										<Form.Select onChange={(e) => setOWName(e.target.value)}>
											<option value="">--Blank; Select Name to Score--</option>
											{residents
												.slice()
												.sort((a, b) => a.name.localeCompare(b.name))
												.map((resident) => (
													<option key={resident.name} value={resident.name}>
														{resident.name}
													</option>
												))}
										</Form.Select>
										{owName ? (
											<Form.Control
												className="mt-1"
												min="50"
												max="100"
												placeholder="Score"
												type="number"
												onChange={(e) => setOWScore(e.target.value)}
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
								</Row>
							) : (
								<></>
							)}
						</div>
					) : (
						<></>
					)}
				</Col>

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
								{residents
									.slice()
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((resident) => (
										<option key={resident.name} value={resident.name}>
											{resident.name}
										</option>
									))}
							</Form.Select>
						))}
					</Form.Group>
				</Row>

				<Row className="mt-5">
					<Button onClick={handleUpdate} variant="success">
						Submit Ballot
					</Button>
				</Row>
			</Form>
			&nbsp;
		</Container>
	);
}

export default Ballot;
