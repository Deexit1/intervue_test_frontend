
import { useAuth } from "@/context/Auth";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const { role, setRole, socket } = useAuth();
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "student") navigate('/addName');
        else if (role === "teacher") navigate('/addPoll');
    }, [role])

    const handleClick = () => {
        localStorage.setItem('role', userRole);
        setRole(userRole);
        // handle socket role
        socket.emit('role', userRole);
    }

    return (
        <div className="h-[100vh] flex flex-col justify-center items-center bg-white">
            <div className="flex items-center justify-center gap-2 bg-gradient-to-br from-lightPurple via-lightPurple to-darkPurple p-2 rounded-full text-white px-5">
                <Sparkles size={15} />
                <p className="text-md">Live Polling</p>
            </div>
            <h1 className="text-5xl p-4">Welcome to the <strong>Live Polling</strong></h1>
            <p className="text-grey text-xl">Please select the role that best describes you to begin using the live polling system</p>

            {/* Radio button as cards */}
            <div className="flex gap-4 mt-4">
                <div className={`flex flex-col justify-center gap-2 p-4 border-4 rounded-lg cursor-pointer ${userRole === "student" ? "border-lightPurple" : "border-grey"}`} onClick={() => setUserRole("student")}>
                    <p className="text-xl">I'm a Student</p>
                    <p className="text-grey text-sm">I want to participate in the live polling</p>
                </div>
                <div className={`flex flex-col justify-center gap-2 p-4 border-4 rounded-lg cursor-pointer ${userRole === "teacher" ? "border-lightPurple" : "border-grey"}`} onClick={() => setUserRole("teacher")}>
                    <p className="text-xl">I'm a Teacher</p>
                    <p className="text-grey text-sm">I want to create and manage the live polling</p>
                </div>
            </div>
            <button className="mt-4 bg-lightPurple text-white p-2 px-4 rounded-lg" disabled={!userRole} onClick={handleClick}>Continue</button>
        </div>
    )
}