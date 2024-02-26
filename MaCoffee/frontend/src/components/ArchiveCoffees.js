import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveCoffee({coffeeId, isActive, fetchData}) {
    
    const archiveToggle = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/coffees/${id}/archive`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data === true) {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Coffee successfully disabled'
                })
                fetchData();

            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please Try again'
                })
                fetchData();
            }


        })
    }


        const activateToggle = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/coffees/${id}/activate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data === true) {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Coffee successfully enabled'
                })
                fetchData();
            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please Try again'
                })
                fetchData();
            }


        })
    }
 

    return(
        <>
            {isActive ?

                <Button variant="danger" size="sm" onClick={() => archiveToggle(coffeeId)}>Archive</Button>

                :

                <Button variant="success" size="sm" onClick={() => activateToggle(coffeeId)}>Activate</Button>

            }
        </>

        )
}