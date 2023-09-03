import React from "react";
import { decryptToken } from "./auth";
import { reset_db } from "./update_db";

function Admin() {
	return (
		<>
			{/* {decryptToken().tabName === "Bob Albayda" ? (
				<button onClick={reset_db}>RESET DB</button>
			) : (
				<></>
			)} */}
		</>
	);
}

export default Admin;
