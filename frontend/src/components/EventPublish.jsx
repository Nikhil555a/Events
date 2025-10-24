
import React, { useState, useContext } from "react";
import axios from "axios";
import { ChevronDown, Check, Info } from "lucide-react";
import { EventContext } from "../context/EventContext";
import { formatEventDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/Authcontext";

const EventPublish = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
  const { events } = useContext(EventContext);
  const currentEvent = events[0] || {};
  const navigate = useNavigate();
  const { user } = useContext(authDataContext);

  const [listingType, setListingType] = useState("Public");
  const [notificationType, setNotificationType] = useState("Now");
  const [allowDiscussions, setAllowDiscussions] = useState(true);
  const [category, setCategory] = useState(currentEvent.category || "");
  const [eventType, setEventType] = useState(currentEvent.eventType || "");
  const [loading, setLoading] = useState(false);

  const [organizerPage, setOrganizerPage] = useState(
    user ? `${user.firstName} ${user.lastName} ${user.email}` : "Guest User"
  );

  // ✅ Updated Publish API (with isPublished flag)
  const handlePublish = async () => {
    try {
      if (!banner) {
        alert("Please upload a banner before publishing!");
        return;
      }

      if (!currentEvent._id) {
        alert("❌ Missing event ID — please complete event creation first!");
        return;
      }

      setLoading(true);

      // ✅ Step 1: Upload publish data (banner + details)
      const formData = new FormData();
      formData.append("banner", banner);
      formData.append("title", currentEvent.name || eventType || "Untitled Event");
      formData.append("location", currentEvent.venueCity || "Unknown Location");
      formData.append("category", category || "General");
      formData.append("listingType", listingType);
      formData.append("notificationType", notificationType);
      formData.append("allowDiscussions", allowDiscussions);
      formData.append("organizerName", user ? `${user.firstName} ${user.lastName}` : "Guest User");
      formData.append("startDate", currentEvent.startDate || "");
      formData.append("startTime", currentEvent.startTime || "");
       formData.append("eventId", currentEvent._id); // ✅ FIXED

      await axios.post("http://localhost:5000/api/publish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Step 2: Mark event as published (update existing event)
      await axios.put(`http://localhost:5000/api/events/${currentEvent._id}`, {
        isPublished: true,
      });

      alert("✅ Event published successfully!");
      navigate("/"); // redirect to home or event list page
    } catch (error) {
      console.error("❌ Publish Error:", error);
      alert("Failed to publish event!");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Common Button Styles
  const baseButtonClass = "px-6 py-2 border rounded-lg transition-all duration-200 font-medium";
  const publicButtonClass =
    listingType === "Public"
      ? `${baseButtonClass} bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500`
      : `${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50`;
  const privateButtonClass =
    listingType === "Private"
      ? `${baseButtonClass} bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500`
      : `${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50`;

  const baseRadioClass = "flex items-center text-sm mr-6";
  const radioDotClass = (current) =>
    `w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
      notificationType === current ? "border-blue-600" : "border-gray-400"
    }`;
  const innerDotClass = (current) =>
    `w-2 h-2 rounded-full ${notificationType === current ? "bg-blue-600" : "bg-transparent"}`;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Your event is almost ready to publish
        </h1>
        <p className="text-gray-600 mb-8">
          Review your settings and let everyone find your event.
        </p>

        <div className="flex space-x-10">
          {/* Left Form */}
          <div className="flex-1 space-y-8">
            {/* Event Type */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event type
                </label>
                <div className="relative">
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                  >
                    <option value="">Select an Event Type</option>
                    <option value="Music">Music</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Festival">Festival</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                  >
                    <option value="">Select category</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Education">Education</option>
                    <option value="Technology">Technology</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Listing Type */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-3">
                Listing type*
              </label>
              <div className="flex space-x-4">
                <button className={publicButtonClass} onClick={() => setListingType("Public")}>
                  Public {listingType === "Public" && <Check className="w-4 h-4 inline ml-2" />}
                </button>
                <button className={privateButtonClass} onClick={() => setListingType("Private")}>
                  Private {listingType === "Private" && <Check className="w-4 h-4 inline ml-2" />}
                </button>
              </div>
            </div>

            {/* Notification */}
            {listingType === "Public" && (
              <div>
                <p className="block text-base font-medium text-gray-700 mb-3">
                  Choose when to notify your subscribers:
                </p>
                <div className="flex">
                  {["Now", "Schedule", "Don't Notify"].map((type) => (
                    <label key={type} className={baseRadioClass}>
                      <input
                        type="radio"
                        name="notification"
                        value={type}
                        checked={notificationType === type}
                        onChange={() => setNotificationType(type)}
                        className="hidden"
                      />
                      <div className={radioDotClass(type)}>
                        <div className={innerDotClass(type)}></div>
                      </div>
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Discussion Toggle */}
            <div className="flex items-center justify-between py-2 border-t border-gray-200 pt-8">
              <label className="text-base font-medium text-gray-700 flex items-center">
                Allow discussions on your event <Info className="w-4 h-4 ml-2 text-gray-400" />
              </label>
              <Switch checked={allowDiscussions} onChange={setAllowDiscussions} />
            </div>

            {/* Organizer */}
            <div className="organizer-section border-2 border-gray-400 p-2">
              <label>Organizer:</label>
              <span className="text-gray-700 text-base flex-1 truncate pl-2">
                {user ? `${user.firstName} ${user.lastName}` : organizerPage}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-8 mt-10 border-t border-gray-200">
              <button className="px-6 py-2 mr-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Save as draft
              </button>
              <button
                onClick={handlePublish}
                disabled={loading}
                className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-md ${
                  loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>

          {/* Right Preview */}
          <div className="w-full max-w-xs pt-[125px]">
            <EventPreview
              bannerPreview={bannerPreview}
              title={currentEvent.name}
              location={currentEvent.venueCity}
              startDate={currentEvent.startDate}
              startTime={currentEvent.startTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Switch component
const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
      checked ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// ✅ Preview component
const EventPreview = ({ bannerPreview, title, location, startDate, startTime }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-xs sticky top-4">
    <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
      {bannerPreview ? (
        <img src={bannerPreview} alt="Banner" className="h-32 w-full object-cover rounded-md" />
      ) : (
        "No Banner"
      )}
    </div>
    <p className="text-xs text-gray-500">{startDate ? formatEventDate(startDate) : "DATE NOT SET"}</p>
    <h3 className="text-lg font-semibold text-gray-800 break-words">
      {title || "Untitled Event"}
    </h3>
    <p className="text-sm text-gray-600">{location || "Location not set"}</p>
  </div>
);

export default EventPublish;




// 99%
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ChevronDown, Check, Info } from "lucide-react";
// import { EventContext } from "../context/EventContext";
// import { formatEventDate } from "../utils/formatDate";
// import SuccessPopup from "../components/SuccessPopup";
// import EventCard from "./EventCard";


// const EventPublish = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
//   const { events } = useContext(EventContext);
//   const currentEvent = events[0] || {};
//   const navigate = useNavigate();

//   const [listingType, setListingType] = useState("Public");
//   const [notificationType, setNotificationType] = useState("Now");
//   const [allowDiscussions, setAllowDiscussions] = useState(true);
//   const [category, setCategory] = useState(currentEvent.category || "");
//   const [eventType, setEventType] = useState(currentEvent.eventType || "");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [publishedEvent, setPublishedEvent] = useState(null);

//   // ✅ Publish API
//   const handlePublish = async () => {
//     try {
//       if (!banner) {
//         alert("Please upload a banner before publishing!");
//         return;
//       }

//       setLoading(true);
//       const formData = new FormData();
//       formData.append("banner", banner);
//       formData.append("title", currentEvent.name || eventType || "Untitled Event");
//       formData.append("location", currentEvent.venueCity || "Unknown Location");
//       formData.append("category", category || "General");
//       formData.append("listingType", listingType);
//       formData.append("notificationType", notificationType);
//       formData.append("allowDiscussions", allowDiscussions);
//       formData.append("startDate", currentEvent.startDate || "");
//       formData.append("startTime", currentEvent.startTime || "");

//       const res = await axios.post("http://localhost:5000/api/publish", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("✅ Publish Response:", res.data);
//       setPublishedEvent({
//         image: bannerPreview,
//         name: currentEvent.name,
//         location: currentEvent.venueCity,
//         description: res.data.description || "Event successfully published!",
//         date: currentEvent.startDate,
//       });

//       // Show Success Popup
//       setShowSuccess(true);

//       // Auto navigate after delay
//       setTimeout(() => {
//         navigate("/");
        

//       }, 5000);
//     } catch (error) {
//       console.error("❌ Publish Error:", error);
//       alert("Failed to publish event!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const baseButtonClass = "px-6 py-2 border rounded-lg transition-all duration-200 font-medium";
//   const publicButtonClass =
//     listingType === "Public"
//       ? `${baseButtonClass} bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500`
//       : `${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50`;
//   const privateButtonClass =
//     listingType === "Private"
//       ? `${baseButtonClass} bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500`
//       : `${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50`;

//   const baseRadioClass = "flex items-center text-sm mr-6";
//   const radioDotClass = (current) =>
//     `w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
//       notificationType === current ? "border-blue-600" : "border-gray-400"
//     }`;
//   const innerDotClass = (current) =>
//     `w-2 h-2 rounded-full ${notificationType === current ? "bg-blue-600" : "bg-transparent"}`;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Your event is almost ready to publish
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Review your settings and let everyone find your event.
//         </p>

//         <div className="flex space-x-10">
//           {/* Left Form */}
//           <div className="flex-1 space-y-8">
//             {/* Event Type */}
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event type
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={eventType}
//                     onChange={(e) => setEventType(e.target.value)}
//                     className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                   >
//                     <option value="">Select an Event Type</option>
//                     <option value="Music">Music</option>
//                     <option value="Workshop">Workshop</option>
//                     <option value="Festival">Festival</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event category
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                   >
//                     <option value="">Select category</option>
//                     <option value="Entertainment">Entertainment</option>
//                     <option value="Education">Education</option>
//                     <option value="Technology">Technology</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Listing Type */}
//             <div>
//               <label className="block text-base font-medium text-gray-700 mb-3">
//                 Listing type*
//               </label>
//               <div className="flex space-x-4">
//                 <button className={publicButtonClass} onClick={() => setListingType("Public")}>
//                   Public {listingType === "Public" && <Check className="w-4 h-4 inline ml-2" />}
//                 </button>
//                 <button className={privateButtonClass} onClick={() => setListingType("Private")}>
//                   Private {listingType === "Private" && <Check className="w-4 h-4 inline ml-2" />}
//                 </button>
//               </div>
//             </div>

//             {/* Notification Section */}
//             {listingType === "Public" && (
//               <div>
//                 <p className="block text-base font-medium text-gray-700 mb-3">
//                   Choose when to notify your subscribers:
//                 </p>
//                 <div className="flex">
//                   {["Now", "Schedule", "Don't Notify"].map((type) => (
//                     <label key={type} className={baseRadioClass}>
//                       <input
//                         type="radio"
//                         name="notification"
//                         value={type}
//                         checked={notificationType === type}
//                         onChange={() => setNotificationType(type)}
//                         className="hidden"
//                       />
//                       <div className={radioDotClass(type)}>
//                         <div className={innerDotClass(type)}></div>
//                       </div>
//                       {type}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Discussion Toggle */}
//             <div className="flex items-center justify-between py-2 border-t border-gray-200 pt-8">
//               <label htmlFor="allow-discussions" className="text-base font-medium text-gray-700 flex items-center">
//                 Allow discussions on your event <Info className="w-4 h-4 ml-2 text-gray-400" />
//               </label>
//               <Switch checked={allowDiscussions} onChange={setAllowDiscussions} />
//             </div>

//             {/* Save / Publish Buttons */}
//             <div className="flex justify-end pt-8 mt-10 border-t border-gray-200">
//               <button className="px-6 py-2 mr-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
//                 Save as draft
//               </button>
//               <button
//                 onClick={handlePublish}
//                 disabled={loading}
//                 className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-md ${
//                   loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//                 }`}
//               >
//                 {loading ? "Publishing..." : "Publish"}
//               </button>
//             </div>
//           </div>

//           {/* Right Preview */}
//           <div className="w-full max-w-xs pt-[125px]">
//             <EventPreview
//               bannerPreview={bannerPreview}
//               title={currentEvent.name}
//               location={currentEvent.venueCity}
//               startDate={currentEvent.startDate}
//               startTime={currentEvent.startTime}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ✅ Success Popup */}
//       {showSuccess && publishedEvent && (
//         <SuccessPopup event={publishedEvent} onClose={() => setShowSuccess(false)} />
//       )}
      

//     </div>
//   );
// };

// // ✅ Switch Component
// const Switch = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
//       checked ? "bg-blue-600" : "bg-gray-200"
//     }`}
//     role="switch"
//     aria-checked={checked}
//   >
//     <span
//       aria-hidden="true"
//       className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
//         checked ? "translate-x-5" : "translate-x-0"
//       }`}
//     />
//   </button>
// );

// // ✅ Event Preview Component
// const EventPreview = ({ bannerPreview, title, location, startDate, startTime }) => (
//   <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-xs sticky top-4">
//     <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
//       {bannerPreview ? <img src={bannerPreview} alt="Banner" className="h-32 w-full object-cover rounded-md" /> : "No Banner"}
//     </div>
//     <p className="text-xs text-gray-500">
//       {startDate ? formatEventDate(startDate) : "DATE NOT SET"}
//     </p>
//     <h3 className="text-lg font-semibold text-gray-800 break-words">{title || "Untitled Event"}</h3>
//     <p className="text-sm text-gray-600">{location || "Location not set"}</p>
//   </div>
// );

// export default EventPublish;

// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ChevronDown, Check, Info } from "lucide-react";
// import { EventContext } from "../context/EventContext";
// import { formatEventDate } from "../utils/formatDate";
// import SuccessPopup from "../components/SuccessPopup";
// import EventCard from "./EventCard";

// const EventPublish = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
//   const { events } = useContext(EventContext);
//   const currentEvent = events[0] || {};
//   const navigate = useNavigate();

//   const [listingType, setListingType] = useState("Public");
//   const [notificationType, setNotificationType] = useState("Now");
//   const [allowDiscussions, setAllowDiscussions] = useState(true);
//   const [category, setCategory] = useState(currentEvent.category || "");
//   const [eventType, setEventType] = useState(currentEvent.eventType || "");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [publishedEvent, setPublishedEvent] = useState(null);
//   const [publishedEvents, setPublishedEvents] = useState([]); // ✅ Added

//   // ✅ Publish API
//   const handlePublish = async () => {
//     try {
//       if (!banner) {
//         alert("Please upload a banner before publishing!");
//         return;
//       }

//       setLoading(true);
//       const formData = new FormData();
//       formData.append("banner", banner);
//       formData.append("title", currentEvent.name || eventType || "Untitled Event");
//       formData.append("location", currentEvent.venueCity || "Unknown Location");
//       formData.append("category", category || "General");
//       formData.append("listingType", listingType);
//       formData.append("notificationType", notificationType);
//       formData.append("allowDiscussions", allowDiscussions);
//       formData.append("startDate", currentEvent.startDate || "");
//       formData.append("startTime", currentEvent.startTime || "");

//       const res = await axios.post("http://localhost:5000/api/publish", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("✅ Publish Response:", res.data);

//       const newEvent = {
//         image: bannerPreview,
//         name: currentEvent.name,
//         location: currentEvent.venueCity,
//         description: res.data.description || "Event successfully published!",
//         date: currentEvent.startDate,
//       };

//       // ✅ Add new published event to list
//       setPublishedEvents((prev) => [...prev, newEvent]);
//       //  navigate("/")
//       // ✅ Show success popup
//       setPublishedEvent(newEvent);
//       setShowSuccess(true);
//     } catch (error) {
//       console.error("❌ Publish Error:", error);
//       alert("Failed to publish event!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const baseButtonClass =
//     "px-6 py-2 border rounded-lg transition-all duration-200 font-medium";
//   const publicButtonClass =
//     listingType === "Public"
//       ? `${baseButtonClass} bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500`
//       : `${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50`;
//   const privateButtonClass =
//     listingType === "Private"
//       ? `${baseButtonClass} bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500`
//       : `${baseButtonClass} border-gray-300 text-gray-700 hover:bg-gray-50`;

//   const baseRadioClass = "flex items-center text-sm mr-6";
//   const radioDotClass = (current) =>
//     `w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
//       notificationType === current ? "border-blue-600" : "border-gray-400"
//     }`;
//   const innerDotClass = (current) =>
//     `w-2 h-2 rounded-full ${
//       notificationType === current ? "bg-blue-600" : "bg-transparent"
//     }`;

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Your event is almost ready to publish
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Review your settings and let everyone find your event.
//         </p>

//         <div className="flex space-x-10">
//           {/* Left Form */}
//           <div className="flex-1 space-y-8">
//             {/* Event Type */}
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event type
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={eventType}
//                     onChange={(e) => setEventType(e.target.value)}
//                     className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                   >
//                     <option value="">Select an Event Type</option>
//                     <option value="Music">Music</option>
//                     <option value="Workshop">Workshop</option>
//                     <option value="Festival">Festival</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event category
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                   >
//                     <option value="">Select category</option>
//                     <option value="Entertainment">Entertainment</option>
//                     <option value="Education">Education</option>
//                     <option value="Technology">Technology</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Listing Type */}
//             <div>
//               <label className="block text-base font-medium text-gray-700 mb-3">
//                 Listing type*
//               </label>
//               <div className="flex space-x-4">
//                 <button
//                   className={publicButtonClass}
//                   onClick={() => setListingType("Public")}
//                 >
//                   Public{" "}
//                   {listingType === "Public" && (
//                     <Check className="w-4 h-4 inline ml-2" />
//                   )}
//                 </button>
//                 <button
//                   className={privateButtonClass}
//                   onClick={() => setListingType("Private")}
//                 >
//                   Private{" "}
//                   {listingType === "Private" && (
//                     <Check className="w-4 h-4 inline ml-2" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Notification Section */}
//             {listingType === "Public" && (
//               <div>
//                 <p className="block text-base font-medium text-gray-700 mb-3">
//                   Choose when to notify your subscribers:
//                 </p>
//                 <div className="flex">
//                   {["Now", "Schedule", "Don't Notify"].map((type) => (
//                     <label key={type} className={baseRadioClass}>
//                       <input
//                         type="radio"
//                         name="notification"
//                         value={type}
//                         checked={notificationType === type}
//                         onChange={() => setNotificationType(type)}
//                         className="hidden"
//                       />
//                       <div className={radioDotClass(type)}>
//                         <div className={innerDotClass(type)}></div>
//                       </div>
//                       {type}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Discussion Toggle */}
//             <div className="flex items-center justify-between py-2 border-t border-gray-200 pt-8">
//               <label
//                 htmlFor="allow-discussions"
//                 className="text-base font-medium text-gray-700 flex items-center"
//               >
//                 Allow discussions on your event{" "}
//                 <Info className="w-4 h-4 ml-2 text-gray-400" />
//               </label>
//               <Switch checked={allowDiscussions} onChange={setAllowDiscussions} />
//             </div>

//             {/* Save / Publish Buttons */}
//             <div className="flex justify-end pt-8 mt-10 border-t border-gray-200">
//               <button className="px-6 py-2 mr-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
//                 Save as draft
//               </button>
//               <button
//                 onClick={handlePublish}
//                 disabled={loading}
//                 className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-md ${
//                   loading
//                     ? "bg-blue-300 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600"
//                 }`}
//               >
//                 {loading ? "Publishing..." : "Publish"}
//               </button>
//             </div>
//           </div>

//           {/* Right Preview */}
//           <div className="w-full max-w-xs pt-[125px]">
//             <EventPreview
//               bannerPreview={bannerPreview}
//               title={currentEvent.name}
//               location={currentEvent.venueCity}
//               startDate={currentEvent.startDate}
//               startTime={currentEvent.startTime}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ✅ Show Published Events */}
//       {publishedEvents.length > 0 && (
//         <div className="max-w-5xl mx-auto mt-10">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Published Events
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {publishedEvents.map((event, index) => (
//               <EventCard key={index} event={event} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ✅ Success Popup */}
//       {showSuccess && publishedEvent && (
//         <SuccessPopup event={publishedEvent} onClose={() => setShowSuccess(false)} />
//       )}
//     </div>
//   );
// };

// // ✅ Switch Component
// const Switch = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
//       checked ? "bg-blue-600" : "bg-gray-200"
//     }`}
//     role="switch"
//     aria-checked={checked}
//   >
//     <span
//       aria-hidden="true"
//       className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
//         checked ? "translate-x-5" : "translate-x-0"
//       }`}
//     />
//   </button>
// );

// // ✅ Event Preview Component
// const EventPreview = ({ bannerPreview, title, location, startDate, startTime }) => (
//   <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-xs sticky top-4">
//     <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
//       {bannerPreview ? (
//         <img
//           src={bannerPreview}
//           alt="Banner"
//           className="h-32 w-full object-cover rounded-md"
//         />
//       ) : (
//         "No Banner"
//       )}
//     </div>
//     <p className="text-xs text-gray-500">
//       {startDate ? formatEventDate(startDate) : "DATE NOT SET"}
//     </p>
//     <h3 className="text-lg font-semibold text-gray-800 break-words">
//       {title || "Untitled Event"}
//     </h3>
//     <p className="text-sm text-gray-600">{location || "Location not set"}</p>
//   </div>
// );

// export default EventPublish;

// sahi hai
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ChevronDown, Check, Info } from "lucide-react";
// import { EventContext } from "../context/EventContext";
// import { formatEventDate } from "../utils/formatDate";
// import SuccessPopup from "../components/SuccessPopup";

// const EventPublish = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
//   const { events, setEvents } = useContext(EventContext);
//   const currentEvent = events[0] || {};
//   const navigate = useNavigate();

//   const [listingType, setListingType] = useState("Public");
//   const [notificationType, setNotificationType] = useState("Now");
//   const [allowDiscussions, setAllowDiscussions] = useState(true);
//   const [category, setCategory] = useState(currentEvent.category || "");
//   const [eventType, setEventType] = useState(currentEvent.eventType || "");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [publishedEvent, setPublishedEvent] = useState(null);

//   // ✅ Handle Publish
//   const handlePublish = async () => {
//     try {
//       if (!banner) {
//         alert("Please upload a banner before publishing!");
//         return;
//       }

//       setLoading(true);

//       const formData = new FormData();
//       formData.append("banner", banner);
//       formData.append("title", currentEvent.name || eventType || "Untitled Event");
//       formData.append("location", currentEvent.venueCity || "Unknown Location");
//       formData.append("category", category || "General");
//       formData.append("listingType", listingType);
//       formData.append("notificationType", notificationType);
//       formData.append("allowDiscussions", allowDiscussions);
//       formData.append("startDate", currentEvent.startDate || "");
//       formData.append("startTime", currentEvent.startTime || "");

//       const res = await axios.post("http://localhost:5000/api/publish", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("✅ Publish Response:", res.data);

//       const newEvent = {
//         image: bannerPreview,
//         name: currentEvent.name,
//         location: currentEvent.venueCity,
//         description: res.data.description || "Event successfully published!",
//         date: currentEvent.startDate,
//       };

//       // ✅ Save globally so EventCard / Home can show it
//       setEvents((prev) => [...prev, newEvent]);

//       // ✅ Show popup
//       setPublishedEvent(newEvent);
//       setShowSuccess(true);

//       // Optionally redirect after few seconds
//       // setTimeout(() => navigate("/"), 2000);
//     } catch (error) {
//       console.error("❌ Publish Error:", error);
//       alert("Failed to publish event!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Your event is almost ready to publish
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Review your settings and publish your event to make it live.
//         </p>

//         <div className="flex space-x-10">
//           {/* Left - Form */}
//           <div className="flex-1 space-y-8">
//             {/* Event Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Event Type
//               </label>
//               <div className="relative">
//                 <select
//                   value={eventType}
//                   onChange={(e) => setEventType(e.target.value)}
//                   className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                 >
//                   <option value="">Select Event Type</option>
//                   <option value="Music">Music</option>
//                   <option value="Workshop">Workshop</option>
//                   <option value="Festival">Festival</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Event Category
//               </label>
//               <div className="relative">
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                 >
//                   <option value="">Select category</option>
//                   <option value="Entertainment">Entertainment</option>
//                   <option value="Education">Education</option>
//                   <option value="Technology">Technology</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Listing Type */}
//             <div>
//               <label className="block text-base font-medium text-gray-700 mb-3">
//                 Listing Type*
//               </label>
//               <div className="flex space-x-4">
//                 <button
//                   className={`px-6 py-2 border rounded-lg transition-all duration-200 font-medium ${
//                     listingType === "Public"
//                       ? "bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                   onClick={() => setListingType("Public")}
//                 >
//                   Public {listingType === "Public" && <Check className="w-4 h-4 inline ml-2" />}
//                 </button>

//                 <button
//                   className={`px-6 py-2 border rounded-lg transition-all duration-200 font-medium ${
//                     listingType === "Private"
//                       ? "bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500"
//                       : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                   }`}
//                   onClick={() => setListingType("Private")}
//                 >
//                   Private {listingType === "Private" && <Check className="w-4 h-4 inline ml-2" />}
//                 </button>
//               </div>
//             </div>

//             {/* Notifications */}
//             {listingType === "Public" && (
//               <div>
//                 <p className="block text-base font-medium text-gray-700 mb-3">
//                   Choose when to notify your subscribers:
//                 </p>
//                 <div className="flex">
//                   {["Now", "Schedule", "Don't Notify"].map((type) => (
//                     <label key={type} className="flex items-center text-sm mr-6">
//                       <input
//                         type="radio"
//                         name="notification"
//                         value={type}
//                         checked={notificationType === type}
//                         onChange={() => setNotificationType(type)}
//                         className="hidden"
//                       />
//                       <div
//                         className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${
//                           notificationType === type ? "border-blue-600" : "border-gray-400"
//                         }`}
//                       >
//                         <div
//                           className={`w-2 h-2 rounded-full ${
//                             notificationType === type ? "bg-blue-600" : "bg-transparent"
//                           }`}
//                         ></div>
//                       </div>
//                       {type}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Allow Discussions */}
//             <div className="flex items-center justify-between py-2 border-t border-gray-200 pt-8">
//               <label className="text-base font-medium text-gray-700 flex items-center">
//                 Allow discussions on your event
//                 <Info className="w-4 h-4 ml-2 text-gray-400" />
//               </label>
//               <Switch checked={allowDiscussions} onChange={setAllowDiscussions} />
//             </div>

//             {/* Publish Button */}
//             <div className="flex justify-end pt-8 mt-10 border-t border-gray-200">
//               <button
//                 onClick={handlePublish}
//                 disabled={loading}
//                 className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-md ${
//                   loading
//                     ? "bg-blue-300 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600"
//                 }`}
//               >
//                 {loading ? "Publishing..." : "Publish"}
//               </button>
//             </div>
//           </div>

//           {/* Right Preview */}
//           <div className="w-full max-w-xs pt-[125px]">
//             <EventPreview
//               bannerPreview={bannerPreview}
//               title={currentEvent.name}
//               location={currentEvent.venueCity}
//               startDate={currentEvent.startDate}
//               startTime={currentEvent.startTime}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ✅ Success Popup */}
//       {showSuccess && publishedEvent && (
//         <SuccessPopup event={publishedEvent} onClose={() => setShowSuccess(false)} />
//       )}
//     </div>
//   );
// };

// // ✅ Switch Component
// const Switch = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
//       checked ? "bg-blue-600" : "bg-gray-200"
//     }`}
//     role="switch"
//     aria-checked={checked}
//   >
//     <span
//       aria-hidden="true"
//       className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
//         checked ? "translate-x-5" : "translate-x-0"
//       }`}
//     />
//   </button>
// );

// // ✅ Event Preview Component
// const EventPreview = ({ bannerPreview, title, location, startDate, startTime }) => (
//   <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-xs sticky top-4">
//     <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
//       {bannerPreview ? (
//         <img
//           src={bannerPreview}
//           alt="Banner"
//           className="h-32 w-full object-cover rounded-md"
//         />
//       ) : (
//         "No Banner"
//       )}
//     </div>
//     <p className="text-xs text-gray-500">
//       {startDate ? formatEventDate(startDate) : "DATE NOT SET"}
//     </p>
//     <h3 className="text-lg font-semibold text-gray-800 break-words">
//       {title || "Untitled Event"}
//     </h3>
//     <p className="text-sm text-gray-600">{location || "Location not set"}</p>
//   </div>
// );

// export default EventPublish; 

// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ChevronDown, Check, Info } from "lucide-react";
// import { EventContext } from "../context/EventContext";
// import { formatEventDate } from "../utils/formatDate";
// import SuccessPopup from "../components/SuccessPopup";

// const EventPublish = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
//   const { events, setEvents } = useContext(EventContext); // ✅ From context
//   const currentEvent = events[0] || {};
//   const navigate = useNavigate();

//   const [listingType, setListingType] = useState("Public");
//   const [notificationType, setNotificationType] = useState("Now");
//   const [allowDiscussions, setAllowDiscussions] = useState(true);
//   const [category, setCategory] = useState(currentEvent.category || "");
//   const [eventType, setEventType] = useState(currentEvent.eventType || "");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [publishedEvent, setPublishedEvent] = useState(null);

//   // ------------------ Handle Publish ------------------
//   const handlePublish = async () => {
//     try {
//       if (!banner) {
//         alert("Please upload a banner before publishing!");
//         return;
//       }

//       setLoading(true);

//       const formData = new FormData();
//       formData.append("banner", banner);
//       formData.append("title", currentEvent.name || eventType || "Untitled Event");
//       formData.append("location", currentEvent.venueCity || "Unknown Location");
//       formData.append("category", category || "General");
//       formData.append("listingType", listingType);
//       formData.append("notificationType", notificationType);
//       formData.append("allowDiscussions", allowDiscussions);
//       formData.append("startDate", currentEvent.startDate || "");
//       formData.append("startTime", currentEvent.startTime || "");

//       const res = await axios.post("http://localhost:5000/api/publish", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("✅ Publish Response:", res.data);

//       const newEvent = {
//         image: bannerPreview,
//         name: currentEvent.name || "Untitled Event",
//         location: currentEvent.venueCity || "Unknown Location",
//         description: res.data.description || "Event successfully published!",
//         date: currentEvent.startDate || new Date(),
//       };

//       // ✅ Add published event to global context
//       setEvents((prevEvents) => [...prevEvents, newEvent]);

//       // ✅ Show success popup
//       setPublishedEvent(newEvent);
//       setShowSuccess(true);

//       // ✅ After 3 seconds, hide popup and navigate home
//       setTimeout(() => {
//         setShowSuccess(false);
//         navigate("/");
//       }, 3000);
//     } catch (error) {
//       console.error("❌ Publish Error:", error);
//       alert("Failed to publish event!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Your event is almost ready to publish
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Review your settings and publish your event to make it live.
//         </p>

//         <div className="flex space-x-10">
//           {/* Left Side - Publish Form */}
//           <div className="flex-1 space-y-8">
//             {/* Event Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Event Type
//               </label>
//               <div className="relative">
//                 <select
//                   value={eventType}
//                   onChange={(e) => setEventType(e.target.value)}
//                   className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                 >
//                   <option value="">Select Event Type</option>
//                   <option value="Music">Music</option>
//                   <option value="Workshop">Workshop</option>
//                   <option value="Festival">Festival</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Event Category
//               </label>
//               <div className="relative">
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="block w-full py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
//                 >
//                   <option value="">Select category</option>
//                   <option value="Entertainment">Entertainment</option>
//                   <option value="Education">Education</option>
//                   <option value="Technology">Technology</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//               </div>
//             </div>

//             {/* Listing Type */}
//             <div>
//               <label className="block text-base font-medium text-gray-700 mb-3">
//                 Listing Type*
//               </label>
//               <div className="flex space-x-4">
//                 {["Public", "Private"].map((type) => (
//                   <button
//                     key={type}
//                     className={`px-6 py-2 border rounded-lg font-medium transition ${
//                       listingType === type
//                         ? "bg-green-50 text-green-700 border-green-500 ring-2 ring-green-500"
//                         : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                     }`}
//                     onClick={() => setListingType(type)}
//                   >
//                     {type}
//                     {listingType === type && <Check className="w-4 h-4 inline ml-2" />}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Allow Discussions */}
//             <div className="flex items-center justify-between py-2 border-t border-gray-200 pt-8">
//               <label className="text-base font-medium text-gray-700 flex items-center">
//                 Allow discussions on your event
//                 <Info className="w-4 h-4 ml-2 text-gray-400" />
//               </label>
//               <Switch checked={allowDiscussions} onChange={setAllowDiscussions} />
//             </div>

//             {/* Publish Button */}
//             <div className="flex justify-end pt-8 mt-10 border-t border-gray-200">
//               <button
//                 onClick={handlePublish}
//                 disabled={loading}
//                 className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-md ${
//                   loading
//                     ? "bg-blue-300 cursor-not-allowed"
//                     : "bg-blue-500 hover:bg-blue-600"
//                 }`}
//               >
//                 {loading ? "Publishing..." : "Publish"}
//               </button>
//             </div>
//           </div>

//           {/* Right Preview */}
//           <div className="w-full max-w-xs pt-[125px]">
//             <EventPreview
//               bannerPreview={bannerPreview}
//               title={currentEvent.name}
//               location={currentEvent.venueCity}
//               startDate={currentEvent.startDate}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ✅ Success Popup */}
//       {showSuccess && publishedEvent && (
//         <SuccessPopup event={publishedEvent} onClose={() => setShowSuccess(false)} />
//       )}
//     </div>
//   );
// };

// // ------------------ Switch Component ------------------
// const Switch = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
//       checked ? "bg-blue-600" : "bg-gray-200"
//     }`}
//   >
//     <span
//       aria-hidden="true"
//       className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ${
//         checked ? "translate-x-5" : "translate-x-0"
//       }`}
//     />
//   </button>
// );

// // ------------------ Event Preview ------------------
// const EventPreview = ({ bannerPreview, title, location, startDate }) => (
//   <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-xs sticky top-4">
//     <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
//       {bannerPreview ? (
//         <img
//           src={bannerPreview}
//           alt="Banner"
//           className="h-32 w-full object-cover rounded-md"
//         />
//       ) : (
//         "No Banner"
//       )}
//     </div>
//     <p className="text-xs text-gray-500">
//       {startDate ? formatEventDate(startDate) : "DATE NOT SET"}
//     </p>
//     <h3 className="text-lg font-semibold text-gray-800 break-words">
//       {title || "Untitled Event"}
//     </h3>
//     <p className="text-sm text-gray-600">{location || "Location not set"}</p>
//   </div>
// );

// export default EventPublish;
// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ChevronDown, Check, Info } from "lucide-react";
// import { EventContext } from "../context/EventContext";
// import { formatEventDate } from "../utils/formatDate";
// import SuccessPopup from "../components/SuccessPopup";

// const EventPublish = () => {
//   const {
//     events,
//     setEvents,
//     banner,
//     setBanner,
//     bannerPreview,
//     setBannerPreview,
//   } = useContext(EventContext);

//   const currentEvent = events[0] || {};
//   const navigate = useNavigate();

//   const [listingType, setListingType] = useState("Public");
//   const [notificationType, setNotificationType] = useState("Now");
//   const [allowDiscussions, setAllowDiscussions] = useState(true);
//   const [category, setCategory] = useState(currentEvent.category || "");
//   const [eventType, setEventType] = useState(currentEvent.eventType || "");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [publishedEvent, setPublishedEvent] = useState(null);

//   const handlePublish = async () => {
//     if (!banner) {
//       alert("Please upload a banner before publishing!");
//       return;
//     }
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("banner", banner);
//       formData.append("title", currentEvent.name || eventType || "Untitled Event");
//       formData.append("location", currentEvent.venueCity || "Unknown Location");
//       formData.append("category", category || "General");
//       formData.append("listingType", listingType);
//       formData.append("notificationType", notificationType);
//       formData.append("allowDiscussions", allowDiscussions);
//       formData.append("startDate", currentEvent.startDate || "");
//       formData.append("startTime", currentEvent.startTime || "");

//       const res = await axios.post("http://localhost:5000/api/publish", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const newEvent = {
//         _id: res.data._id || Date.now(), // unique id for React key
//         image: bannerPreview,
//         name: currentEvent.name || "Untitled Event",
//         location: currentEvent.venueCity || "Unknown Location",
//         description: res.data.description || "Event successfully published!",
//         date: currentEvent.startDate || new Date(),
//       };






//       // ✅ Prevent duplicate: only add if not already present
//       setEvents((prev) => {
//         if (prev.some((ev) => ev._id === newEvent._id)) return prev;
//         return [...prev, newEvent];
//       });

//       setPublishedEvent(newEvent);
//       setShowSuccess(true);

//       setTimeout(() => {
//         setShowSuccess(false);
//         navigate("/");
//       }, 3000);
//     } catch (error) {
//       console.error("Publish error:", error);
//       alert("Failed to publish event!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Your event is almost ready to publish
//         </h1>

//         <div className="flex space-x-10">
//           <div className="flex-1 space-y-8">
//             {/* Event Type */}
//             <label className="block text-sm font-medium text-gray-700">Event Type</label>
//             <select
//               value={eventType}
//               onChange={(e) => setEventType(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select Event Type</option>
//               <option value="Music">Music</option>
//               <option value="Workshop">Workshop</option>
//               <option value="Festival">Festival</option>
//             </select>

//             {/* Category */}
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select Category</option>
//               <option value="Entertainment">Entertainment</option>
//               <option value="Education">Education</option>
//               <option value="Technology">Technology</option>
//             </select>

//             <button
//               onClick={handlePublish}
//               disabled={loading}
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
//             >
//               {loading ? "Publishing..." : "Publish"}
//             </button>
//           </div>

//           {/* Right Preview */}
//           <div className="w-full max-w-xs">
//             <EventPreview
//               bannerPreview={bannerPreview}
//               title={currentEvent.name}
//               location={currentEvent.venueCity}
//               startDate={currentEvent.startDate}
//             />
//           </div>
//         </div>
//       </div>

//       {showSuccess && publishedEvent && (
//         <SuccessPopup event={publishedEvent} onClose={() => setShowSuccess(false)} />
//       )}
//     </div>
//   );
// };

// const EventPreview = ({ bannerPreview, title, location, startDate }) => (
//   <div className="p-4 bg-white border rounded shadow w-full">
//     <div className="h-32 bg-gray-200 flex items-center justify-center mb-2">
//       {bannerPreview ? (
//         <img src={bannerPreview} alt="Banner" className="h-32 w-full object-cover" />
//       ) : (
//         "No Banner"
//       )}
//     </div>
//     <h3 className="font-semibold">{title || "Untitled Event"}</h3>
//     <p>{location || "Location not set"}</p>
//     <p>{startDate ? formatEventDate(startDate) : "Date not set"}</p>
//   </div>
// );

// export default EventPublish;


          