import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import ViewBallot from "./ViewBallot";

function parseFormat(format) {
	if (format === "BP") return "BP (Full Set)";
	if (format === "AP") return "AP";
	if (format === "AU") return "Australs";
	if (format === "BPHalf") return "BP (Opening Half)";
	if (format === "PMLO") return "PM-LO";
}

function parseTeams(ballot) {
	let teams = "";
	if (ballot.format === "BP" || ballot.format === "BPHalf") {
		teams +=
			ballot.pmName.split(" ")[0] +
			" & " +
			ballot.dpmName.split(" ")[0] +
			" (OG); " +
			ballot.loName.split(" ")[0] +
			" & " +
			ballot.dloName.split(" ")[0] +
			" (OO)";
		if (ballot.format === "BPHalf") return teams;
		if (ballot.format === "BP")
			return (teams +=
				"; " +
				ballot.mgName.split(" ")[0] +
				" & " +
				ballot.gwName.split(" ")[0] +
				" (CG); " +
				ballot.moName.split(" ")[0] +
				" & " +
				ballot.owName.split(" ")[0] +
				" (CO)");
	} else if (ballot.format === "PMLO") {
		return (
			ballot.pmName.split(" ")[0] +
			" (PM); " +
			ballot.loName.split(" ")[0] +
			" (LO)"
		);
	} else if (ballot.format === "AP" || ballot.format === "AU") {
		return (
			ballot.pmName.split(" ")[0] +
			", " +
			ballot.dpmName.split(" ")[0] +
			", " +
			ballot.gwName.split(" ")[0] +
			" (Gov); " +
			ballot.loName.split(" ")[0] +
			", " +
			ballot.dloName.split(" ")[0] +
			", " +
			ballot.owName.split(" ")[0] +
			" (Opp)"
		);
	}
}

function Records() {
	const [ballots, setBallots] = useState([]);
	const [isInfoslide, setIsInfoslide] = useState(false);
	const [showModal, setShowModal] = useState(null);
	const handleOpen = (modalId) => {
		setShowModal(modalId);
	};
	const handleClose = () => {
		setShowModal(null);
	};
	useEffect(() => {
		getDocs(collection(db, "ballots")).then((querySnapshot) => {
			let ballots = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setBallots(ballots);
		});
	}, []);

	return (
		<>
			{ballots.length > 1 ? (
				<Container className="mt-5 text-center align-items-center p-4 border rounded shadow">
					<h2>Rounds</h2>
					<div style={{ overflowX: "auto" }}>
						<Table className="mt-5">
							<thead>
								<tr>
									<th>Date</th>
									<th>Format</th>
									<th>Motion</th>
									<th>Judges</th>
									<th>Teams</th>
									<th>Ballot</th>
								</tr>
							</thead>
							<tbody>
								{ballots ? (
									ballots
										.slice()
										.sort((a, b) => {
											const date1 = a.date;
											const date2 = b.date;
											const parts1 = date1.split("-");
											const parts2 = date2.split("-");
											const dateObj1 = new Date(
												parts1[0],
												parts1[2] - 1,
												parts1[1],
												a.date === "2023-09-09" ? 0 : parseInt(a.time[0])
												// a.time[0]
											);
											const dateObj2 = new Date(
												parts2[0],
												parts2[2] - 1,
												parts2[1],
												b.date === "2023-09-09" ? 0 : parseInt(b.time[0])
												// b.time[0]
											);
											return dateObj2 - dateObj1;
										})
										.map((ballot) =>
											ballot.date ? (
												<tr key={ballot.id}>
													<td style={{ verticalAlign: "middle" }}>
														{new Date(ballot.date).toLocaleString("en-US", {
															year: "numeric",
															month: "short",
															day: "numeric",
														})}
														,{" "}
														{ballot.date === "2023-09-09"
															? "Intensives " + ballot.time
															: ballot.time}
													</td>
													<td style={{ verticalAlign: "middle" }}>
														{parseFormat(ballot.format)}
													</td>
													<td style={{ verticalAlign: "middle" }}>
														{ballot.infoslide ? (
															<span
																style={{ cursor: "pointer" }}
																onClick={() => {
																	setIsInfoslide(true);
																	handleOpen(ballot.id);
																}}
															>
																ℹ️ {ballot.motion}
															</span>
														) : (
															ballot.motion
														)}
													</td>
													<td style={{ verticalAlign: "middle", width: "20%" }}>
														{ballot.panelists.length > 0
															? ballot.chair +
															  "©, " +
															  ballot.panelists.join(", ")
															: ballot.chair + "©"}
													</td>
													<td style={{ verticalAlign: "middle", width: "20%" }}>
														{parseTeams(ballot)}
													</td>

													<td style={{ verticalAlign: "middle", width: "15%" }}>
														<Button
															onClick={() => {
																setIsInfoslide(false);
																handleOpen(ballot.id);
															}}
														>
															View
														</Button>
													</td>
													<td></td>
													<td></td>
												</tr>
											) : (
												<></>
											)
										)
								) : (
									<></>
								)}
							</tbody>
						</Table>
						{ballots.map((item) => (
							<div
								key={item.id}
								className={`modal ${showModal === item.id ? "show" : ""}`}
								tabIndex="-1"
								role="dialog"
								style={{ display: showModal === item.id ? "block" : "none" }}
							>
								{showModal === item.id && (
									<ViewBallot
										ballot={item}
										isInfoslide={isInfoslide}
										show={true}
										onClose={handleClose}
									/>
								)}
							</div>
						))}
					</div>
				</Container>
			) : (
				<></>
			)}

			<p></p>
		</>
	);
}

export default Records;
