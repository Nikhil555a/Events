
// import React, { useState, useEffect, useContext } from "react";
// import { EventContext } from "../context/EventContext";
// import {
//   ChevronLeft, MoreVertical, Settings, Calendar, Plus, Headset, ChevronDown,
//   Briefcase, Ticket, Send, Zap
// } from 'lucide-react';
// import EventFormPage from './EventFormPage';
// import EventMedia from "../components/EventMedia";
// import AddTicket from "../components/AddTicket";
// import EventPublish from "../components/EventPublish";
// import { formatEventDate } from "../utils/formatDate"; // ✅ helper import

// const EventEditForm = () => {
//   const { banner, setBanner, bannerPreview, setBannerPreview, events, fetchEvents } = useContext(EventContext);
//   const [activeSection, setActiveSection] = useState('Media');
 

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchEvents();
//     };
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (events.length > 0) {
//       const currentEvent = events[0];
//       const eventId = currentEvent._id || "temp";
//       localStorage.setItem("currentEventId", eventId);

//       const savedBanner = localStorage.getItem(`eventBanner_${eventId}`);
//       if (savedBanner) setBannerPreview(savedBanner);
//     } else {
//       localStorage.removeItem("currentEventId");
//       setBanner(null);
//       setBannerPreview(null);
//     }
//   }, [events]);

//   const handleSaveNext = () => {
//     console.log("Banner file:", banner);
//     console.log("Preview URL:", bannerPreview);
//     alert("Event saved successfully!");
//   };

//   const renderMainContent = () => {
//     if (activeSection === 'Basic Info') {
//       const selectedEvent = events[0] || {};
//       return <EventFormPage videoPlacement="none" prefill={selectedEvent} showSidebarVideo={false} />;
//     }
//   };

//   const renderMedia = () => {
//     if (activeSection === 'Media') {
//       return (
//         <>
//           <EventMedia
//             banner={banner}
//             setBanner={setBanner}
//             bannerPreview={bannerPreview}
//             setBannerPreview={setBannerPreview}
//           />
//           {/* <div className="flex justify-end mt-8">
//             <button
//               onClick={handleSaveNext}
//               className="flex items-center px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition duration-150 ease-in-out"
//             >
//               Save & Next
//             </button>
//           </div> */}
//         </>
//       );
//     }
//     return null;
//   };

//   // const renderTicket = () => activeSection === 'Tickets' ? <AddTicket /> : null;
//    const renderTicket = () => {
//     if (activeSection === 'Tickets') {
//       return <AddTicket />
//     }
//     return null;
//   }
//   const renderPublish = () =>
//     activeSection === "Publish" ? (
//       <EventPublish
//         banner={banner}
//         setBanner={setBanner}
//         bannerPreview={bannerPreview}
//         setBannerPreview={setBannerPreview}
//       />
//     ) : null;

//   const navItems = [
//     { name: 'Basic Info', icon: Briefcase },
//     { name: 'Media', icon: Calendar },
//     { name: 'Tickets', icon: Ticket },
//     { name: 'Publish', icon: Send },
//   ];

//   // ✅ Month and Day calculation (Dynamic from startDate)
//   const eventDate = events[0]?.startDate ? new Date(events[0].startDate) : null;
//   const month = eventDate
//     ? eventDate.toLocaleString("en-US", { month: "short" }).toUpperCase()
//     : "MON";
//   const day = eventDate
//     ? String(eventDate.getDate()).padStart(2, "0")
//     : "00";

//   return (
//     <>
//       {/* ---------- HEADER ---------- */}
//       <header className="sticky top-0 bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-20 border-b border-gray-100">
//         <div className="flex items-center">
//           <svg width="24" height="24" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6'>
//             <circle cx="27" cy="27" r="27" fill="#00BCD4" />
//             <text x="13" y="37" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">ae</text>
//           </svg>
//           <span className="font-semibold text-xl text-gray-800 ml-2">allevents</span>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="flex items-center text-gray-600 hover:text-gray-800 text-base font-medium">
//             <Plus className="w-4 h-4 mr-1" /> Create Event
//           </button>
//           <Headset className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
//           <div className="relative cursor-pointer">
//             <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-700/80">
//               <Zap className="w-3 h-3 text-white" />
//             </div>
//             <ChevronDown className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
//           </div>
//         </div>
//       </header>

//       {/* ---------- BODY ---------- */}
//       <div className="flex h-screen bg-gray-50 font-sans w-full overflow-hidden">
//         {/* ---------- LEFT SIDEBAR ---------- */}
//         <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col shadow-lg z-20">
//           <div className="p-4 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer text-sm border-b border-gray-200">
//             <ChevronLeft className="w-4 h-4 mr-2" />
//             <span>Page Dashboard</span>
//           </div>

//           <div className="p-4 border-b border-gray-200">
//             <div className="bg-green-100 rounded-lg p-3 shadow-md relative overflow-hidden">
//               {bannerPreview ? (
//                 <img src={bannerPreview} alt="Event Banner" className="rounded-lg mb-2 h-28 w-full object-cover" />
//               ) : (
//                 <div className="h-28 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-gray-400 text-sm">
//                   No Banner Uploaded
//                 </div>
//               )}

//               {/* ✅ Dynamic Month & Day */}
//               <div className="absolute top-0 left-0 bg-green-500 text-white font-bold p-2 text-center rounded-br-lg text-sm leading-none">
//                 <span className="block text-lg">{month}</span>
//                 <span className="block text-xs">{day}</span>
//               </div>

//               <div className="pt-10">
//                 <p className="text-xs text-gray-500">
//                   {events[0]?.startDate ? formatEventDate(events[0].startDate) : "DATE NOT SET"}
//                 </p>
//                 <p className="font-semibold text-gray-800 mt-1">{events[0]?.name || "Untitled Event"}</p>
//                 <p className="text-sm text-gray-600">{events[0]?.venueCity || "Location"}</p>
//                 <span className="inline-block mt-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
//                   Draft
//                 </span>
//               </div>

//               <MoreVertical className="absolute top-2 right-2 w-5 h-5 text-gray-600 cursor-pointer" />
//             </div>
//           </div>

//           <div className="flex-grow">
//             <nav className="text-sm">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = activeSection === item.name;
//                 return (
//                   <a
//                     key={item.name}
//                     href="#"
//                     onClick={(e) => { e.preventDefault(); setActiveSection(item.name); }}
//                     className={`flex items-center py-3 pl-8 cursor-pointer transition duration-100 
//                       ${isActive
//                         ? 'bg-pink-50 text-pink-600 font-semibold border-l-4 border-pink-600'
//                         : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
//                       }`}
//                   >
//                     <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-pink-600' : 'text-gray-400'}`} />
//                     {item.name}
//                   </a>
//                 );
//               })}
//             </nav>
//           </div>

//           <div className="p-4 border-t border-gray-200">
//             <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-800">
//               <Settings className="w-5 h-5 mr-2" />
//               Event Dashboard
//             </a>
//           </div>
//         </div>

//         {/* ---------- MAIN CONTENT ---------- */}
//         <div className="flex-1 overflow-y-auto p-8 relative">
//           {renderMainContent()}
//           {renderMedia()}
//           {renderTicket()}
//           {renderPublish()}
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventEditForm;


import React, { useState, useEffect, useContext } from "react";
import { EventContext } from "../context/EventContext";
import {
  ChevronLeft, MoreVertical, Settings, Calendar, Plus, Headset, ChevronDown,
  Briefcase, Ticket, Send, Zap
} from 'lucide-react';
import EventFormPage from './EventFormPage';
import EventMedia from "../components/EventMedia";
import AddTicket from "../components/AddTicket";
import EventPublish from "../components/EventPublish";
import { formatEventDate } from "../utils/formatDate"; // ✅ helper import

const EventEditForm = () => {
  const { banner, setBanner, bannerPreview, setBannerPreview, events, fetchEvents } = useContext(EventContext);
  const [activeSection, setActiveSection] = useState('Media');
 

  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const currentEvent = events[0];
      const eventId = currentEvent._id || "temp";
      localStorage.setItem("currentEventId", eventId);

      // const savedBanner = localStorage.getItem(`eventBanner_${eventId}`);
      // if (savedBanner) setBannerPreview(savedBanner);
    } else {
      localStorage.removeItem("currentEventId");
      setBanner(null);
      setBannerPreview(null);
    }
  }, [events]);

  const handleSaveNext = () => {
    console.log("Banner file:", banner);
    console.log("Preview URL:", bannerPreview);
    alert("Event saved successfully!");
  };

  const renderMainContent = () => {
    if (activeSection === 'Basic Info') {
      const selectedEvent = events[0] || {};
      return <EventFormPage videoPlacement="none" prefill={selectedEvent} showSidebarVideo={false} />;
    }
  };

  const renderMedia = () => {
    if (activeSection === 'Media') {
      return (
        <>
          <EventMedia
            banner={banner}
            setBanner={setBanner}
            bannerPreview={bannerPreview}
            setBannerPreview={setBannerPreview}
            onNext={() => setActiveSection('Tickets')} // ✅ move to Tickets
          />
          {/* <div className="flex justify-end mt-8">
            <button
              onClick={handleSaveNext}
              className="flex items-center px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              Save & Next
            </button>
          </div> */}
        </>
      );
    }
    return null;
  };

  // const renderTicket = () => activeSection === 'Tickets' ? <AddTicket /> : null;
   const renderTicket = () => {
    if (activeSection === 'Tickets') {
      // return <AddTicket />
          return <AddTicket
           onNext={() => setActiveSection('Publish')} />;
    }
    return null;
  }
  const renderPublish = () =>
    activeSection === "Publish" ? (
      <EventPublish
        banner={banner}
        setBanner={setBanner}
        bannerPreview={bannerPreview}
        setBannerPreview={setBannerPreview}
      />
    ) : null;

  const navItems = [
    { name: 'Basic Info', icon: Briefcase },
    { name: 'Media', icon: Calendar },
    { name: 'Tickets', icon: Ticket },
    { name: 'Publish', icon: Send },
  ];

  // ✅ Month and Day calculation (Dynamic from startDate)
  const eventDate = events[0]?.startDate ? new Date(events[0].startDate) : null;
  const month = eventDate
    ? eventDate.toLocaleString("en-US", { month: "short" }).toUpperCase()
    : "MON";
  const day = eventDate
    ? String(eventDate.getDate()).padStart(2, "0")
    : "00";

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <header className="sticky top-0 bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-20 border-b border-gray-100">
        <div className="flex items-center">
          <svg width="24" height="24" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6'>
            <circle cx="27" cy="27" r="27" fill="#00BCD4" />
            <text x="13" y="37" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">ae</text>
          </svg>
          <span className="font-semibold text-xl text-gray-800 ml-2">allevents</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-gray-800 text-base font-medium">
            <Plus className="w-4 h-4 mr-1" /> Create Event
          </button>
          <Headset className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
          <div className="relative cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-700/80">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <ChevronDown className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
          </div>
        </div>
      </header>

      {/* ---------- BODY ---------- */}
      <div className="flex h-screen bg-gray-50 font-sans w-full overflow-hidden">
        {/* ---------- LEFT SIDEBAR ---------- */}
        <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col shadow-lg z-20">
          <div className="p-4 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer text-sm border-b border-gray-200">
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Page Dashboard</span>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="bg-green-100 rounded-lg p-3 shadow-md relative overflow-hidden">
              {bannerPreview ? (
                <img src={bannerPreview} alt="Event Banner" className="rounded-lg mb-2 h-28 w-full object-cover" />
              ) : (
                <div className="h-28 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-gray-400 text-sm">
                  No Banner Uploaded
                </div>
              )}

              {/* ✅ Dynamic Month & Day */}
              <div className="absolute top-0 left-0 bg-green-500 text-white font-bold p-2 text-center rounded-br-lg text-sm leading-none">
                <span className="block text-lg">{month}</span>
                <span className="block text-xs">{day}</span>
              </div>

              <div className="pt-10">
                <p className="text-xs text-gray-500">
                  {events[0]?.startDate ? formatEventDate(events[0].startDate) : "DATE NOT SET"}
                </p>
                <p className="font-semibold text-gray-800 mt-1">{events[0]?.name || "Untitled Event"}</p>
                <p className="text-sm text-gray-600">{events[0]?.venueCity || "Location"}</p>
                <span className="inline-block mt-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  Draft
                </span>
              </div>

              <MoreVertical className="absolute top-2 right-2 w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
          </div>

          <div className="flex-grow">
            <nav className="text-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.name;
                return (
                  <a
                    key={item.name}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveSection(item.name); }}
                    className={`flex items-center py-4 pl-8 cursor-pointer transition duration-100 
                      ${isActive
                        ? 'bg-pink-50 text-pink-600 font-semibold border-l-4 border-pink-600'
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-pink-600' : 'text-gray-400'}`} />
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-800">
              <Settings className="w-5 h-5 mr-2" />
              Event Dashboard
            </a>
          </div>
        </div>

        {/* ---------- MAIN CONTENT ---------- */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {renderMainContent()}
          {renderMedia()}
          {renderTicket()}
          {renderPublish()}
        </div>
      </div>
    </>
  );
};

export default EventEditForm;




