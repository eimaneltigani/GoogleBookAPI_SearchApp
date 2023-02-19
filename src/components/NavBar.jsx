import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaSearch} from "react-icons/fa";

class NavBar extends React.Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/Home"><FaSearch /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <Nav.Link href="/Home">Search</Nav.Link>
                <Nav.Link href="/Favorites">Favorites</Nav.Link>
                <Nav.Link>About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }
}

export default NavBar;