import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import {useParams } from 'react-router-dom';

import Swal from "sweetalert2";


export default function CoffeeView(){
	const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    //The "useParams" hook allows us to retreive the coffeeId passed via the URL
    const { coffeeId} = useParams();

    useEffect(()=> {
    	fetch(`${process.env.REACT_APP_API_URL}/coffees/${coffeeId}`)
    	.then(result => result.json())
    	.then(data => {
    		// console.log(data);

    		setName(data.name);
    		setDescription(data.description);
    		setPrice(data.price);
    	})




    }, [coffeeId])

    const enroll = (coffeeId) => {
    	fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
    		method : "POST",
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem("token")}`,
    			"Content-Type" : "application/json"
    		},
    		body: JSON.stringify({
    			coffeeId : coffeeId
    		})
    	}).then(result => result.json())
    	.then(data => {
    		if(data.message === "Enrolled succesfully!"){
    			Swal.fire({
    				title: "Succesfully Enrolled",
    				icon: "success",
    				text: "You have successfully enrolled into this coffee"
    			})
    		}else{
    			Swal.fire({
    				title: "Something went wrong",
    				icon: "error",
    				text: "Please Try Again!"
    			})
    		}
    	})
    }


	return(
		<Container className="mt-5">
		    <Row>
		        <Col lg={{ span: 6, offset: 3 }}>
		            <Card>
		                <Card.Body className="text-center">
		                    <Card.Title>{name}</Card.Title>
		                    <Card.Subtitle>Description:</Card.Subtitle>
		                    <Card.Text>{description}</Card.Text>
		                    <Card.Subtitle>Price:</Card.Subtitle>
		                    <Card.Text>PhP {price}</Card.Text>
		                    <Card.Subtitle>Class Schedule</Card.Subtitle>
		                    <Card.Text>8 am - 5 pm</Card.Text>
		                    <Button variant="primary" onClick = {() => enroll(coffeeId)} >Enroll</Button>
		                </Card.Body>        
		            </Card>
		        </Col>
		    </Row>
		</Container>
		)
}