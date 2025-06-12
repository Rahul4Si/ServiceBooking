import React from "react";

const Badger = () => {
  return (
    <div className="relative w-full h-72 sm:h-96">
      <img
        src={
          "https://res.cloudinary.com/taskrabbit-com/image/upload/f_auto,q_auto/ikbvkbww0wcm8lfu2glt"
        }
        alt="Badger Icon"
        className="w-full h-full object-cover mx-auto md:rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
      <div className="absolute left-1/2 bottom-8 sm:left-20 sm:bottom-20 transform -translate-x-1/2 sm:translate-x-0 text-center sm:text-left w-full sm:w-auto px-4">
        <h2 className="text-2xl sm:text-5xl font-bold text-white drop-shadow-lg leading-tight">Your All-In-One Service</h2>
        <h2 className="text-2xl sm:text-5xl font-bold text-white drop-shadow-lg leading-tight">Booking Platform</h2>
      </div>
    </div>
  );
};

export default Badger;
