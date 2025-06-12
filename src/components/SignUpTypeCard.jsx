import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpTypeCard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
            <h2 className="text-4xl font-extrabold text-orange-700 mb-10 tracking-wide drop-shadow-lg">Register As</h2>
            <div className="flex gap-10">
                <div
                    className="bg-white p-10 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition w-72 text-center border-2 border-transparent hover:border-orange-400 transform hover:-translate-y-2 duration-300 group"
                    onClick={() => navigate('/registerClient')}
                >
                    <div className="flex items-center justify-center mb-4">
                        <span className="inline-block bg-orange-500 text-white rounded-full p-3 text-2xl group-hover:bg-orange-600 transition">👤</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-orange-700 group-hover:text-orange-800 transition">Client</h3>
                    <p className="text-gray-600">Book services and manage your appointments.</p>
                </div>
                <div
                    className="bg-white p-10 rounded-2xl shadow-xl cursor-pointer hover:shadow-2xl transition w-72 text-center border-2 border-transparent hover:border-orange-400 transform hover:-translate-y-2 duration-300 group"
                    onClick={() => navigate('/registerCompany')}
                >
                    <div className="flex items-center justify-center mb-4">
                        <span className="inline-block bg-orange-500 text-white rounded-full p-3 text-2xl group-hover:bg-orange-600 transition">🏢</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-orange-700 group-hover:text-orange-800 transition">Company</h3>
                    <p className="text-gray-600">Offer your services and manage bookings.</p>
                </div>
            </div>
        </div>
    );
};

export default SignUpTypeCard;