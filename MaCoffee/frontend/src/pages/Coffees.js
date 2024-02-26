// import coffeesData from '../data/coffeesData.js';

// import CoffeeCard from '../components/CoffeeCard.js';

import {useEffect, useState, useContext} from "react";

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';


export default function Coffees(){
	
	//Checks to see if the mock data was captured.
	// console.log(coffeesData);
	// console.log(coffeesData[0]);

	const {user} = useContext(UserContext);

	const [coffees, setCoffees] = useState([]);

	const fetchData = () => {
		fetch(`http://localhost:4003/b3/products/all`,{
			headers: {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			}
		})
		       .then(res => res.json())
		       .then(data => {
		           
		           console.log(data);

		           // Sets the "coffees" state to map the data retrieved from the fetch request into several "CoffeeCard" components
		           setCoffees(data);

		       });
	}


	useEffect(()=>{
		
		if(user.isAdmin){
			fetchData()
		}


	}, [])



	/*const coffees = coffeesData.map(coffee => {
		return(
			<CoffeeCard coffeeProp = {coffee} key = {coffee.id}/>
			)
	})*/


	return(
		 <>
                    {
                        (user.isAdmin === true) ?
                            <AdminView coffeesData={coffees} fetchData = {fetchData}/>

                            :

                            <UserView />
                    }
                </>
		
		)

}