import {useState} from 'react';
import { Card, Button } from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function CoffeeCard({coffeeProp}) {

    

    const {_id, name, description, price} = coffeeProp;

    //Use the state hook for this component to be able to store its state
    // States are used to keep track of information related to an individual components
    // syntax: const [getter, setter] = useState(initialValue);

    const [count, setCount] = useState(0);
    const [seats, setSeats] = useState(30);
    const [isActive, setIsActive] = useState(false);

    // setCount(3);
    

    function enroll(){
        if (seats > 0) {
            setCount(count + 1);
            console.log('Enrollees: ' + count);
            setSeats(seats - 1);
            console.log('Seats: ' + seats)
        } else {
            alert("No more seats available");
            setIsActive(true);
        };
    }


   return (
        <Card className = 'm-5' id = "coffeeComponent1">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP {price}</Card.Text>
                <Card.Text>Enrollees: {count}</Card.Text>
                <Card.Text>Seats: {seats}</Card.Text>
                <Button as = {Link} to = {`/coffees/${_id}`} variant="primary">Details</Button>
            </Card.Body>
        </Card>
    )
}