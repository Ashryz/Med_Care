import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        
        if (token) {
            setIsLoggedIn(true);
            setToken(token);
        }
    }
    , [token]);

    const login = (token, user) => {
        setIsLoggedIn(true);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setCurrentUser(user);
    }

    const logout = () => {
        setIsLoggedIn(false);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }



    
    return (
        <AuthContext.Provider value={{ isLoggedIn, currentUser, setCurrentUser, token, setToken , login, logout ,setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
