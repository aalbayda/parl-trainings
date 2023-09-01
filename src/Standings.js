import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

const columns = [
	{ Header: "Name", accessor: "name" },
	{ Header: "Track", accessor: "track" },
	{ Header: "Total Attendance", accessor: "attendance" },
	{ Header: "Rounds Debated", accessor: "count_rounds_debated" },
	{ Header: "Number of Wins", accessor: "rounds_won" },
	{ Header: "Average Speaker Score", accessor: "average_speaker_score" },
	{ Header: "Rounds Judged", accessor: "count_rounds_judged" },
	{ Header: "Average Judge Score", accessor: "average_judge_score" },
];

const Standings = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getDocs(collection(db, "residents")).then((querySnapshot) => {
			const newData = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setData(newData);
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
			<Container className="mt-5 align-items-center p-4 border rounded shadow">
				<h2 className="text-center">Standings</h2>
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
