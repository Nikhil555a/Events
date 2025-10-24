
import React from 'react';
import calendarIcon from '../assets/calendar_icon.webp'; 

const DateCard = ({ title, subtitle, icon }) => {
  return (
    <div className="flex-none flex items-center p-4 border border-gray-300 rounded-lg shadow-sm w-48 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex-grow ">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <img src={icon} alt="calendar icon" className="w-11 h-11 ml-4" />
    </div>
  );
};

const Date = () => {
  const dates = [
    { title: 'Today', subtitle: 'Sep 19' },
    { title: 'Tomorrow', subtitle: 'Sep 20' },
    { title: 'This Weekend', subtitle: 'Sep 20 - 21' },
    { title: 'This Week', subtitle: 'Sep 15 - 21' },
    { title: 'Custom Date', subtitle: 'Pick Range' }
  ];

  return (
    
    <div className="w-full gap-0 ">
      <h2 className="text-2xl sm:text-3xl  font-bold text-gray-800 mb-6 pl-4 lg:pl-0">
        Explore events by date
      </h2>

      {/* ✅ Mobile -> horizontal scroll | ✅ Desktop -> normal flex center */}
      <div className="flex gap-3 overflow-x-auto sm:overflow-visible justify-between scrollbar-hide">
        {dates.map((date, index) => (
          <DateCard
            key={index}
            title={date.title}
            subtitle={date.subtitle}
            icon={calendarIcon}
          />
        ))}
      </div>
   </div>
   
  );
};

export default Date;
