import React from 'react'
import { services } from '../data/Data'

const TopServices = () => {
  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-40 py-8 sm:py-10 w-full">
      <div className="mb-8 flex items-center sm:flex-row justify-between text-center gap-4">
        <h3 className="text-2xl sm:text-xl font-bold mb-2 sm:mb-0">Top Services</h3>
        <h4 className="text-lg sm:text-xl underline text-orange-400 cursor-pointer hover:text-orange-600">All Services</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-20">
        {services.slice(0, 4).map((service, idx) => (
          <div key={service.id || idx} className="flex flex-col sm:flex-row justify-between bg-gray-100 rounded-xl shadow-lg overflow-hidden h-40">
            <div className="flex flex-col justify-end w-full sm:w-1/2 p-4">
              <h5 className="text-lg sm:text-xl font-semibold mb-2 self-start">{service.name}</h5>
            </div>
            <img src={service.image} alt={service.name} className="object-cover w-full sm:w-40 h-32 sm:h-40" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopServices
