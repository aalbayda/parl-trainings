import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

const data = [
	{
		id: 1,
		name: "Joe Biden",
		track: "Judge",
		age: 75,
		debated: 1,
		judged: 2,
		score: 3,
		judge: 10,
	},
	{
		id: 29,
		name: "Donald Trump",
		track: "Debater",
		age: 75,
		score: 2,
		judge: "-",
		debated: 2,
		judged: 0,
	},
	{
		id: 3,
		name: "Bo Seo",
		track: "Debater",
		age: 74,
		score: 4,
		judge: 9,
		debated: 3,
		judged: 1,
	},
	// Add more data rows
];

const columns = [
	{ Header: "Name", accessor: "name" },
	{ Header: "Track", accessor: "track" },
	{ Header: "Total Attendance", accessor: "score" },
	{ Header: "Rounds Debated", accessor: "debated" },
	{ Header: "Number of Wins", accessor: "id" },
	{ Header: "Average Speaker Score", accessor: "age" },
	{ Header: "Rounds Judged", accessor: "judged" },
	{ Header: "Average Judge Score", accessor: "judge" },
];

const Standings = () => {
	useEffect(() => {
		getDocs(collection(db, "parl-trainings")).then((querySnapshot) => {
			const newData = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			console.log(newData);
		});
	}, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns,
				data,
			},
			useSortBy
		);

	return (
		<Container className="mt-5 align-items-center p-4 border rounded shadow">
			<h2 className="text-center">Standings</h2>
			<table {...getTableProps()} className="mt-5 table text-center">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
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
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Container>
	);
};

export default Standings;
