import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
	return (
		<Navbar
			bg="dark"
			data-bs-theme="dark"
			expand="lg"
			className="bg-body-tertiary"
		>
			<Container>
				<Navbar.Brand>
					<img
						src="logo.jpg"
						width="40"
						height="40"
						style={{ borderRadius: "50px" }}
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link as={Link} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/ballot">
							Ballot
						</Nav.Link>
						<Nav.Link as={Link} to="/feedback">
							Feedback
						</Nav.Link>
						<Nav.Link as={Link} to="/standings">
							Standings
						</Nav.Link>
						<Nav.Link as={Link} to="/standings">
							Records
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						<Nav.Link>Login</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
