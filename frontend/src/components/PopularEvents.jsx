
import React from "react";
import workShop from "../assets/work1.jpeg"
import performance from "../assets/performance.jpeg"
import tour from "../assets/tour.jpeg"
import exhibition from "../assets/exbhition.avif"
import networking from "../assets/network.jpeg"
import conference from "../assets/conference.jpeg"
import retreat from "../assets/retreat.jpeg"

const PopularEvents = () => {
  const formats = [
    { name: "Workshop", image: workShop},
    { name: "Performance", image:performance },
    { name: "Tour", image: tour },
    { name: "Exhibition", image:exhibition },
    { name: "Networking", image: networking },
    { name: "Conference", image:conference },
    { name: "Retreat", image:retreat },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 lg:pl-0 pl-4">
        Popular formats in{" "}
        <span className="underline font-medium">Jaipur</span>
      </h2>

      {/* ✅ Mobile -> Horizontal scroll | ✅ Desktop -> Center */}
      <div className="flex gap-6 overflow-x-auto sm:overflow-visible sm:justify-center  scrollbar-hide">
        {formats.map((format, index) => (
          <div
            key={index}
            className="group relative w-36 h-36 rounded-full overflow-hidden cursor-pointer 
                       flex-shrink-0 sm:flex-shrink"
          >
            {/* Image */}
            <img
              src={format.image}
              alt={format.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-base font-semibold">
                {format.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;

