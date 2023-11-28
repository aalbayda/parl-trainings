import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

const columns = [
	{ Header: "Name", accessor: "name" },
	{ Header: "Total Attendance", accessor: "attendance" },
	{ Header: "Rounds Debated", accessor: "count_rounds_debated" },
	{ Header: "Average Speaker Score", accessor: "average_speaker_score" },
	// { Header: "Weighted Speaks", accessor: "weighted_speaks" },
	{ Header: "Number of Wins", accessor: "rounds_won" },
	{ Header: "Rounds Judged", accessor: "count_rounds_judged" },
	{ Header: "Average Judge Score", accessor: "average_judge_score" },
];

const Standings = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getDocs(collection(db, "residents")).then((querySnapshot) => {
			let residents = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			residents = residents.filter(
				(resident) =>
					resident.track !== "Inactive" && resident.track !== "Admin"
			);
			residents.forEach((resident) => {
				resident["weighted_speaks"] = (
					resident["count_rounds_debated"] * 0.65 +
					resident["average_speaker_score"] * 0.35
				).toFixed(2);
				resident["average_speaker_score"] = resident["average_speaker_score"]
					? resident["average_speaker_score"].toFixed(2)
					: 0;

				resident["average_judge_score"] = resident["average_judge_score"]
					? resident["average_judge_score"].toFixed(2)
					: 0;
			});
			setData(residents);
		});
	}, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
				initialState: {
					sortBy: [{ id: "name", desc: false }],
				},
			},
			useSortBy
		);

	return (
		<>
			<Container className="mt-5 text-center align-items-center p-4 border rounded shadow">
				<h2>Standings</h2>
				{/* <p>
					Residents' standings since September 1, 2023 based on submitted
					ballots and feedback.
				</p> */}
				{data ? (
					<div style={{ overflowX: "auto" }}>
						<table {...getTableProps()} className="mt-5 table text-center">
							<thead>
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
												className={
													column.isSorted
														? column.isSortedDesc
															? "sort-desc"
															: "sort-asc"
														: ""
												}
											>
												{column.render("Header")}
												{column.isSorted ? (
													column.isSortedDesc ? (
														<span>&darr;</span> // Down arrow for descending sort
													) : (
														<span>&uarr;</span> // Up arrow for ascending sort
													)
												) : (
													<span>&darr;&uarr;</span> // Both arrows for default state
												)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()}>
								{rows.map((row) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<td {...cell.getCellProps()}>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<></>
				)}
			</Container>
			<p></p>
		</>
	);
};

export default Standings;
