import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Ballot from "./Ballot.js";
import Navigation from "./Navigation.js";
import Feedback from "./Feedback";
import Motions from "./Motions";
import Standings from "./Standings";
import Records from "./Records";
import Admin from "./Admin";
import LouiseBallot from "./LouiseBallot";

function App() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/ballot" element={<Ballot />} />
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/motions" element={<Motions />} />
				<Route path="/standings" element={<Standings />} />
				<Route path="/rounds" element={<Records />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/louise" element={<LouiseBallot />} />
			</Routes>
		</Router>
	);
}

export default App;
