import {CardGroup} from 'react-bootstrap';
import {useEffect, useState} from 'react';

import PreviewCoffees from './PreviewCoffees.js';

export default function FeaturedCoffees(){

	const [previews, setPreviews] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:4003/b3/products/allActive`)
		.then(result => result.json())
		.then(data => {
			console.log(data);
			// Create two empty arrays to be used to store random numbers and featured coffee data.
			const numbers = [];
			const featured = [];
	
			//Creating a function that will generate a random number from 0 to the length of the data array.
			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length);
	
				if (numbers.indexOf(randomNum) === -1) {
					numbers.push(randomNum);
				} else {
					generateRandomNums(); // Call recursively if number is not unique
				}
			};
	
			for (let i = 0; i < 5; i++) {
				generateRandomNums();
				featured.push(<PreviewCoffees data={data[numbers[i]]} key={numbers[i]} />);
			}
	
			setPreviews(featured);
		});
	}, []);
	
	

	return(
		<>
			<h1 className = "text-center mt-5">Featured Coffees</h1>
			<CardGroup className =" justify-content-around">
				{previews}
			</CardGroup>
		</>
		)
		
	
}