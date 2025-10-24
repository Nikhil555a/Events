
import React from 'react';
import musicImg from "../assets/Music-Events.webp";
import businessImg from "../assets/Business-Events.webp";
import concertImg from "../assets/Concerts-1_1_11zon.webp";
import partiesImg from "../assets/Parties_4_11zon.webp";
import comedyImg from "../assets/Comedy-Shows.webp";
import carftImg from "../assets/Crafts-Events.webp";
import datingImg from "../assets/Dating-Events.webp";
import festivalImg from "../assets/Festivals.webp";
import danceImg from "../assets/Dance-Events.webp";

// Card Component
const Card = ({ imgUrl, bgColor }) => (
  <div
    className="relative w-[150px] h-[100px] sm:w-[190px] sm:h-[120px] rounded-xl overflow-hidden shadow-md flex items-center justify-center
               transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    style={{ background: bgColor }}
  >
    {imgUrl && (
      <img
        src={imgUrl}
        alt="Category"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    )}
  </div>
);

// View All Card
const ViewAllCard = () => (
  <div className="w-[150px] h-[100px] sm:w-[190px] sm:h-[120px] rounded-xl shadow-md bg-gray-100 flex items-center justify-center text-center font-semibold text-gray-700
                   transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
    View All <br /> Categories
  </div>
);

const Categories = () => {
  const categories = [
    { imgUrl: musicImg, bgColor: 'linear-gradient(to right, #eaf9eb, #d1f4d3)' },
    { imgUrl: businessImg, bgColor: 'linear-gradient(to right, #e8f0ff, #c3d9ff)' },
    { imgUrl: concertImg, bgColor: 'linear-gradient(to right, #f2eaff, #e0c8ff)' },
    { imgUrl: partiesImg, bgColor: 'linear-gradient(to right, #fff1e5, #ffdec8)' },
    { imgUrl: comedyImg, bgColor: 'linear-gradient(to right, #f2eefd, #e0d7fa)' },
    { imgUrl: carftImg, bgColor: 'linear-gradient(to right, #e8f9fd, #c8f4ff)' },
    { imgUrl: datingImg, bgColor: 'linear-gradient(to right, #fff4f4, #ffdede)' },
    { imgUrl: festivalImg, bgColor: 'linear-gradient(to right, #f7f1ff, #f0e6ff)' },
    { imgUrl: danceImg, bgColor: 'linear-gradient(to right, #f7e6ff, #f0d0ff)' },
    // View all categories ko dance ke niche laane ke liye ise naye item mein rakhen
    { isViewAll: true }
  ];

  // Mobile ke liye 4-4 ka group (2x2)
  const groups = [];
  for (let i = 0; i < categories.length; i += 4) {
    groups.push(categories.slice(i, i + 4));
  }

  return (
    <div className='w-full max-w-[1200px] mx-auto'>
      <div className="p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Jaipur's Most-Loved
        </h2>

        {/* Mobile: horizontal scroll, 2x2 grid */}
        <div className="sm:hidden flex overflow-x-auto gap-4 pb-3 snap-x snap-mandatory scrollbar-hide">
          {groups.map((group, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 flex-shrink-0 w-[320px] snap-start"
            >
              {group.map((cat, i) =>
                cat.isViewAll ? (
                  <ViewAllCard key={i} />
                ) : (
                  <Card key={i} imgUrl={cat.imgUrl} bgColor={cat.bgColor} />
                )
              )}
            </div>
          ))}
        </div>

        {/* Desktop: 5-5 equal rows */}
        <div className="hidden sm:grid sm:grid-cols-5 sm:gap-5">
          {categories.map((cat, i) =>
            cat.isViewAll ? (
              <ViewAllCard key={i} />
            ) : (
              <Card key={i} imgUrl={cat.imgUrl} bgColor={cat.bgColor} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;









