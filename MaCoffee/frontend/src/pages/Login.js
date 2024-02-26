import { Form, Button, Container, Col, Row } from 'react-bootstrap';

import { useState, useEffect, useContext } from 'react';

import {Navigate} from "react-router-dom";

import UserContext from "../UserContext.js";

import Swal from 'sweetalert2';
import './Login.css'; // Import the CSS file

export default function Login() {
    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
                // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    // Allows us to consume the User context object and it's properties to use for user validation
    const { user, setUser} = useContext(UserContext);



    useEffect(() => {

                    // Validation to enable submit button when all fields are populated and both passwords match
                    if(email !== '' && password !== ''){
                        setIsActive(false);
                    }else{
                        setIsActive(true);
                    }

                }, [email, password]);

    function authenticate(event) {
            // Prevents page redirection via form submission
            event.preventDefault();
            
            fetch('http://localhost:4003/b3/users/login',{

                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
        
                    email: email,
                    password: password
            
                        })
                    })
                    .then(res => res.json())
                    .then(data => {

                        if(data.accessToken){
                            // console.log(data.accessToken);
                            localStorage.setItem('token', data.accessToken);

                            retrieveUserDetails(data.accessToken);

                            Swal.fire({
                                title: "Login Succesfull",
                                icon: "success",
                                text: "Welcome to MA.COFFEE!"
                            })

                            
                        } else {

                            Swal.fire({
                                title: "Authentication Failed",
                                icon: "error",
                                text: "Check your credentials"
                            })
                        }
                    })
                    // Clear input fields after submission
                    setEmail('');
                    setPassword('');


                    }


    const retrieveUserDetails = (token) => {

        fetch('http://localhost:4003/b3/users/details', {
           method: "POST",
           headers: {
                Authorization : `Bearer ${token}`
           } 
        })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    }



    return (    
        (user.id !== null)
        ?
        <Navigate to = "/" />
        :
        <Container className='my-5' >
            <Row>
                <Col className = "col-4 mx-auto">
                    <Form onSubmit = {event => authenticate(event)}className = "mb-5">
                        <h1 className="my-5 text-center">Login</h1>
                        <Form.Group controlId="userEmail">
                           <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        required
                        value={email}
                       onChange={(e) => setEmail(e.target.value)}
                        />
                        </Form.Group>

                        <Form.Group controlId="password">
                           <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        required
                        value={password}
                       onChange={(e) => setPassword(e.target.value)}
                        />
                        </Form.Group>

                        <Button className='mt-3' variant="primary" type="submit" id="submitBtn" disabled = {isActive}>
                        Login
                        </Button>
                    </Form>
                </Col>
            </Row>  
        </Container>
                
     )
}
