import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/"><FaSearch /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="ml-auto">
                <Nav.Link href="/">Search</Nav.Link>
                <Nav.Link href="/Favorites">Favorites</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }
}

export default NavBar;