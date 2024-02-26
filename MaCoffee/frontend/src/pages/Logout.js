import {Navigate} from "react-router-dom";

import {useContext, useEffect} from 'react';
import UserContext from "../UserContext.js";

export default function Logout(){

	const {unSetUser} = useContext(UserContext);

	useEffect(() => {
		unSetUser();
	}, []);
	
	// it clears or removes all the content of our localStorage
	// localStorage.clear();


	return(
		<Navigate to = "/login" />
		)
}