import React from "react";
import { decryptToken } from "./auth";
import { reset_db, add_db } from "./update_db";

function Admin() {
	return (
		<>
			{decryptToken().tabName === "Bob Albayda" ? (
				<button onClick={add_db}>ADD DB</button>
			) : (
				<></>
			)}
		</>
	);
}

export default Admin;
