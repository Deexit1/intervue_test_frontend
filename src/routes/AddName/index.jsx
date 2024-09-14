import { Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const AddName = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('name')) {
            navigate('/poll');
        }
    }, [name])

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('name', name);

        const socket = socketIOClient(`http://${import.meta.env.VITE_BACKEND_URL}`); // Replace with your server URL
        socket.emit('addName', name);

        socket.on('addName', (data) => {
            console.log("Name Added", data);
        });

        // Reset the input field
        navigate('/poll')
    };

    return (
        <div className="h-[100vh] flex flex-col justify-center items-center bg-white">
            <div className="flex items-center justify-center gap-2 bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple p-2 rounded-full text-white px-5">
                <Sparkles size={15} />
                <p className="text-md">Live Polling</p>
            </div>
            <h1 className="text-5xl p-4">Let's <strong>Get Started</strong></h1>
            <p className="text-grey text-xl text-center w-1/2 py-2">If you’re a student, you’ll be able to submit your answers, participate in live polls, and see how your responses compare with your classmates</p>
            <form onSubmit={handleFormSubmit} className='flex flex-col w-1/2 items-center gap-4 mt-5'>
                <div className='flex flex-col w-1/2 gap-3'>
                    <label htmlFor="name">Enter your name:</label>
                    <input type="text" value={name} onChange={handleNameChange} className='p-4 text-md bg-white-600 rounded-sm' />
                </div>
                <button type="submit" className='bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple rounded-full text-white px-5 py-3 w-1/3' disabled={!name}>Submit</button>
            </form>
        </div>
    );
};

export default AddName;