import { useState } from 'react';
import CoffeeCard from "./CoffeeCard.js"

const CoffeeSearch = () => {
  const [coffeeName, setCoffeeName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coffees/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coffeeName }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.coffees);
        console.log(data.coffees);  
        setMessage(null);
      } else {
        const errorData = await response.json();
        setSearchResults([]);
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error searching coffee:', error);
      setSearchResults([]);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
  <div className="container">
    <h2>Search Coffees</h2>
    <div className="form-group">
      <label>Coffee Name:</label>
      <input
        type="text"
        className="form-control"
        value={coffeeName}
        onChange={(e) => setCoffeeName(e.target.value)}
      />
    </div>
    <button className="btn btn-primary mt-2" onClick={handleSearch}>
      Search
    </button>
    {message && <div className="alert alert-info">{message}</div>}
    {searchResults.length > 0 ? (
      <div>
        <h3>Search Results:</h3>
        <ul>
          {searchResults.map((coffee) => (
            // Check if coffee object has coffeeName property
              <CoffeeCard coffeeProp={coffee} key={coffee._id}/>
          ))}
        </ul>
      </div>
    ) : (
      <p>No results found.</p>
    )}
  </div>
);
};

export default CoffeeSearch;
