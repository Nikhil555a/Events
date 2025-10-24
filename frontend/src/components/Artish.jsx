
import React from 'react';
import art1 from "../assets/art1.jpg"
import art2 from "../assets/art2.webp"
import art3 from "../assets/art3.webp"
import art4 from "../assets/art4.webp"
import art5 from "../assets/art5.jpg"
import art6 from "../assets/art6.jpg"

const artists = [
  { name: 'Aditya Gadhvi', profession: 'Gujarati Garba', image: art1 },
  { name: 'Ishani Dave', profession: 'Singer', image: art2 },
  { name: 'Kinjal Dave', profession: 'Gujarati Garba', image: art3 },
  { name: 'Osman Mir', profession: 'Gujarati Garba', image: art4 },
  { name: 'Bhumik Shah', profession: 'Singer', image: art5 },
  { name: 'Akon', profession: 'Dance Pop', image: art6 },
];

const Artish = () => {
  return (
    <div className='w-full max-w-[1200px] mx-auto'>
      {/* p-4 */}
      <div className="container mx-auto p-4 md:p-8 mt-10">
        <h2 className="text-2xl sm:text-3xl  font-bold mb-6">Artists on tour near Jaipur</h2>

        {/* Filter buttons - Now horizontally scrollable */}
        <div className="flex flex-nowrap overflow-x-auto gap-6 mb-8 scrollbar-hide">
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-blue-500 bg-blue-500 text-white transition-colors duration-200 hover:bg-blue-600 hover:border-blue-600">Popular</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Gujarati Pop</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Gujarati Garba</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Filmi</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Modern Bollywood</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Comedian</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Dance Pop</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Singer</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Sufi</button>
          <button className="flex-none px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900">Punjabi Pop</button>
        </div>

        {/* Artists scrollable row */}
        <div className="flex gap-3 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {artists.map((artist, index) => (
            <div key={index} className="flex flex-col items-center text-center min-w-[150px] group cursor-pointer">
              <div className="relative w-[130px] h-[130px] lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-200 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-full"></div>
              </div>
              <p className="mt-2 text-xl font-medium text-gray-700">{artist.name}</p>
              <p className="text-md text-gray-500">{artist.profession}</p>
              <button className="mt-2 px-6 py-0.5 text-md font-medium text-blue-300 border-2 border-blue-300 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-500">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artish;


