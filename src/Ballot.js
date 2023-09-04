import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import {
	collection,
	addDoc,
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
import { isLoggedIn, decryptToken } from "./auth";

function Ballot() {
	// Data
	const [chair, setChair] = useState("");
	const [residents, setResidents] = useState([]);
	const [ballot, setBallot] = useState({});
	// Authentication
	const [loggedIn, setLoggedIn] = useState(true);
	const checkIsLoggedIn = async () => {
		return await isLoggedIn()
			.then((res) => {
				setChair(decryptToken().tabName);
				setLoggedIn(res);
			})
			.catch((err) => {
				console.error(err);
			});
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

	useEffect(() => {
		checkIsLoggedIn();
		getDocs(collection(db, "residents")).then((querySnapshot) => {
			let firebase_residents = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			firebase_residents = firebase_residents.filter(
				(resident) => resident.name !== decryptToken()["tabName"]
			);
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
	const [time, setTime] = useState("3PM");
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
	const [panelists, setPanelists] = useState(["", "", "", "", "", ""]);

	const [motion, setMotion] = useState("");
	const [theme, setTheme] = useState("");
	const [hasInfoslide, setHasInfoslide] = useState(false);
	const [infoslide, setInfoslide] = useState("");

	// Confirm ballot modal
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const handleConfirm = () => {
		const speakerScores = [
			parseInt(pmScore),
			parseInt(loScore),
			parseInt(dpmScore),
			parseInt(dloScore),
			parseInt(mgScore),
			parseInt(moScore),
			parseInt(gwScore),
			parseInt(owScore),
		];
		const speakerRoles = ["PM", "LO", "DPM", "DLO", "MG", "MO", "GW", "OW"];
		const findTeam = (role) => {
			if (role === "PM" || role === "DPM") {
				if (format === "AP" || format === "AU") {
					return "Gov";
				} else return "OG";
			}
			if (role === "LO" || role === "DLO") {
				if (format === "AP" || format === "AU") {
					return "Opp";
				} else return "OO";
			}
			if (role === "MG" || role === "GW") return "CG";
			if (role === "OW" || role === "MO") return "CO";
		};
		const findRank = (team) => {
			if (ballot.first === team) return "1st";
			if (ballot.second === team) return "2nd";
			if (ballot.third === team) return "3rd";
			if (ballot.fourth === team) return "4th";
		};
		// Update scores, attendance of debaters
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
		let collectionRef = collection(db, "residents");
		speakerNames
			.filter((name) => name !== "")
			.map(async (speaker) => {
				let q = query(collectionRef, where("name", "==", speaker));
				let querySnapshot = await getDocs(q);
				let position = speakerRoles[speakerNames.indexOf(speaker)];
				let team = findTeam(position);
				let rank = findRank(team);

				querySnapshot.forEach(async (docSnapshot) => {
					let docRef = doc(db, "residents", docSnapshot.id);
					let data = docSnapshot.data();
					await updateDoc(docRef, {
						attendance: data.attendance + 1,
						count_rounds_debated: data.count_rounds_debated + 1,
						average_speaker_score:
							(data.average_speaker_score * data.count_rounds_debated +
								speakerScores[speakerNames.indexOf(speaker)]) /
							(data.count_rounds_debated + 1),
						rounds_won: rank === "1st" ? data.rounds_won + 1 : data.rounds_won,
					});
				});
			});
		// Update attendance of chair and panel
		const allocated_judges = new Set(panelists.filter((p) => p !== ""));
		Array.from([...allocated_judges, chair]).map(async (judge) => {
			let q = query(collectionRef, where("name", "==", judge));
			let querySnapshot = await getDocs(q);

			querySnapshot.forEach(async (docSnapshot) => {
				let docRef = doc(db, "residents", docSnapshot.id);
				let data = docSnapshot.data();
				await updateDoc(docRef, {
					attendance: data.attendance + 1,
					count_rounds_judged: data.count_rounds_judged + 1,
				});
			});
		});
		// Update ballot history
		collectionRef = collection(db, "ballots");
		addDoc(collectionRef, ballot)
			.then(() => {
				console.log("Added ballot.");
			})
			.catch((err) => {
				console.error(err);
			});
		setTimeout(() => window.location.reload(), 1000);
		handleClose();
	};

	const handleUpdate = async () => {
		// Error: missing motion
		if (!theme) {
			showError("Missing motion theme!");
			return;
		}
		if (!motion) {
			showError("Missing motion!");
			return;
		}
		// Error: missing infoslide
		if (hasInfoslide && !infoslide) {
			showError(
				"You've indicated that the motion has an infoslide but the infoslide box is empty!"
			);
			return;
		}
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
			if (speakerName && speakerName !== "iron" && speakerName !== "guest") {
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
				"The following judges have been selected more than once: " +
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

		// Error: Duplicate ballot
		let collectionRef = collection(db, "ballots");
		let q = query(
			collectionRef,
			where("chair", "==", chair),
			where("time", "==", time),
			where("date", "==", date)
		);
		let querySnapshot = await getDocs(q);
		if (querySnapshot.size > 0) {
			showError("You've already submitted a ballot for this date and time!");
			return;
		}

		// Calculate results
		const newBallot = {
			chair,
			panelists: panelists.filter((p) => p !== ""),
			motion,
			infoslide,
			theme,
			date,
			time,
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
		newBallot.first = ordered_teams[0];
		newBallot.second = ordered_teams[1];
		if (format === "BP") {
			newBallot.third = ordered_teams[2];
			newBallot.fourth = ordered_teams[3];
		}

		// Confirm ballot
		setBallot(newBallot);
		setShowModal(true);
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
		let newPanelists = [...panelists];
		for (let i = 5; i >= e.target.value; i--) newPanelists[i] = "";
		setPanelists(newPanelists);
		setNumPanelists(parseInt(e.target.value));
	};

	return (
		<Container className="mt-5 justify-content-center align-items-center vh-100">
			{loggedIn ? (
				<Form className="mb-5 p-4 border rounded shadow">
					<h2 className="text-center">Ballot Form</h2>
					<p className="text-center">
						Attendance is based on ballots. Only chairs should submit this form.
						<br></br>In the event of an ironperson, select "Ironperson" from the
						dropdown.
						<br></br>Don't forget to also score your panel via the feedback
						form.
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
							<Form.Label>Time</Form.Label>
							<Form.Select onChange={(e) => setTime(e.target.value)}>
								<option value="3PM">3PM</option>
								<option value="5PM">5PM</option>
								<option value="7PM">7PM</option>
							</Form.Select>
						</Form.Group>
						<Form.Group xs={12} md={6} as={Col}>
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
					<Row className="mt-4">
						<Form.Group as={Col}>
							<Form.Label>Motion Theme</Form.Label>
							<Form.Select
								onChange={(e) => setTheme(e.target.value)}
								className="mt-1"
							>
								<option value="">--Select Motion Theme--</option>
								<option value="art">Art</option>
								<option value="cjs">Criminal Justice</option>
								<option value="econ">Economics</option>
								<option value="feminism">Feminism</option>
								<option value="finance">Finance</option>
								<option value="gender">Gender</option>
								<option value="ir">International Relations</option>
								<option value="media">Media and Narratives</option>
								<option value="philosophy">Philosophy</option>
								<option value="intl_politics">Politics</option>
								<option value="religion">Religion</option>
								<option value="movements">Social Movements</option>
							</Form.Select>
						</Form.Group>
						<Form.Group as={Col} xs={12} md={7}>
							<Form.Label>Motion</Form.Label>
							<InputGroup>
								<Form.Control
									onChange={(e) => setMotion(e.target.value)}
									placeholder="Enter motion"
									type="text"
									value={motion}
								/>
								<Button
									onClick={() => setHasInfoslide(!hasInfoslide)}
									as={InputGroup.Append}
									variant="secondary"
								>
									{hasInfoslide ? "Remove Infoslide" : "Add Infoslide"}
								</Button>
							</InputGroup>
						</Form.Group>
					</Row>
					{hasInfoslide ? (
						<Row className="mt-4">
							{" "}
							<Form.Group>
								<Form.Label>Infoslide</Form.Label>

								<Form.Control
									onChange={(e) => setInfoslide(e.target.value)}
									placeholder="Enter infoslide"
									type="textarea"
									value={infoslide}
								/>
							</Form.Group>
						</Row>
					) : (
						<></>
					)}
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
								<Row className="mt-4">
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
									<Row className="mt-4">
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
									<Row className="mt-4">
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
			) : (
				<p className="text-center">
					You need to be logged in to submit ballots.
				</p>
			)}
			&nbsp;
		</Container>
	);
}

export default Ballot;
