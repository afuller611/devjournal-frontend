import React, { useState, useContext, createContext } from "react";


const defaultAuthState = {
    isAuthenticated: false,
    username: "",
    authenticate: () => {},
    logOut: () => {}
}

const AuthContext = createContext(defaultAuthState);

export const useAuth = () => useContext(AuthContext);


const AuthProvider = ({ ...props }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const authenticate = () => {
        console.log("authenticating")
        setIsAuthenticated(true);
        setUsername("test");
    }
    
    const logOut = () => {
        setIsAuthenticated(false);
        setUsername("");
    }

    const authObject = {
        isAuthenticated,
        username,
        authenticate,
        logOut

    }
    return (
        <AuthContext.Provider value={authObject}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;