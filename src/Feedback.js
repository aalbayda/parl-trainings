import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
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
import ErrorModal from "./ErrorModal";
import { isLoggedIn, decryptToken } from "./auth";
import ConfirmFeedback from "./ConfirmFeedback";

function Feedback() {
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
	// Variables
	const [role, setRole] = useState("");
	const [selectedRound, setSelectedRound] = useState("");
	const [score, setScore] = useState("");
	const [user, setUser] = useState("");
	const [residents, setResidents] = useState([]);
	const [selectedJudge, setSelectedJudge] = useState("");
	const [selectedJudgeBallots, setSelectedJudgeBallots] = useState([]);
	// Authentication
	const [loggedIn, setLoggedIn] = useState(true);
	const checkIsLoggedIn = async () => {
		return await isLoggedIn()
			.then((res) => {
				setUser(decryptToken().tabName);
				setLoggedIn(res);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	useEffect(() => {
		checkIsLoggedIn();
		getDocs(collection(db, "residents")).then((querySnapshot) => {
			let firebase_residents = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			firebase_residents = firebase_residents.filter(
				(resident) => resident.name !== user
			);
			firebase_residents = firebase_residents.filter(
				(resident) => resident.name !== user
			);
			setResidents(firebase_residents);
		});
	}, []);

	// Confirm feedback
	const [feedback, setFeedback] = useState({});
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const handleConfirm = async () => {
		// Update judge score
		let collectionRef = collection(db, "residents");
		let q = query(collectionRef, where("name", "==", selectedJudge));
		let querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (docSnapshot) => {
			let docRef = doc(db, "residents", docSnapshot.id);
			let data = docSnapshot.data();
			await updateDoc(docRef, {
				feedbacks_received: data.feedbacks_received + 1,
				average_judge_score:
					(data.average_judge_score * data.feedbacks_received +
						parseInt(score)) /
					(data.feedbacks_received + 1),
			});
		});
		// Update feedback in db
		collectionRef = collection(db, "feedbacks");
		addDoc(collectionRef, feedback)
			.then(() => {
				console.log("Added feedback.");
			})
			.catch((err) => {
				console.error(err);
			});
		setTimeout(() => window.location.reload(), 1000);
	};

	const handleSelectedJudge = async (e) => {
		setSelectedJudge(e.target.value);
		setSelectedJudgeBallots([]);
		const ballots = [];
		const selectedJudge = e.target.value;
		await getDocs(query(collection(db, "ballots"))).then((q) => {
			q.forEach(async (docSnapshot) => {
				const ballot = docSnapshot.data();
				if (selectedJudge === ballot.chair) {
					ballots.push({ ...ballot, name: selectedJudge, role: "chair" });
				} else if (
					ballot.panelists &&
					ballot.panelists.includes(selectedJudge)
				) {
					ballots.push({ ...ballot, name: selectedJudge, role: "panelist" });
				}
				console.log(docSnapshot.data());
			});
		});
		setSelectedJudgeBallots(ballots);
		console.log(ballots);
		console.log(selectedJudgeBallots);
	};
	const handleSelectedRound = (e) => {
		setSelectedRound(JSON.parse(e.target.value));
		let selectedRound = JSON.parse(e.target.value);
		if (selectedRound.panelists.includes(user)) {
			setRole("Panelist");
		} else if (selectedRound.chair === user) {
			setRole("Chair");
		} else if (selectedRound.format === "AP" || selectedRound.format === "AU") {
			if (
				[
					selectedRound.pmName,
					selectedRound.dpmName,
					selectedRound.gwName,
				].includes(user)
			) {
				setRole("Gov");
			} else if (
				[
					selectedRound.loName,
					selectedRound.dloName,
					selectedRound.owName,
				].includes(user)
			) {
				setRole("Opp");
			}
		} else {
			if ([selectedRound.pmName, selectedRound.dpmName].includes(user)) {
				setRole("OG");
			} else if ([selectedRound.loName, selectedRound.dloName].includes(user)) {
				setRole("OO");
			} else if ([selectedRound.mgName, selectedRound.gwName].includes(user)) {
				setRole("CG");
			} else if ([selectedRound.moName, selectedRound.owName].includes(user)) {
				setRole("CO");
			}
		}
	};

	const handleSubmit = async () => {
		// Error: no judge selected
		if (!selectedJudge) {
			showError("No judge selected!");
			return;
		}
		// Error: no round selected
		if (!selectedRound) {
			showError("No round selected!");
			return;
		}
		// Error: no score
		if (!score) {
			showError("Missing score!");
			return;
		}
		// Error: was not in this round
		if (!role) {
			showError("You weren't in this round!");
			return;
		}

		// Error: invalid score
		if (parseInt(score) < 1 || parseInt(score) > 10) {
			showError("Score range goes from 1-10 only.");
			return;
		}
		// Error: duplicate feedback
		let collectionRef = collection(db, "feedbacks");
		let q = query(
			collectionRef,
			where("round", "==", selectedRound),
			where("submitter", "==", user),
			where("receiver", "==", selectedJudge)
		);
		let querySnapshot = await getDocs(q);
		if (querySnapshot.size > 0) {
			showError(
				"You've already submitted a feedback to this judge for this round!"
			);
			return;
		}
		// Update state
		const newFeedback = {
			score: score,
			round: selectedRound,
			submitter: user,
			receiver: selectedJudge,
			date: selectedRound.date,
			time: selectedRound.time,
		};
		setFeedback(newFeedback);
		setShowModal(true);
	};

	return (
		<Container className="mt-5 justify-content-center align-items-center ">
			{loggedIn ? (
				<Form className="mb-5 p-4 border rounded shadow">
					<h2 className="text-center">Feedback Form</h2>
					<p className="text-center">
						Make sure the ballot for your round has been submitted first by the
						chair.
					</p>
					<Form.Group as={Row} className="mt-3">
						<Form.Label>Name of Judge</Form.Label>
						<Form.Select value={selectedJudge} onChange={handleSelectedJudge}>
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
					</Form.Group>
					{selectedJudge ? (
						<Form.Group as={Row} className="mt-3">
							<Form.Label>Round</Form.Label>
							<Form.Select
								value={JSON.stringify(selectedRound)}
								onChange={handleSelectedRound}
							>
								<option value="">--Select Round--</option>
								{selectedJudgeBallots
									.slice()
									.sort((a, b) => {
										return new Date(b.date) - new Date(a.date);
									})
									.map((round) => (
										<option value={JSON.stringify(round)}>
											{round.time} -{" "}
											{new Date(round.date).toLocaleString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}{" "}
											(as {round.role})
										</option>
									))}
							</Form.Select>
						</Form.Group>
					) : (
						<></>
					)}

					<Form.Group as={Row} className="mt-3">
						<Form.Label>Score</Form.Label>
						<Form.Control
							min="1"
							max="10"
							type="number"
							name="score"
							placeholder="Score"
							value={score}
							onChange={(e) => {
								if (e.target.value.length <= 2) setScore(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key !== "Backspace" && isNaN(e.key)) {
									e.preventDefault();
								}
							}}
						/>
					</Form.Group>
					<Row className="mt-5">
						<Button variant="success" onClick={handleSubmit}>
							Submit Feedback
						</Button>
					</Row>
					<ConfirmFeedback
						feedback={feedback}
						show={showModal}
						onClose={handleClose}
						onConfirm={handleConfirm}
					/>
					<ErrorModal
						show={showErrorModal}
						onHide={hideError}
						errorMessage={errorMessage}
					/>
				</Form>
			) : (
				<p>You need to be logged in to submit feedback.</p>
			)}
		</Container>
	);
}

export default Feedback;
