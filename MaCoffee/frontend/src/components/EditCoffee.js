import {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Swal from "sweetalert2";

export default function EditCoffee({coffeeId, fetchData}){
    console.log(coffeeId);

    const [id, setId] = useState(coffeeId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const[isOpen, setIsOpen] = useState(false)

    const openEdit = (coffeeId) => {
        
        fetch(`${process.env.REACT_APP_API_URL}/coffees/${coffeeId}`)
        .then(result => result.json())
        .then(data => {
            // console.log(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
        })

        setIsOpen(true);
    }

    const closeEdit = () => {
        setIsOpen(false);
    }

    const editCoffee = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/coffees/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(result => result.json())
        .then(data => {
            // console.log(data)

            if(data){
                Swal.fire({
                    title: "Coffee Updated!",
                    icon: "success",
                    text: 'Coffee Successfully Updated!'
                })

                fetchData();
            }else{
                Swal.fire({
                    title: "Coffee not updated!",
                    icon: "error",
                    text: 'Please try again!'
                })
            }

            setIsOpen(false);
        })



    }





    return(
        <>
            <Button variant = 'primary' size = 'sm' onClick = {() => openEdit(id)}>Edit</Button>

            <Modal show = {isOpen}>
                <Form onSubmit = {event=> editCoffee(event)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Coffee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="coffeeName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                value = {name}
                                onChange={event => setName(event.target.value)}
                                />
                        </Form.Group>
                        <Form.Group controlId="coffeeDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                value = {description}
                                onChange = {event => setDescription(event.target.value)}
                                />
                        </Form.Group>
                        <Form.Group controlId="coffeePrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                required
                                value = {price}
                                onChange = {event => setPrice(event.target.value)}
                                />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick = {closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
        )
}