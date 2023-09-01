import React, { useState, useEffect } from "react";
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
import BallotField from "./BallotField";
import ConfirmBallot from "./ConfirmBallot";
import ErrorModal from "./ErrorModal";

function Ballot() {
	// Confirm ballot modal
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const handleConfirm = () => {
		handleClose();
	};
	// Error modal
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const showError = (message) => {
		setErrorMessage(message);
		setShowErrorModal(true);
	};
	const hideError = () => {
		setShowErrorModal(false);
	};

	const [chair, setChair] = useState([]);
	const [residents, setResidents] = useState([]);
	const [judgePool, setJudgePool] = useState([]);
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
	// Panelists
	const [panelists, setPanelists] = useState(["", "", "", "", "", ""]);

	const handleUpdate = async () => {
		// Error: missing name(s)
		const missingNames = [];
		if (format === "BP") {
			if (!pmName) missingNames.push("PM");
			if (!loName) missingNames.push("LO");
			if (!dpmName) missingNames.push("DPM");
			if (!dloName) missingNames.push("DLO");
			if (!mgName) missingNames.push("MG");
			if (!moName) missingNames.push("MO");
			if (!gwName) missingNames.push("GW");
			if (!owName) missingNames.push("OW");
			if (missingNames.length > 0) {
				showError("Missing name(s) for: " + missingNames.join(", ") + ".");
				return;
			}
		} else if (format === "BPHalf") {
			if (!pmName) missingNames.push("PM");
			if (!loName) missingNames.push("LO");
			if (!dpmName) missingNames.push("DPM");
			if (!dloName) missingNames.push("DLO");
			if (missingNames.length > 0) {
				showError("Missing name(s) for: " + missingNames.join(", ") + ".");
				return;
			}
		} else if (format === "PMLO") {
			if (!pmName) missingNames.push("PM");
			if (!loName) missingNames.push("LO");
			if (missingNames.length > 0) {
				showError("Missing name(s) for: " + missingNames.join(", ") + ".");
				return;
			}
		} else if (format === "AP" || format === "AU") {
			if (!pmName) missingNames.push("PM");
			if (!loName) missingNames.push("LO");
			if (!dpmName) missingNames.push("DPM");
			if (!dloName) missingNames.push("DLO");
			if (!gwName) missingNames.push("GW");
			if (!owName) missingNames.push("OW");
			if (missingNames.length > 0) {
				showError("Missing name(s) for: " + missingNames.join(", ") + ".");
				return;
			}
		}

		// Error: missing score(s)
		const missingScores = [];
		if (pmName && !pmScore) missingScores.push("PM");
		if (loName && !loScore) missingScores.push("LO");
		if (format === "BPHalf") {
			if (dpmName && !dpmScore) missingScores.push("DPM");
			if (dloName && !dloScore) missingScores.push("DLO");
		}
		if (format === "BP") {
			if (mgName && !mgScore) missingScores.push("MG");
			if (moName && !moScore) missingScores.push("MO");
		}
		if (format === "BP" || format === "AP" || format === "AU") {
			if (gwName && !gwScore) missingScores.push("GW");
			if (owName && !owScore) missingScores.push("OW");
		}
		if (missingScores.length > 0) {
			showError("Missing score(s) for " + missingScores.join(", ") + ".");
			return;
		}

		//Error: Score <50
		const invalidScores = [];
		if (pmName && pmScore < 50) invalidScores.push("PM");
		if (loName && loScore < 50) invalidScores.push("LO");
		if (dpmName && dpmScore < 50) invalidScores.push("DPM");
		if (dloName && dloScore < 50) invalidScores.push("DLO");
		if (mgName && mgScore < 50) invalidScores.push("MG");
		if (moName && moScore < 50) invalidScores.push("MO");
		if (gwName && gwScore < 50) invalidScores.push("GW");
		if (owName && owScore < 50) invalidScores.push("OW");
		if (invalidScores.length > 0) {
			showError(
				"Floor score is 50. Please fix the score(s) for " +
					invalidScores.join(", ") +
					"."
			);
			return;
		}

		// Error: Duplicate names
		const speakerNames = [
			pmName,
			loName,
			dpmName,
			dloName,
			mgName,
			moName,
			gwName,
			owName,
		];
		const unique_names = new Set();
		let duplicate_names = [];
		for (const speakerName of speakerNames) {
			if (speakerName && speakerName !== "iron") {
				if (unique_names.has(speakerName)) {
					duplicate_names.push(speakerName);
				} else {
					unique_names.add(speakerName);
				}
			}
		}
		if (duplicate_names.length > 0) {
			duplicate_names = Array.from(new Set(duplicate_names));
			showError(
				"The following speakers have been assigned more than once: " +
					duplicate_names.join(", ") +
					". Select the Ironperson option from the dropdown in the case of an ironperson."
			);
			return;
		}

		// Error: Duplicate judges
		const unique_judges = new Set();
		duplicate_names = [];
		for (const panelist of panelists) {
			if (panelist) {
				if (unique_judges.has(panelist)) {
					duplicate_names.push(panelist);
				} else {
					unique_judges.add(panelist);
				}
			}
		}
		if (duplicate_names.length > 0) {
			duplicate_names = Array.from(new Set(duplicate_names));
			showError(
				"The following judges been selected than once: " +
					duplicate_names.join(", ") +
					"."
			);
			return;
		}

		// Error: One resident is assigned as a debater and as a judge
		const allocated_debaters = new Set(speakerNames.filter((s) => s !== ""));
		const allocated_judges = new Set(panelists.filter((p) => p !== ""));
		const intersection = new Set(
			[...allocated_debaters].filter((x) => allocated_judges.has(x))
		);
		if (intersection.size > 0) {
			showError(
				"The following residents have been allocated to a judge and speaker role at the same time: " +
					Array.from(intersection).join(", ") +
					"."
			);
			return;
		}

		// Calculate results
		const newBallot = {
			chair,
			panelists: panelists.filter((p) => p !== ""),
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
			first: "",
			second: "",
			third: "",
			fourth: "",
			winner: "",
		};

		// Update ballot
		let OG =
			(pmScore ? parseInt(pmScore) : 0) + (dpmScore ? parseInt(dpmScore) : 0);
		let OO =
			(loScore ? parseInt(loScore) : 0) + (dloScore ? parseInt(dloScore) : 0);
		let CG =
			(mgScore ? parseInt(mgScore) : 0) + (gwScore ? parseInt(gwScore) : 0);
		let CO =
			(moScore ? parseInt(moScore) : 0) + (owScore ? parseInt(owScore) : 0);
		if (format === "AP" || format === "AU") OG += gwScore;
		if (format === "AP" || format === "AU") OO += owScore;

		newBallot["ogScore"] = OG;
		newBallot["ooScore"] = OO;
		newBallot["cgScore"] = CG;
		newBallot["coScore"] = CO;

		let positions, team_scores;
		if (format === "BP") {
			// Check if there is a tie between teams
			positions = ["OG", "OO", "CG", "CO"];
			team_scores = [OG, OO, CG, CO];
		} else {
			if (format === "BPHalf" || format === "PMLO") {
				positions = ["OG", "OO"];
			} else {
				positions = ["Government", "Opposition"];
			}
			team_scores = [OG, OO];
		}
		const equalPairs = new Set();
		for (let i = 0; i < team_scores.length; i++) {
			for (let j = 0; j < team_scores.length; j++) {
				if (
					positions[i] !== positions[j] &&
					team_scores[i] === team_scores[j]
				) {
					equalPairs.add(positions[i]);
					equalPairs.add(positions[j]);
				}
			}
		}
		if (equalPairs.size > 0) {
			if (format === "AP" || format === "AU") {
				showError("Gov and Opp have the same total score!");
			} else {
				showError(
					"The following teams have tied scores: " +
						Array.from(equalPairs).join(", ") +
						"."
				);
			}
			return;
		}
		const scores_object = { OG, OO, CG, CO };

		// Update team positions in ballot
		const ordered_teams = Object.entries(scores_object)
			.sort((a, b) => a[1] - b[1])
			.map((team) => team[0])
			.reverse();
		console.log(ordered_teams);
		newBallot.first = ordered_teams[0];
		newBallot.second = ordered_teams[1];
		if (format === "BP") {
			newBallot.third = ordered_teams[2];
			newBallot.fourth = ordered_teams[3];
		}
		setBallot(newBallot);

		// Confirm ballot
		setShowModal(true);

		// Update scores
		// if (ballot) {
		// 	const collectionRef = collection(db, "residents");
		// 	if (pmName !== pmName && pmName !== "iron" && pmScore) {
		// 		let q = query(collectionRef, where("name", "==", pmName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						pmScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (loName && loName !== "iron" && loScore) {
		// 		let q = query(collectionRef, where("name", "==", loName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						loScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (dpmName && dpmName !== "iron" && dpmScore) {
		// 		let q = query(collectionRef, where("name", "==", dpmName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						loScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (dloName && dloName !== "iron" && dloScore) {
		// 		let q = query(collectionRef, where("name", "==", dloName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						dloScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (mgName && mgName !== "iron" && mgScore) {
		// 		let q = query(collectionRef, where("name", "==", mgName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						mgScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (moName && moName !== "iron" && moScore) {
		// 		let q = query(collectionRef, where("name", "==", moName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						moScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (gwName && gwName !== "iron" && gwScore) {
		// 		let q = query(collectionRef, where("name", "==", gwName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						gwScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// 	if (owName && owName !== "iron" && owScore) {
		// 		let q = query(collectionRef, where("name", "==", owName));
		// 		let querySnapshot = await getDocs(q);
		// 		querySnapshot.forEach(async (docSnapshot) => {
		// 			let docRef = doc(db, "residents", docSnapshot.id);
		// 			await updateDoc(docRef, {
		// 				attendance: docSnapshot.data().attendance + 1,
		// 				count_rounds_debated: docSnapshot.data().count_rounds_debated + 1,
		// 				average_speaker_score:
		// 					(docSnapshot.data().average_speaker_score *
		// 						docSnapshot.data().count_rounds_debated +
		// 						owScore) /
		// 					(docSnapshot.data().count_rounds_debated + 1),
		// 			});
		// 		});
		// 	}
		// }
	};

	const handleFormat = (e) => {
		let newFormat = e.target.value;
		setFormat(newFormat);
		if (newFormat !== "BP") {
			setMGName("");
			setMOName("");
			setMGScore("");
			setMOScore("");
		}
		if (newFormat === "BPHalf" || newFormat == "PMLO") {
			setGWName("");
			setOWName("");
			setGWScore("");
			setOWScore("");
		}
		if (newFormat === "PMLO") {
			setDPMName("");
			setDPMScore("");
			setDLOName("");
			setDLOScore("");
		}
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
					<br></br>In the event of an ironperson, select "Ironperson" from the
					dropdown.
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
						<BallotField
							role="PM"
							selectedName={pmName}
							selectedScore={pmScore}
							residents={residents}
							handleName={setPMName}
							handleScore={setPMScore}
						/>
						<BallotField
							role="LO"
							selectedName={loName}
							selectedScore={loScore}
							residents={residents}
							handleName={setLOName}
							handleScore={setLOScore}
						/>
					</Row>
					{format !== "PMLO" ? (
						<div>
							<Row className="mt-5">
								<BallotField
									role="DPM"
									selectedName={dpmName}
									selectedScore={dpmScore}
									residents={residents}
									handleName={setDPMName}
									handleScore={setDPMScore}
								/>
								<BallotField
									role="DLO"
									selectedName={dloName}
									selectedScore={dloScore}
									residents={residents}
									handleName={setDLOName}
									handleScore={setDLOScore}
								/>
							</Row>
							{format === "BP" ? (
								<Row className="mt-5">
									<BallotField
										role="MG"
										selectedName={mgName}
										selectedScore={mgScore}
										residents={residents}
										handleName={setMGName}
										handleScore={setMGScore}
									/>
									<BallotField
										role="MO"
										selectedName={moName}
										selectedScore={moScore}
										residents={residents}
										handleName={setMOName}
										handleScore={setMOScore}
									/>
								</Row>
							) : (
								<></>
							)}
							{format !== "BPHalf" ? (
								<Row className="mt-5">
									<BallotField
										role="GW"
										selectedName={gwName}
										selectedScore={gwScore}
										residents={residents}
										handleName={setGWName}
										handleScore={setGWScore}
									/>
									<BallotField
										role="OW"
										selectedName={owName}
										selectedScore={owScore}
										residents={residents}
										handleName={setOWName}
										handleScore={setOWScore}
									/>
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
						{Array.from({ length: numPanelists }, (_, i) => (
							<Form.Select
								onChange={(e) => (panelists[i] = e.target.value)}
								className="mt-1"
							>
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
					<ConfirmBallot
						ballot={ballot}
						show={showModal}
						onClose={handleClose}
						onConfirm={handleConfirm}
					/>
					<ErrorModal
						show={showErrorModal}
						onHide={hideError}
						errorMessage={errorMessage}
					/>
				</Row>
			</Form>
			&nbsp;
		</Container>
	);
}

export default Ballot;
