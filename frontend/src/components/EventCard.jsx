
// import React, { useEffect , useContext } from "react";
// import { MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import dp from "../assets/dp.jpeg";
// import axios from "axios";
// import { EventContext } from "../context/EventContext";

// const EventCard = ({ event = {} }) => {
//   const navigate = useNavigate();
//   const {
//     _id,
//     banner,
//     imageUrl,
//     name,
//     venueCity,
//     description,
//     listingType,
//   } = event;

//   const { events, setEvents } = useContext(EventContext);

//   const displayImage = imageUrl || banner || dp;

//   const handleCardClick = () => {
//     navigate(`/event/${_id}`);
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const res = await axios.get("https://events-backend2-nwra.onrender.com/api/events");
//       const publishedEvents = res.data.filter(event => event.isPublished);
//       setEvents(publishedEvents);
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <>
//       <div
//         onClick={handleCardClick}
//         className="bg-white w-[300px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
//       >
//         <div className="h-48 bg-gray-200 flex items-center justify-center">
//           <img
//             src={displayImage}
//             alt={name || "Untitled Event"}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         <div className="p-4">
//           <h3 className="text-lg font-semibold text-gray-800 truncate">
//             {name || "Untitled Event"}
//           </h3>

//           <div className="flex items-center text-sm text-gray-500 mt-1">
//             <MapPin className="w-4 h-4 mr-1" />
//             {venueCity || "Location not set"}
//           </div>

//           <p className="mt-3 text-gray-600 text-sm line-clamp-2">
//             {description || "No description provided"}
//           </p>

//           <div className="mt-4">
//             <span
//               className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
//                 listingType === "Public"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-yellow-100 text-yellow-700"
//               }`}
//             >
//               {listingType || "Public"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventCard;


import React, { useEffect , useContext } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.jpeg";
import axios from "axios";
import { EventContext } from "../context/EventContext";

const EventCard = ({ event = {} }) => {
  const navigate = useNavigate();
  const {
    _id,
    banner,
    imageUrl,
    name,
    venueCity,
    description,
    listingType,
  } = event;

  const { events, setEvents } = useContext(EventContext);

  const displayImage = imageUrl || banner || dp;

  const handleCardClick = () => {
    navigate(`/event/${_id}`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      // const res = await axios.get("http://localhost:5000/api/events");
       const res = await axios.get("https://events-backend2-nwra.onrender.com/api/events");
      const publishedEvents = res.data.filter(event => event.isPublished);
      setEvents(publishedEvents);
    };
    fetchEvents();
  }, []);

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white w-[300px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <img
            src={displayImage}
            alt={name || "Untitled Event"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name || "Untitled Event"}
          </h3>

          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {venueCity || "Location not set"}
          </div>

          <p className="mt-3 text-gray-600 text-sm line-clamp-2">
            {description || "No description provided"}
          </p>

          <div className="mt-4">
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                listingType === "Public"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {listingType || "Public"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;








// import React from "react";
// import { MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import dp from "../assets/dp.jpeg";

// const EventCard = ({ event = {} }) => {
//   const navigate = useNavigate();
//   const { _id, banner, imageUrl, name, venueCity, description, listingType } = event;

//   const displayImage = imageUrl || banner || dp;

//   const handleCardClick = () => {
//     navigate(`/event/${_id}`);
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="bg-white w-[300px] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
//     >
//       <div className="h-48 bg-gray-200 flex items-center justify-center">
//         <img
//           src={displayImage}
//           alt={name || "Untitled Event"}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800 truncate">
//           {name || "Untitled Event"}
//         </h3>

//         <div className="flex items-center text-sm text-gray-500 mt-1">
//           <MapPin className="w-4 h-4 mr-1" />
//           {venueCity || "Location not set"}
//         </div>

//         <p className="mt-3 text-gray-600 text-sm line-clamp-2">
//           {description || "No description provided"}
//         </p>

//         <div className="mt-4">
//           <span
//             className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
//               listingType === "Public"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-yellow-100 text-yellow-700"
//             }`}
//           >
//             {listingType || "Public"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;







