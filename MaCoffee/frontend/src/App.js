// Import AppNavbar
import AppNavbar from './components/AppNavbar.js';
import Home from './pages/Home.js';
import Coffees from './pages/Coffees.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Profile from './pages/Profile.js';
import CoffeeView from './pages/CoffeeView.js';
import AddCoffee from './pages/AddCoffee.js'

import Error from './pages/Error';

import {useState, useEffect} from 'react';

import {UserProvider} from "./UserContext.js";


// Routing
// BrowserRouter Component will enable us to simulate page navigation by synchronizing the shown content ahd the shown URL in the web browser.
// Routes component holds all our Route components
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  // state hook for the user stat that's defined here for global scoping
  // Initialiazed as an object with properties from the local storage(key:"token")

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unSetUser = () => {
    setUser({
      id: null,
      isAdmin: null
    });
    localStorage.clear();
  }

  // useEffect(() => {
  //   console.log(user);
  //   console.log(localStorage);
  // }, [user])


  useEffect(()=>{

    fetch('http://localhost:4003/b3/users/details', {
       method: "POST",
       headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
       } 
    })
    .then(result => result.json())
    .then(data => {
        if(typeof data._id !== "undefined"){
            setUser({
              id: data._id,
              isAdmin: data.isAdmin
            })
        }else{
          setUser({
            id: null,
            isAdmin: null
          })
        }

    })

  }, [])

  

  return (
    <UserProvider value = {{user, setUser, unSetUser}}>
        <Router>
            <AppNavbar/>
            <Routes>
              <Route path = "/"  element = {<Home />}/>
              <Route path = "/coffees" element = {<Coffees/>} />
              <Route path = "/register" element = {<Register/>} />
              <Route path = "/login" element = {<Login/>} />
              <Route path = "/logout" element = {<Logout/>} />
              <Route path = "/profile" element = {<Profile/>} />
              <Route path ="/coffees/:coffeeId" element = {<CoffeeView/>} />
               <Route path ="/addCoffee" element = {<AddCoffee/>} />
              <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    </UserProvider>

  );
}

export default App;
