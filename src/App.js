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
import BelleBallot from "./BelleBallot";
import ArmiBallot from "./ArmiBallot";
import FarleyBallot from "./FarleyBallot";
import Backlogs from "./Backlogs";

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
				<Route path="/backlogs" element={<Backlogs />} />
				<Route path="/belle" element={<BelleBallot />} />
				<Route path="/armi" element={<ArmiBallot />} />
				<Route path="/farley" element={<FarleyBallot />} />
			</Routes>
		</Router>
	);
}

export default App;
