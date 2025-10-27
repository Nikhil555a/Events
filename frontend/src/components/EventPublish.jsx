




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

      await axios.post("https://events-backend2-nwra.onrender.com/api/publish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Step 2: Mark event as published (update existing event)
      await axios.put(`https://events-backend2-nwra.onrender.com/api/events/${currentEvent._id}`, {
        isPublished: true,
      });

      alert("Event Public SuccessFully");
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
                    <option value="Music">Seminar</option>
                    <option value="Workshop">Concert</option>
                    <option value="Festival">Festival</option>
                    <option value="Festival">Performance</option>
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
                    <option value="Entertainment">Single Parties</option>
                    <option value="Entertainment">Concert</option>
                    <option value="Entertainment">Pool Parties</option>
                    <option value="Education">Parties</option>
                    <option value="Technology">Performance</option>
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
              <button className="px-6 py-3 mr-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Save as draft
              </button>
              <button
                onClick={handlePublish}
                disabled={loading}
                className={`px-6 py-3 text-white rounded-lg font-medium transition-colors shadow-md ${
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




// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { ChevronDown, Check, Info } from "lucide-react";
// import { EventContext } from "../context/EventContext";
// import { formatEventDate } from "../utils/formatDate";
// import { useNavigate } from "react-router-dom";
// import { authDataContext } from "../context/Authcontext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

// const EventPublish = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
//   const { events } = useContext(EventContext);
//   const currentEvent = events[0] || {};
//   const navigate = useNavigate();
//   const { user } = useContext(authDataContext);

//   const [listingType, setListingType] = useState("Public");
//   const [notificationType, setNotificationType] = useState("Now");
//   const [allowDiscussions, setAllowDiscussions] = useState(true);
//   const [category, setCategory] = useState(currentEvent.category || "");
//   const [eventType, setEventType] = useState(currentEvent.eventType || "");
//   const [loading, setLoading] = useState(false);

//   const [organizerPage, setOrganizerPage] = useState(
//     user ? `${user.firstName} ${user.lastName} ${user.email}` : "Guest User"
//   );

//   // ✅ Handle Publish Event
//   const handlePublish = async () => {
//     try {
//       if (!banner) {
//         toast.warn("⚠️ Please upload a banner before publishing!");
//         return;
//       }

//       if (!currentEvent._id) {
//         toast.error("❌ Missing event ID — please complete event creation first!");
//         return;
//       }

//       setLoading(true);

//       // ✅ Step 1: Upload publish data
//       const formData = new FormData();
//       formData.append("banner", banner);
//       formData.append("title", currentEvent.name || eventType || "Untitled Event");
//       formData.append("location", currentEvent.venueCity || "Unknown Location");
//       formData.append("category", category || "General");
//       formData.append("listingType", listingType);
//       formData.append("notificationType", notificationType);
//       formData.append("allowDiscussions", allowDiscussions);
//       formData.append(
//         "organizerName",
//         user ? `${user.firstName} ${user.lastName}` : "Guest User"
//       );
//       formData.append("startDate", currentEvent.startDate || "");
//       formData.append("startTime", currentEvent.startTime || "");
//       formData.append("eventId", currentEvent._id);

//       // await axios.post("http://localhost:5000/api/publish", formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       // // ✅ Step 2: Mark event as published
//       // await axios.put(`http://localhost:5000/api/events/${currentEvent._id}`, {
//       //   isPublished: true,
//       // });


//            await axios.post("https://events-backend2-nwra.onrender.com/api/publish", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

// //       // ✅ Step 2: Mark event as published (update existing event)
//       await axios.put(`https://events-backend2-nwra.onrender.com/api/events/${currentEvent._id}`, {
//         isPublished: true,
//       });

//       // ✅ Success Toast
//       toast.success("🎉 Event published successfully!", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "colored",
//       });

//       // Redirect after delay
//       setTimeout(() => navigate("/"), 2500);
//     } catch (error) {
//       console.error("❌ Publish Error:", error);
//       toast.error("Failed to publish event!", { position: "top-center" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🧩 Common UI Classes
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
//       {/* ✅ Toast Container */}
//       <ToastContainer />

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
//                     <option value="Seminar">Seminar</option>
//                     <option value="Concert">Concert</option>
//                     <option value="Festival">Festival</option>
//                     <option value="Performance">Performance</option>
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
//                     <option value="Single Parties">Single Parties</option>
//                     <option value="Concert">Concert</option>
//                     <option value="Pool Parties">Pool Parties</option>
//                     <option value="Parties">Parties</option>
//                     <option value="Performance">Performance</option>
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

//             {/* Notification */}
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
//               <label className="text-base font-medium text-gray-700 flex items-center">
//                 Allow discussions on your event <Info className="w-4 h-4 ml-2 text-gray-400" />
//               </label>
//               <Switch checked={allowDiscussions} onChange={setAllowDiscussions} />
//             </div>

//             {/* Organizer */}
//             <div className="organizer-section border-2 border-gray-400 p-2">
//               <label>Organizer:</label>
//               <span className="text-gray-700 text-base flex-1 truncate pl-2">
//                 {user ? `${user.firstName} ${user.lastName}` : organizerPage}
//               </span>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end pt-8 mt-10 border-t border-gray-200">
//               <button className="px-6 py-3 mr-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
//                 Save as draft
//               </button>
//               <button
//                 onClick={handlePublish}
//                 disabled={loading}
//                 className={`px-6 py-3 text-white rounded-lg font-medium transition-colors shadow-md ${
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
//     </div>
//   );
// };

// // ✅ Switch Component
// const Switch = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
//       checked ? "bg-blue-600" : "bg-gray-200"
//     }`}
//   >
//     <span
//       className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition ${
//         checked ? "translate-x-5" : "translate-x-0"
//       }`}
//     />
//   </button>
// );

// // ✅ Event Preview
// const EventPreview = ({ bannerPreview, title, location, startDate, startTime }) => (
//   <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-xs sticky top-4">
//     <div className="h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
//       {bannerPreview ? (
//         <img src={bannerPreview} alt="Banner" className="h-32 w-full object-cover rounded-md" />
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




