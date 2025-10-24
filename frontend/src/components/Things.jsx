
import React from 'react';
import business from "../assets/business.jpeg"
import concert from "../assets/concert.jpeg"
import Exhibition from "../assets/exbhition.avif"
import food from "../assets/food.jpeg"
import meetup from "../assets/meetup.jpeg"
import parties from "../assets/parties.jpeg"
import sport from "../assets/sport.jpeg"
import health from "../assets/health.jpeg"

const Things = () => {
  const categories = [
    { name: 'Business', imageUrl: business},
    { name: 'Concerts', imageUrl: concert },
    { name: 'Exhibitions', imageUrl: Exhibition },
    { name: 'Food & Drinks', imageUrl: food },
    { name: 'Meetups', imageUrl: meetup },
    { name: 'Parties', imageUrl: parties },
    { name: 'Sports', imageUrl: sport },
    { name: 'Health & Wellness', imageUrl: health},
  ];

  return (
    <div className='w-[1200px]'>
          <div className='w-full'> {/* Changed w-[1200px] to w-full for better responsiveness */}
      <div className="flex flex-col items-start p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Things to do in Jaipur</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl">
          {categories.map((category, index) => (
            <div 
              key={index} 
              // Added 'group' class to the parent div here
              className="group relative h-20 md:h-36 lg:h-20 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                // Image scales up on parent group hover
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay for text, also responding to group hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 group-hover:bg-opacity-70">
                <span className="text-white text-lg font-semibold text-center">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>

  );
};

export default Things;

