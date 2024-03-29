import React from "react";
import { Nav, Navbar, Container, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaSearch} from "react-icons/fa";
import { Auth } from "aws-amplify";
import { setAuthUser } from "../redux/store/sessionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/store/sessionSlice";
import { Link } from "react-router-dom";

function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const assessLoggedInState = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log('logged in');
                dispatch(setAuthUser(user));
            })
            .catch(() => {
                console.log('not logged in');
                dispatch(setAuthUser(null));
            })
    }

    useEffect(() => {
        assessLoggedInState();
    }, []);

    const signOut = async () => {
        try {
            await Auth.signOut();
            dispatch(setAuthUser(false));
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