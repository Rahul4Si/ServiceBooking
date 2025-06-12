import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';    
import { FaHome } from "react-icons/fa";
import PostAddDialog from './PostAddDialog';
import UpdateDialog from './UpdateDialog';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "CLIENT");
    const [openPostAdd, setOpenPostAdd] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
            setUserRole(localStorage.getItem("userRole") || "CLIENT");
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.setItem("isLoggedIn", false);
        setIsLoggedIn(false); // <-- update state
        setUserRole("CLIENT");
        window.location.href = "/"; // Redirect to home page
    }
    
    return (
        <nav className="bg-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between shadow-md w-full">
            <div className="flex items-center gap-2 text-black text-2xl font-bold mb-2 sm:mb-0">
                <FaHome className="inline-block mb-1" />
                <span>Door2Day</span>
            </div>
            {/* Hamburger for mobile */}
            {/* Navigation links */}
            {!isLoggedIn && (
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <Link to="/" className="text-black hover:text-blue-600 font-medium transition-colors">Home</Link>
                    <Link to="/all-Ads" className="text-black hover:text-blue-600 font-medium transition-colors">All services</Link>
                    <Link to="/login" className="bg-orange-500 text-white shadow-md hover:bg-orange-600 font-medium transition-colors px-6 py-2 rounded w-full sm:w-auto text-center">Login</Link>
                    <Link to="/register" className="bg-orange-500 text-white shadow-md hover:bg-orange-600 font-medium transition-colors px-6 py-2 rounded w-full sm:w-auto text-center">Register</Link>
                </div>
            )}
            {isLoggedIn && userRole === "CLIENT" && (
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <Link to="/" className="text-black hover:text-blue-600 font-medium transition-colors">Home</Link>
                    <Link to="/all-Ads" className="text-black hover:text-blue-600 font-medium transition-colors">All Services</Link>
                    <Link to={`my-bookings/${localStorage.getItem("userId")}`} className="text-black hover:text-blue-600 font-medium transition-colors">Bookings</Link>
                    <Link onClick={handleLogout} className="bg-orange-500 text-white shadow-md hover:bg-orange-600 font-medium transition-colors px-6 py-2 rounded w-full sm:w-auto text-center">Logout</Link>
                </div>
            )}
            {isLoggedIn && userRole === "COMPANY" && (
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <Link to={`/company/dashboard/${localStorage.getItem("userId")}`} className="text-black hover:text-blue-600 font-medium transition-colors">DashBoard</Link>
                    <button onClick={() => setOpenPostAdd(true)} className="text-black hover:text-blue-600 font-medium transition-colors bg-transparent border-none cursor-pointer w-full sm:w-auto text-center">Post Ad</button>
                    <Link to={`/myads/${localStorage.getItem("userId")}`} className="text-black hover:text-blue-600 font-medium transition-colors">Ads</Link>
                    <Link onClick={handleLogout} className="bg-orange-500 text-white shadow-md hover:bg-orange-600 font-medium transition-colors px-6 py-2 rounded w-full sm:w-auto text-center">Logout</Link>
                </div>
            )}
            <PostAddDialog open={openPostAdd} setOpen={setOpenPostAdd} />
        </nav>
    );
};
  
export default Navbar;