import { useAuth } from '@/context/Auth';
import { Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const AddPole = () => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    const { socket } = useAuth();
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);
    const [timer, setTimer] = useState(60);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleOptionChange = (e, index) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResult(true);
        socket.emit('pollData', {
            question: title,
            options,
            timer
        })
    };

    useEffect(() => {
        if (socket) {
            socket.on('submitPoll', (data) => {
                setResult(data);
                setShowResult(true);
            });
        }
    }, [socket]);

    const handleAddNewPole = () => {
        setTitle('');
        setOptions([]);
        setShowResult(false);
        setResult(null);
    }


    if (showResult) {
        return (
            <div className="h-[100vh] flex flex-col justify-center items-center bg-white gap-3">
                <div className='flex flex-col justify-center w-1/2 gap-3 text-xl'>
                    <h1 className='flex items-center gap-10'>Question 1 </h1>
                    <div className=" flex flex-col items-center justify-center border border-lightPurple rounded-md">
                        <div className='w-full bg-gradient-to-br from-black via-black to-white text-white p-3'>{title}</div>
                        <ul className='p-4 w-full flex flex-col gap-3'>
                            {options.map((option, index) => (
                                <label key={index} className={`flex items-center gap-3 bg-[#fff] p-4 rounded-md border-2 cursor-pointer border-grey`}>
                                    <div className={`w-8 h-8 flex justify-center items-center rounded-full text-white bg-grey`}>{index + 1}</div>
                                    <span className={``}>{option} ({(result?.votes[option] || 0 / (result?.totalClients - 1)) * 100 || 0}%)</span>
                                </label>
                            ))}
                        </ul>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button className='bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple text-white py-3 px-4 rounded-full w-1/4 text-md' onClick={handleAddNewPole}>Add New Pole</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-[100vh] flex flex-col p-10 bg-white">
            <div className="flex w-1/6 items-center justify-center gap-2 bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple p-2 rounded-full text-white px-5">
                <Sparkles size={15} />
                <p className="text-md">Intervue Poll</p>
            </div>
            <h1 className="text-3xl py-4">Let's <strong>Get Started</strong></h1>
            <p className="text-grey text-l w-1/2">you’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.</p>

            <form onSubmit={handleSubmit} className='my-5 flex flex-col'>
                <div className='flex flex-col w-1/2 gap-2'>
                    <label htmlFor="title" className='font-bold flex justify-between'>Enter Your Question:
                        <select onChange={(e) => setTimer(e.target.value)} className='p-2 bg-[#fff] rounded-md'>
                            {[10, 20, 30, 40, 50, 60].map((time) => (
                                <option key={time} value={time}>{time} seconds</option>
                            ))}
                        </select>
                    </label>
                    <textarea
                        type="text"
                        id="title"
                        value={title}
                        className='resize-none p-2 rounded-lg'
                        onChange={handleTitleChange}
                    />
                </div>
                <div className='my-5 flex flex-col justify-start'>
                    <label htmlFor="options" className='font-bold'>Edit Options:</label>
                    {options.map((option, index) => (
                        <div key={index} className='flex gap-4 w-full items-center my-4'>
                            <div className='bg-lightPurple w-8 h-8 rounded-full flex justify-center items-center'>{index + 1}</div>
                            <input
                                type="text"
                                className='p-3 w-1/3'
                                value={option}
                                onChange={(e) => handleOptionChange(e, index)}
                            />
                            <button type="button" onClick={() => handleRemoveOption(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" className='mt-5 border border-lightPurple text-lightPurple rounded-xl p-3 w-1/4' onClick={handleAddOption}>
                        + Add More Option
                    </button>
                </div>
                <button className="mt-4 bg-lightPurple text-white p-2 px-4 rounded-full w-1/4" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddPole;