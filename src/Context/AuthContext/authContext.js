import React from 'react'

const authContext = React.createContext(
    {
        isUserLoggedIn: false,
        setUserLoggedIn: () => { },
        idToken: false,
        setIdToken: () => { },
    }
)

export default authContext;