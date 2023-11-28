import React from "react";
import Card from "react-bootstrap/Card";
import Navigation from "./Navigation";

function Home() {
	return (
		<>
			<div style={{ overflowX: "auto" }} className="mt-5 text-center">
				<Card>
					<Card.Header>December Calendar</Card.Header>
					<Card.Body>
						<blockquote className="blockquote mb-0">
							<p> Every day is wack philo day </p>
							<footer className="blockquote-footer">Vince Hubilla, 2023</footer>
						</blockquote>
					</Card.Body>
				</Card>
			</div>
		</>
	);
}

export default Home;
