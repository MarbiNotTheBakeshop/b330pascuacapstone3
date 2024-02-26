// Imports for the appnavbar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import './AppNavbar.css'; // Import the CSS file

import {Link, NavLink} from "react-router-dom";

import {useState, useContext} from "react";

import UserContext from '../UserContext.js';


export default function AppNavbar(){
	// State to store the user information in the login
	// const [user, setUser] = useState(localStorage.getItem("token"))

	const {user} = useContext(UserContext);

	// console.log(user);

	return(
		<Navbar expand="lg" className="bg-dark">
		      <Container >
		        <Navbar.Brand as = {Link} to = "/" className = "text-white" href="">MA.COFFEE</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as = {NavLink} to = "/"  className = "text-white">Home</Nav.Link>
		            <Nav.Link as = {NavLink} to = "/coffees"  className = "text-white">Coffees</Nav.Link>


		            {/*Conditional rendering*/}
		            {
		            	(user.id !== null) ? 

		            	            user.isAdmin 
		            	            ?
		            	            <>
		            	                <Nav.Link as={Link} to="/addCoffee" className = "text-white">Add Coffee</Nav.Link>
		            	                <Nav.Link as={Link} to="/logout" className = "text-white">Logout</Nav.Link>
		            	            </>
		            	            :
		            	            <>
		            	                <Nav.Link as={Link} to="/profile" className = "text-white">Profile</Nav.Link>
		            	                <Nav.Link as={Link} to="/logout" className = "text-white">Logout</Nav.Link>
		            	            </>
		            	        : 
		            	            <>
		            	                <Nav.Link as={Link} to="/register" className = "text-white">Register</Nav.Link>
		            	                <Nav.Link as={Link} to="/login" className = "text-white">Login</Nav.Link>
		            	                
		            	            </>

		            }
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		</Navbar>
		)
}