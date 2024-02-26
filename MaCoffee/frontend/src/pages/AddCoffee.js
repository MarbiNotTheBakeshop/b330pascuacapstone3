import {useState,useEffect, useContext} from 'react';
import {Form,Button, Container, Row, Col} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext.js';

export default function AddCoffee(){

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    function createCoffee(e){

        //prevent submit event's default behavior
        e.preventDefault();

        
        

        fetch(`${process.env.REACT_APP_API_URL}/coffees/`,{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price

            })
        })
        .then(res => res.json())
        .then(data => {

            //data is the response of the api/server after it's been process as JS object through our res.json() method.
            

            if(data){
                Swal.fire({

                    icon:"success",
                    title: "Coffee Added"

                })

                navigate("/coffees");
            } else {
                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Coffee Creation",
                    text: data.message

                })
            }

        })

        setName("")
        setDescription("")
        setPrice(0);
    }

    return (

            (user.isAdmin === true)
            ?
            <>
                <Container>
                    <Row>
                        <Col className = "col-4 mx-auto">
                            <h1 className="my-5 text-center">Add Coffee</h1>
                            <Form onSubmit={e => createCoffee(e)}>
                                <Form.Group>
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="my-5">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
            :
            <Navigate to="/coffees" />

    )


}