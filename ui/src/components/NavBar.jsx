import React from "react";
import { Nav, Navbar, Container, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaSearch} from "react-icons/fa";
import { getCurrentUser, signOut as amplifySignOut } from "aws-amplify/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/store/sessionSlice";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    console.log(user);

    async function currentAuthenticatedUser() {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${signInDetails}`);
      } catch (err) {
        console.log('not logged in');
      }
    }

    useEffect(() => {
        currentAuthenticatedUser();
    }, []);

    const signOut = async () => {
        try {
            await amplifySignOut();
            navigate("/Favorites")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    const authButton = () => {
        if (user) {
          return (
            <Button variant="secondary" onClick={signOut}>Logout</Button>
          )
        } else {
          return (
            <Button variant="secondary" as={Link} to="/Login">Sign Up</Button>
          )
        }
    }

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
            <Form inline>
              {authButton()}
            </Form>
          </Container>
        </Navbar>
    );

}

export default NavBar;