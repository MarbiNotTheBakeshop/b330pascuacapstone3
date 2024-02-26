import { useState, useEffect } from 'react';
import CoffeeCard from './CoffeeCard';
import SearchCoffee from './SearchCoffee.js'



export default function UserView() {

    const [coffees, setCoffees] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4003/b3/products/allActive`)
        .then(res => res.json())
        .then(data => {

                  const coffeesArr = data.map(coffee => {
                      //only render the active coffees
                      if(coffee.isActive === true) {
                          return (
                              <CoffeeCard coffeeProp={coffee} key={coffee._id}/>
                              )
                      } else {
                          return null;
                      }
                  })

                  setCoffees(coffeesArr)

               });
    }, [])

    

    return(
        <>
            <SearchCoffee />
            {/*{ coffees }*/}
        </>
        )
}