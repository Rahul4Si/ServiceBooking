import React from 'react';

const PromoCard = ({ bgColor,promoTextColor, imageSrc, altText }) => {
  return (
    <div className={`rounded-xl px-4 text-white shadow-md ${bgColor} flex items-center justify-between`}>
      <div>
        <p className={`text-sm font-semibold ${promoTextColor}`}>#PromoToday</p>
        <h3 className="text-lg font-bold mt-2">Work with our best<br />service provider</h3>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">Book Now</button>
      </div>
      <img src={imageSrc} alt={altText} className="w-52 h-44 object-contain" />
    </div>
  );
};

export default PromoCard;