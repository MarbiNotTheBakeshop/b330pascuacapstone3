import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditCoffee from './EditCoffee.js';
import ArchiveCoffees from './ArchiveCoffees.js'

export default function AdminView({coffeesData, fetchData}) {

    const [coffees, setCoffees] = useState([])
    //Getting the coffeesData from the coffees page
    useEffect(() => {
        const coffeesArr = coffeesData.map(coffee => {
            
            return (
                <tr key={coffee._id}>
                    <td>{coffee._id}</td>
                    <td>{coffee.name}</td>
                    <td>{coffee.description}</td>
                    <td>{coffee.price}</td>
                    <td className={coffee.isActive ? "text-success" : "text-danger"}>
                    {coffee.isActive ? "Available" : "Unavailable"}
                    </td>

                    <td><EditCoffee coffeeId = {coffee._id} fetchData = {fetchData} /></td> 
                    <td><ArchiveCoffees coffeeId = {coffee._id} fetchData={fetchData} isActive={coffee.isActive}/></td> 
                </tr>
                )
        })

        setCoffees(coffeesArr)

    }, [coffeesData])
    return(
        <>
                    <h1 className="text-center my-4"> Admin Dashboard</h1>
                    
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {coffees}
                        </tbody>
                    </Table>    
                </>

        )
}
