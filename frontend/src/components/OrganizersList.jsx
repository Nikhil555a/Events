
import React from 'react';
import org1 from "../assets/org1.png"
import org2 from "../assets/org2.webp"
import org3 from "../assets/org3.webp"
import org4 from "../assets/org4.webp"
import org5 from "../assets/org5.png"
import org6 from "../assets/org6.png"
import org7 from "../assets/org7.jpg"
import org8 from "../assets/org8.jpeg"

const organizers = [
  { logo: org1, name: "ENGIEXPO INDUSTRIAL EX...", tags: ["Business", "Exhibitions"], followers: "1.1k", events: 3 },
  { logo: org2, name: "Voice Of Words", tags: ["Entertainment", "Performance"], followers: "764", events: 2 },
  { logo: org3, name: "2WAY ADVERTISING", tags: ["Exhibitions", "Business"], followers: "196", events: 4 },
  { logo: org4, name: "Lagan Mandap", tags: ["Exhibitions", "Art"], followers: "189", events: 1 },
  { logo: org5, name: "Engiexpo", tags: ["Exhibitions"], followers: "144", events: 3 },
  { logo: org6, name: "Social Scrapc", tags: ["Business", "Exhibitions"], followers: "107", events: 1 },
  { logo: org7, name: "BlaBla Language Exchange...", tags: ["Trips-Adventures", "Virtual"], followers: "59", events: 20 },
  { logo: org8, name: "Krishna A Krishna", tags: ["Business", "Nonprofit"], followers: "9", events: 2 },
];

const OrganizersList = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 lg:pl-0 pl-4">
        Most happening Organizers in Jaipur
      </h1>

      {/* ✅ Mobile: Horizontal Scroll | ✅ Desktop: Grid */}
      <div
        className="
          flex gap-6 overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 scrollbar-hide
        "
      >
        {organizers.map((organizer, index) => (
          <div
            key={index}
            className="
              bg-white shadow-lg p-6 flex flex-col items-center text-center
              min-w-[250px] sm:min-w-0
            "
          >
            {/* Logo */}
            <img
              src={organizer.logo}
              alt={`${organizer.name} logo`}
              className="w-24 h-24 mb-4 border-2 border-gray-200 object-cover"
            />

            {/* Name */}
            <h2 className="text-md font-semibold text-gray-800 mb-2 hover:underline">
              {organizer.name}
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {organizer.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
              <span>
                <span className="font-semibold text-gray-800">
                  {organizer.followers}
                </span>{" "}
                Followers
              </span>
              <span>|</span>
              <span>
                <span className="font-semibold text-gray-800">
                  {organizer.events}
                </span>{" "}
                Events
              </span>
            </div>

            {/* Follow Button */}
            <button className="w-[70%] py-1 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizersList;
