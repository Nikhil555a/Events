
import React, { useState } from 'react';
import start from '../assets/start.webp'; 

const EventCurator = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    'Business', 'Music', 'Comedy', 'Parties', 'Dance', 'Dating',
    'Workshop', 'Food & Drinks', 'Sports', 'Fine Arts', 'Show More'
  ];

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-gray-100 p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center mx-4 w-full">
          {/* Left Section - Text and Buttons */}
          <div className="w-full md:flex-1 space-y-6 md:pr-12">
            <h2 className="text-3xl font-bold text-gray-800">Tell us what you love</h2>
            <p className="text-gray-500 text-lg">
              This will help us curate events specially for you
            </p>

            {/* ✅ Mobile & Desktop → Wrap, scroll removed */}
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestClick(interest)}
                  className={`px-4 py-2 rounded-full border text-gray-700 transition-colors 
                    ${selectedInterests.includes(interest) 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "border-gray-300 hover:bg-blue-500 hover:text-white"}`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <button className="bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg text-lg
                               hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Right Section - Illustration */}
          <div className="hidden md:flex flex-1 justify-end">
            <img src={start} alt="Person with a telescope" className="w-full h-auto max-w-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCurator;

