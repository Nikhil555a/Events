// src/components/EventFilters.jsx
import React from 'react';

const trendingFilters = ["Exhibitions", "Workshops", "Meetups", "Festivals", "Art"];
const nearbyCities = ["New Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"];

const EventFilters = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center py-8 bg-gray-100">
      
      {/* Trending in Jaipur Section */}
      <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 md:mr-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">TRENDING IN JAIPUR</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {trendingFilters.map((filter, index) => (
            <button
              key={index}
              className="px-3 py-2 border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              {filter}
            </button>
          ))}
          {/* <button className="px-3 py-2 border border-gray-300  text-sm text-gray-600 hover:bg-gray-100 transition duration-300 ease-in-out">
            &gt;
          </button> */}
        </div>
      </div>

      {/* Events in Nearby Cities Section */}
      <div className="flex flex-col items-center md:items-start ">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">EVENTS IN NEARBY CITIES</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {nearbyCities.map((city, index) => (
            <button
              key={index}
              className="px-3 py-2 border border-gray-300  text-sm text-gray-600 hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default EventFilters;