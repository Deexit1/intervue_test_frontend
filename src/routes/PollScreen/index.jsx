import { useAuth } from '@/context/Auth';
import { Clock8, LoaderCircle, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const PollScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pollData, setPollData] = useState(null);
    const [timer, setTimer] = useState(60);
    const [selected, setSelected] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { socket, name } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        if (socket) {
            socket.on('pollData', (data) => {
                setPollData(data);
                setIsLoading(false);
                setShowResult(false)
                setResult(null)
                setTimer(data.timer)
                setIsSubmitted(false);
            });

            socket.on('submitPoll', (data) => {
                setResult(data);
            })
        }

    }, [socket]);

    useEffect(() => {

        let interval
        if (!isLoading) {
            interval = setInterval(() => {
                // it should run if the timer is greater than 0
                if (timer > 0) {
                    setTimer((prevTimer) => prevTimer - 1);
                } else {
                    clearInterval(interval);
                    setShowResult(true);
                    return
                }
            }, 1000);
        }

        if (isLoading, timer === 0) {
            if (selected && !isSubmitted) {
                socket.emit('submitPoll', { name, selected, id: pollData._id });
                setIsSubmitted(true);
            }
            setIsLoading(true);
        }

        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [isLoading, timer])


    const handleSelect = (option) => {
        setSelected(option);
    }

    const handleSubmit = () => {
        socket.emit('submitPoll', { name, selected, id: pollData._id });
        setIsSubmitted(true);
        setShowResult(true);
    }

    if (isLoading) {
        return (
            <div className="h-[100vh] flex flex-col justify-center items-center bg-white">
                <div className="flex items-center justify-center gap-2 bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple p-2 rounded-full text-white px-5">
                    <Sparkles size={15} />
                    <p className="text-md">Intervue Poll</p>
                </div>
                <LoaderCircle className='my-4 text-lightPurple font-bold animate-spin w-100 h-100' />
                <h1 className="text-3xl p-4">Wait for the teacher to ask questions...</h1>
            </div>
        )
    }

    if (!isLoading && !showResult && pollData)
        return (
            <>
                <div className="h-[100vh] flex flex-col justify-center items-center bg-white gap-3">
                    <div className='flex flex-col justify-center w-1/2 gap-3 text-xl'>
                        <h1 className='flex items-center gap-10'>Question 1 <span className='flex items-center text-sm gap-2 font-bold text-[#ef4444]'><Clock8 className='w-5 h-5 text-black' />00:{timer}</span></h1 >
                        <div className=" flex flex-col items-center justify-center border border-lightPurple rounded-md">
                            <div className='w-full bg-gradient-to-br from-black via-black to-white text-white p-3'>{pollData.question}</div>
                            <ul className='p-4 w-full flex flex-col gap-3'>
                                {pollData.options.map((option, index) => (
                                    <label key={index} className={`flex items-center gap-3 bg-[#fff] p-4 rounded-md border-2 cursor-pointer ${selected === option ? 'border-lightPurple' : 'border-grey'}`} onClick={() => handleSelect(option)}>
                                        <div className={`w-8 h-8 flex justify-center items-center rounded-full text-white ${selected === option ? 'bg-lightPurple' : 'bg-grey'}`}>{index + 1}</div>
                                        <span>{option}</span>
                                    </label>
                                ))}

                            </ul>
                        </div>
                        <div className='flex justify-end gap-3'>
                            <button className='bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple text-white py-3 px-4 rounded-full w-1/4 text-md' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div >
                </div >

            </>
        );

    if (result) {
        return (
            <div className="h-[100vh] flex flex-col justify-center items-center bg-white gap-3">
                <div className='flex flex-col justify-center w-1/2 gap-3 text-xl'>
                    <h1 className='flex items-center gap-10'>Question 1 <span className='flex items-center text-sm gap-2 font-bold text-[#ef4444]'><Clock8 className='w-5 h-5 text-black' />00:{timer}</span></h1>
                    <div className=" flex flex-col items-center justify-center border border-lightPurple rounded-md">
                        <div className='w-full bg-gradient-to-br from-black via-black to-white text-white p-3'>{pollData.question}</div>
                        <ul className='p-4 w-full flex flex-col gap-3'>
                            {pollData.options.map((option, index) => (
                                <label key={index} className={`flex items-center gap-3 bg-[#fff] p-4 rounded-md border-2 cursor-pointer ${result.selected === option ? 'border-lightPurple' : 'border-grey'}`}>
                                    <div className={`w-8 h-8 flex justify-center items-center rounded-full text-white ${result.selected === option ? 'bg-lightPurple' : 'bg-grey'}`}>{index + 1}</div>
                                    <span className={``}>{option} ({(result.votes[option] || 0 / (result.totalClients - 1)) * 100}%)</span>
                                </label>
                            ))}
                        </ul>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button className='bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple text-white py-3 px-4 rounded-full w-1/4 text-md' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default PollScreen;