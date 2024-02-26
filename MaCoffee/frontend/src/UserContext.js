import React from 'react';

// Create a context object

const UserContext = React.createContext();


// The "provider", allows other components to consume / use the context and supply the necessary information needed to the context
export const UserProvider = UserContext.Provider;

export default UserContext;