import React from 'react';
import PromoCard from './PromoCard';
import carpenterImg from '../assets/Carpenter.png'
import clearnerImg from '../assets/Cleaner.png'
import clearner1Img from '../assets/Cleaner1.png'
import plumberImg from '../assets/Plumber.png';

const PromotionsSection = () => {
  const promotions = [
    {
      bgColor: 'bg-orange-500',
      promoTextColor: 'text-yellow-700',
      imageSrc: clearnerImg,
      altText: 'Cleaner with groceries',
    },
    {
      bgColor: 'bg-teal-600',
      promoTextColor: 'text-yellow-500',
      imageSrc: carpenterImg,
      altText: 'Man holding spray and supplies',
    },
    {
      bgColor: 'bg-yellow-400 text-black',
      promoTextColor: 'text-red-500',
      imageSrc: plumberImg,
      altText: 'Technician with wrench',
    },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-20 lg:px-40 py-8 sm:py-10 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Promotion for today</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
        {promotions.map((promo, index) => (
          <PromoCard key={index} {...promo} />
        ))}
      </div>
    </section>
  );
};

export default PromotionsSection;