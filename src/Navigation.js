import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "./firebase";
import { isLoggedIn } from "./auth";

function Navigation() {
	const [loggedIn, setLoggedIn] = useState(false);

	const logout = () => {
		document.cookie =
			"authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.href = "/";
		localStorage.removeItem("authCookie");
		setLoggedIn(false);
	};

	const checkIsLoggedIn = async () => {
		return await isLoggedIn()
			.then((res) => setLoggedIn(res))
			.catch((err) => {
				console.error(err);
			});
	};

	useState(() => {
		checkIsLoggedIn();
	}, []);

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
						<Nav.Link as={Link} to="/records">
							Records
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						{loggedIn === true ? <Nav.Link>Profile</Nav.Link> : <></>}
						<Nav.Link onClick={loggedIn === true ? logout : signInWithGoogle}>
							{loggedIn === true ? "Logout" : "Login"}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
