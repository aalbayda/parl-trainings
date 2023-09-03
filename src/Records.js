import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";
import { reset_db } from "./update_db";

function Records() {
	return (
		<>
			<Container className="mt-5 text-center align-items-center p-4 border rounded shadow">
				<h2>Records</h2>
				<p>Ballot history will show here.</p>
			</Container>
			<p></p>
		</>
	);
}

export default Records;
