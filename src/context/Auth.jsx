import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

// Create a new context for the user type
const AuthContext = createContext();

// Create a custom hook to access the user type context
export const useAuth = () => useContext(AuthContext);

// Create the AuthProvider component to wrap your app with
export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // initialize the socket connection
        // set the socket connection to the state
        let role = localStorage.getItem('role');
        const name = localStorage.getItem('name');

        if (role) {
            setRole(role);
        }

        if (name) {
            setName(name);
        }



        const socket = io(`ws://${import.meta.env.VITE_BACKEND_URL}`);

        socket.on('connect', () => {
            setSocket(socket);
            console.log('Connected to socket server');
        });

        return () => {
            socket.disconnect();
        };

    }, [])

    return (
        <AuthContext.Provider value={{ role, setRole, socket, name }}>
            {children}
        </AuthContext.Provider>
    );
};