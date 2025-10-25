
// import React, { useState, useRef, useContext } from 'react';
// import axios from 'axios';
// import sampleVedio from "../assets/vedio.mp4";
// import { useNavigate } from 'react-router-dom';
// import logo from "../assets/logo.svg";
// import vedioImg from "../assets/vedio-img.webp";
// import {
//   MapPin,
//   Globe,
//   MonitorPlay,
//   Calendar,
//   Clock,
//   ChevronDown,
//   Plus,
//   Check,
//   Zap,
//   X,
//   Copy,
//   ChevronLeft,
//   ChevronRight,
//   Youtube,
//   Video,
//   MoreHorizontal,
//   Headset,
// } from 'lucide-react';
// import { authDataContext } from '../context/Authcontext';

// // --- Subcomponents (VenueLocationFields & RecordedEventFields) kept mostly same but augmented to lift files up via props ---

// const VenueLocationFields = ({ venue, setVenue }) => {
//   // venue: { name, address, city }
//   return (
//     <div className="mt-6 space-y-4">
//       <div className="relative">
//         <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 sr-only">
//           Location Name *
//         </label>
//         <input
//           type="text"
//           id="locationName"
//           name="locationName"
//           placeholder="Venue name"
//           value={venue.name}
//           onChange={(e) => setVenue({ ...venue, name: e.target.value })}
//           className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500 pr-10"
//         />
//         {venue.name && <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />}
//       </div>

//       <div>
//         <label htmlFor="address" className="block text-sm font-medium text-gray-700 sr-only">
//           Address
//         </label>
//         <textarea
//           id="address"
//           rows="3"
//           placeholder="Address"
//           value={venue.address}
//           onChange={(e) => setVenue({ ...venue, address: e.target.value })}
//           className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base resize-none focus:ring-indigo-500 focus:border-indigo-500"
//         ></textarea>
//       </div>

//       <div className="relative">
//         <label htmlFor="city" className="block text-sm font-medium text-gray-700 sr-only">
//           City
//         </label>
//         <input
//           type="text"
//           id="city"
//           name="city"
//           placeholder="City"
//           value={venue.city}
//           onChange={(e) => setVenue({ ...venue, city: e.target.value })}
//           className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500 pr-10"
//         />
//         {venue.city && <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />}
//       </div>
//     </div>
//   );
// };

// const RecordedEventFields = ({ recorded, setRecorded }) => {
//   // recorded: { hostedOn, hostedLink, uploadedFile }
//   const hostedOn = recorded.hostedOn;

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0] || null;
//     setRecorded({ ...recorded, uploadedFile: file });
//   };

//   return (
//     <div className="mt-6 space-y-6">
//       <label className="block text-lg font-medium text-gray-700 mb-4">
//         Where is your recorded event hosted?*
//       </label>
//       <div className="flex flex-wrap gap-4">
//         <button
//           type="button"
//           className={`flex items-center px-4 py-3 border rounded-lg text-base font-medium transition duration-150 ${hostedOn === 'Youtube' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//             }`}
//           onClick={() => setRecorded({ ...recorded, hostedOn: 'Youtube', hostedLink: '' })}
//         >
//           <Youtube className="w-5 h-5 mr-2 text-red-600" /> Youtube
//           {hostedOn === 'Youtube' && <Check className="w-4 h-4 ml-2" />}
//         </button>

//         <button
//           type="button"
//           className={`flex items-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 ${hostedOn === 'Vimeo' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''
//             }`}
//           onClick={() => setRecorded({ ...recorded, hostedOn: 'Vimeo', hostedLink: '' })}
//         >
//           <Video className="w-5 h-5 mr-2 text-blue-600" /> Vimeo
//           {hostedOn === 'Vimeo' && <Check className="w-4 h-4 ml-2" />}
//         </button>

//         <button
//           type="button"
//           className={`flex items-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 ${hostedOn === 'Others' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''
//             }`}
//           onClick={() => setRecorded({ ...recorded, hostedOn: 'Others', hostedLink: '' })}
//         >
//           Others
//           {hostedOn === 'Others' && <Check className="w-4 h-4 ml-2" />}
//         </button>

//         <button
//           type="button"
//           className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
//           onClick={() => setRecorded({ ...recorded, hostedOn: 'Upload', hostedLink: '' })}
//         >
//           <Video className="w-5 h-5 mr-2" /> Upload file
//           {hostedOn === 'Upload' && <Check className="w-4 h-4 ml-2" />}
//         </button>
//       </div>

//       {hostedOn && hostedOn !== 'Upload' && (
//         <div className="mt-6">
//           <label htmlFor="hostedLink" className="block text-lg font-medium text-gray-700 mb-2">
//             Link of the {hostedOn.toLowerCase()} video*
//           </label>
//           <input
//             type="url"
//             id="hostedLink"
//             name="hostedLink"
//             placeholder={`ex. https://${hostedOn.toLowerCase()}.com/yourvideo`}
//             value={recorded.hostedLink}
//             onChange={(e) => setRecorded({ ...recorded, hostedLink: e.target.value })}
//             className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//           />
//         </div>
//       )}

//       {hostedOn === 'Upload' && (
//         <div className="mt-6">
//           <label className="block text-lg font-medium text-gray-700 mb-2">Upload recorded video</label>
//           <input type="file" accept="video/*" onChange={handleFileChange} />
//           {recorded.uploadedFile && <p className="text-sm mt-2">{recorded.uploadedFile.name}</p>}
//         </div>
//       )}

//       <div className="p-4 rounded-md bg-green-50 border border-green-200 text-sm text-green-700">
//         <p>
//           <span className="font-semibold">People who register for your event will get instant access to your video content.</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// // ---------------------- Main Component ----------------------

// // const API_CREATE_EVENT = "https://events-backend2-nwra.onrender.com/api/events"; // assumed API

// const EventFormPage = ({ videoPlacement = 'sidebar', prefill = {}, showSidebarVideo = true }) => {
//   // --- UI state from your original file ---
//   const [eventType, setEventType] = useState('Single event');
//   // const [locationType, setLocationType] = useState('Venue');
//   // const [startDate, setStartDate] = useState('');
//   // const [startTime, setStartTime] = useState('');
//   // const [endTime, setEndTime] = useState('');
//   const [showEndTime, setShowEndTime] = useState(false);
//   const [timezone, setTimezone] = useState('(GMT+05:30) India Standard Time - Colombo');
//   // const [organizerPage, setOrganizerPage] = useState('nikhil pandey (0 subscribers)');
//   const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
//   // const { user } = useContext(authDataContext);
//   const { user } = useContext(authDataContext);
//   // console.log(user)
//   //  console.log(user.firstName, user.lastName, user.email); // ab defined aayega

//   const [organizerPage, setOrganizerPage] = useState(
//     user ? `${user.firstName} ${user.lastName}  ${user.email} ` : "nikhil pandey (0 subscribers)"
//   );




//   // --- Form data state ---
//   // const [eventName, setEventName] = useState('');
//   // const [description, setDescription] = useState('');
//   // const [venue, setVenue] = useState({ name: '', address: '', city: '' });
//   // const [bannerFile, setBannerFile] = useState(null);
//   // const [bannerPreview, setBannerPreview] = useState(null);

//   // const [recorded, setRecorded] = useState({
//   //   hostedOn: 'Youtube',
//   //   hostedLink: '',
//   //   uploadedFile: null,
//   // });


//   const [eventName, setEventName] = useState(prefill.name || '');
//   const [description, setDescription] = useState(prefill.description || '');
//   const [venue, setVenue] = useState({
//     name: prefill.venueName || '',
//     address: prefill.venueAddress || '',
//     city: prefill.venueCity || ''
//   });
//   const [startDate, setStartDate] = useState(prefill.startDate || '');
//   const [startTime, setStartTime] = useState(prefill.startTime || '');
//   const [endTime, setEndTime] = useState(prefill.endTime || '');
//   const [locationType, setLocationType] = useState(prefill.locationType || 'Venue');
//   const [recorded, setRecorded] = useState({
//     hostedOn: prefill.recorded?.hostedOn || 'Youtube',
//     hostedLink: prefill.recorded?.hostedLink || '',
//     uploadedFile: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [message, setMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate()
//   const [imageFile, setImageFile] = useState(null);
//   // const [imagePreview, setImagePreview] = useState(null);



//   const locationTypes = [
//     { id: 'Venue', icon: MapPin, title: 'Venue', description: 'Host in-person events with check-in management.' },
//     { id: 'Online', icon: Globe, title: 'Online', description: 'Host virtual events, sharing access with ticket buyers.' },
//     { id: 'Recorded events', icon: MonitorPlay, title: 'Recorded events', description: 'Provide instant access to pre-recorded content after purchase.' },
//   ];

//   // --- Handlers ---
//   const toggleEndTime = () => setShowEndTime(!showEndTime);

//   // const handleBannerChange = (e) => {
//   //   const file = e.target.files?.[0] || null;
//   //   setBannerFile(file);
//   //   if (file) {
//   //     const url = URL.createObjectURL(file);
//   //     setBannerPreview(url);
//   //   } else {
//   //     setBannerPreview(null);
//   //   }
//   // };

//   const handleOpenVideoModal = () => setIsVideoModalOpen(true);
//   const handleCloseVideoModal = () => setIsVideoModalOpen(false);

//   // Simple client-side validation (light) ye hatana hai 
//   const validate = () => {
//     if (!eventName.trim()) {
//       setErrorMessage('Event name is required.');
//       return false;
//     }
//     if ((locationType === 'Venue') && !venue.name.trim()) {
//       setErrorMessage('Venue name is required for Venue events.');
//       return false;
//     }
//     if (locationType === 'Recorded events') {
//       if (recorded.hostedOn !== 'Upload' && !recorded.hostedLink.trim()) {
//         setErrorMessage('Please provide the link for your recorded event.');
//         return false;
//       }
//       if (recorded.hostedOn === 'Upload' && !recorded.uploadedFile) {
//         setErrorMessage('Please upload your recorded video file.');
//         return false;
//       }
//     }
//     setErrorMessage(null);
//     return true;
//   };

  





//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (!validate()) return;

//     setIsSubmitting(true);
//     setMessage(null);
//     setErrorMessage(null);
//     setUploadProgress(0);

//     try {
//       // Build form data
//       const formData = new FormData();
//       formData.append('name', eventName);
//       formData.append('description', description);
//       formData.append('eventType', eventType);
//       formData.append('locationType', locationType);
//       formData.append('startDate', startDate);
//       formData.append('startTime', startTime);
//       formData.append('endTime', endTime);
//       formData.append('timezone', timezone);
//       formData.append('organizerPage', organizerPage);

//       // Venue fields
//       formData.append('venueName', venue.name || '');
//       formData.append('venueAddress', venue.address || '');
//       formData.append('venueCity', venue.city || '');
//       // formData.append("image", imageFile); // if image uploaded
//       formData.append("image", imageFile);


     

//       // Banner file
//       // if (bannerFile) formData.append('banner', bannerFile);

//       // Recorded event data
//       if (locationType === 'Recorded events') {
//         formData.append('recorded.hostedOn', recorded.hostedOn);
//         if (recorded.hostedOn === 'Upload' && recorded.uploadedFile) {
//           formData.append('recorded.file', recorded.uploadedFile);
//         } else {
//           formData.append('recorded.link', recorded.hostedLink || '');
//         }
//       }

//       // Example: add a JSON snapshot for debugging (optional)
//       // formData.append('meta', JSON.stringify({ createdBy: 'frontend' }));

//       const config = {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setUploadProgress(percentCompleted);
//           }
//         },
//         timeout: 120000, // 2 min
//       };

//       const resp = await axios.post("https://events-backend2-nwra.onrender.com/api/events", formData, config);

//       setMessage('Event created successfully.');
//       setErrorMessage(null);
//       // console.log(formData)
//       navigate("/event-edit")
//       // Reset form lightly (you can tailor to prefer staying on page)
//       setEventName('');
//       setDescription('');
//       setVenue({ name: '', address: '', city: '' });
//       setBannerFile(null);
//       setBannerPreview(null);
//       setRecorded({ hostedOn: 'Youtube', hostedLink: '', uploadedFile: null });
//       setUploadProgress(0);
//     } catch (err) {
//       console.error(err);
//       const serverMessage = err?.response?.data?.message || err.message || 'Failed to create event.';
//       setErrorMessage(serverMessage);
//     } finally {
//       setIsSubmitting(false);
//       // release object URL
//       if (bannerPreview) {
//         URL.revokeObjectURL(bannerPreview);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-0">
//       {showSidebarVideo && videoPlacement !== 'none' && (
//         <header className="sticky top-0 left-0 w-full bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-20 border-b border-gray-100">
//           <div className="flex items-center">
//             <div className="flex items-center">
//               <svg width="24" height="24" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6'>
//                 <circle cx="27" cy="27" r="27" fill="#00BCD4" />
//                 <text x="13" y="37" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">ae</text>
//               </svg>
//               <span className="font-semibold text-xl text-gray-800 ml-2">allevents</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="flex items-center text-gray-600 hover:text-gray-800 text-base font-medium">
//               <Plus className="w-4 h-4 mr-1" /> Create Event
//             </button>
//             <Headset className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
//             <div className="relative cursor-pointer">
//               <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-700/80">
//                 <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <rect x="0" y="0" width="20" height="20" fill="white" fillOpacity="0" />
//                   <path d="M10 0L20 10L10 20L0 10L10 0Z" fill="white" />
//                   <path d="M10 0L15 5L10 10L5 5L10 0Z" fill="#C42B2B" />
//                   <path d="M10 10L15 5L10 0L5 5L10 10Z" fill="#C42B2B" />
//                   <path d="M10 10L15 15L10 20L5 15L10 10Z" fill="#C42B2B" />
//                 </svg>
//               </div>
//               <ChevronDown className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
//             </div>
//           </div>
//         </header>
//       )}

//       <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 lg:mt-8 relative z-10 p-4 sm:p-6 lg:p-8 pt-0">
//         <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-lg shadow-md border border-gray-200">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">Create an event</h1>

//           <div className="mb-8">
//             <label htmlFor="eventName" className="block text-lg font-medium text-gray-700 mb-2">Event Name *</label>
//             <input
//               type="text"
//               id="eventName"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               placeholder="Enter the name of your event"
//               className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
//             />
//           </div>

//           <div className="mb-10">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
//             <p className="text-gray-600 mb-4">Choose where your event will take place.</p>
//             <label className="block text-lg font-medium text-gray-700 mb-4">Where will your event take place?</label>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {locationTypes.map((item) => {
//                 const Icon = item.icon;
//                 const isSelected = locationType === item.id;
//                 return (
//                   <div
//                     key={item.id}
//                     className={`p-5 border relative rounded-lg cursor-pointer transition duration-150 ease-in-out ${isSelected ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'}`}
//                     onClick={() => setLocationType(item.id)}
//                   >
//                     {isSelected && <Check className="absolute top-2 right-2 w-5 h-5 text-green-500" />}
//                     <div className="flex flex-col items-center text-center h-full">
//                       <div className="p-3 bg-gray-100 rounded-full mb-3">
//                         <Icon className="w-6 h-6 text-gray-700" />
//                       </div>
//                       <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
//                       <p className="text-sm text-gray-600 mt-auto">{item.description}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {locationType === 'Venue' && <VenueLocationFields venue={venue} setVenue={setVenue} />}
//             {locationType === 'Recorded events' && <RecordedEventFields recorded={recorded} setRecorded={setRecorded} />}

//           </div>

//           {(locationType === 'Venue' || locationType === 'Online') && (
//             <div className="mb-10">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Date and time</h2>
//               <p className="text-gray-600 mb-4">Select the event date, time, and timezone.</p>

//               <label className="block text-lg font-medium text-gray-700 mb-2">Event type *</label>
//               <div className="flex space-x-3 mb-6">
//                 <button type="button" className={`flex items-center px-4 py-2 border rounded-full text-base font-medium transition duration-150 ${eventType === 'Single event' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setEventType('Single event')}>
//                   Single event {eventType === 'Single event' && <Check className="w-4 h-4 ml-2" />}
//                 </button>

//                 <button type="button" className={`flex items-center px-4 py-2 border rounded-full text-base font-medium transition duration-150 ${eventType === 'Recurring event' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setEventType('Recurring event')}>
//                   Recurring event {eventType === 'Recurring event' && <Check className="w-4 h-4 ml-2" />}
//                 </button>
//               </div>

//               {eventType === 'Single event' && (
//                 <>
//                   <div className="flex flex-wrap items-end gap-4 mb-6">
//                     <div className="flex-1 min-w-[150px]">
//                       <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start date *</label>
//                       <div className="relative">
//                         <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base appearance-none focus:ring-indigo-500 focus:border-indigo-500" />
//                       </div>
//                     </div>

//                     <div className="flex-1 min-w-[120px]">
//                       <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start time *</label>
//                       <div className="relative">
//                         <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
//                       </div>
//                     </div>

//                     {!showEndTime ? (
//                       <button type="button" onClick={toggleEndTime} className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap pt-7 sm:pt-0">
//                         <Plus className="w-4 h-4 mr-1" /> Add end time
//                       </button>
//                     ) : (
//                       <>
//                         <div className="flex-1 min-w-[120px]">
//                           <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End time</label>
//                           <div className="relative">
//                             <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
//                           </div>
//                         </div>
//                         <button type="button" onClick={toggleEndTime} className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap pt-7 sm:pt-0" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
//                           - Remove End Time
//                         </button>
//                       </>
//                     )}
//                   </div>

//                   <div className="max-w-md">
//                     <label htmlFor="timezone" className="block text-lg font-medium text-gray-700 mb-2">Time Zone *</label>
//                     <div className="relative">
//                       <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base pr-10 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
//                         <option>{timezone}</option>
//                         <option>(GMT-05:00) Eastern Time (US & Canada)</option>
//                         <option>(GMT+01:00) Central European Time</option>
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>
//                 </>
//               )}

//               {eventType === 'Recurring event' && (
//                 <>
//                   <div className="flex space-x-4 mb-4">
//                     <div className="flex-1 min-w-[120px]">
//                       <label htmlFor="startTimeRec" className="block text-sm font-medium text-gray-700 mb-1">Start time *</label>
//                       <div className="relative">
//                         <input type="time" id="startTimeRec" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
//                       </div>
//                     </div>

//                     <div className="flex-1 min-w-[120px]">
//                       <label htmlFor="endTimeRec" className="block text-sm font-medium text-gray-700 mb-1">End time</label>
//                       <div className="relative">
//                         <input type="time" id="endTimeRec" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 rounded-md bg-green-50 border border-green-200 text-sm text-green-700 mb-6">
//                     <p><span className="font-semibold">Note: You'll be able to add dates/occurrences to your event in the next step.</span></p>
//                   </div>

//                   <div className="max-w-md">
//                     <label htmlFor="timezoneRec" className="block text-lg font-medium text-gray-700 mb-2">Time Zone *</label>
//                     <div className="relative">
//                       <select id="timezoneRec" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base pr-10 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
//                         <option>{timezone}</option>
//                         <option>(GMT-05:00) Eastern Time (US & Canada)</option>
//                         <option>(GMT+01:00) Central European Time</option>
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}

//           <div className="mb-10">
//             <label htmlFor="eventDescription" className="block text-lg font-medium text-gray-700 mb-2">Event Description *</label>
//             <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden focus-within:ring-indigo-500 focus-within:border-indigo-500">
//               <div className="flex justify-between items-center p-2 border-b bg-gray-50">
//                 <div className="flex space-x-2">
//                   <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded font-bold">B</button>
//                   <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded italic">I</button>
//                   <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded underline">U</button>
//                   <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded">⋯</button>
//                   <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded">⋯</button>
//                 </div>
//                 <button type="button" className="flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700 transition">
//                   <Zap className="w-4 h-4 mr-1" /> Generate using AI
//                 </button>
//               </div>

//               <textarea id="eventDescription" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full p-3 border-0 resize-none focus:ring-0 text-base" placeholder="Enter event details..."></textarea>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Organizer Page</h2>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//               <div className="relative flex-1 max-w-sm">
//                 <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-gray-400">
//                   <div className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-red-700/80">
//                     <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <rect x="0" y="0" width="20" height="20" fill="white" fillOpacity="0" />
//                       <path d="M10 0L20 10L10 20L0 10L10 0Z" fill="white" />
//                       <path d="M10 0L15 5L10 10L5 5L10 0Z" fill="#C42B2B" />
//                       <path d="M10 10L15 5L10 0L5 5L10 10Z" fill="#C42B2B" />
//                       <path d="M10 10L15 15L10 20L5 15L10 10Z" fill="#C42B2B" />
//                     </svg>
//                   </div>
//                   {/* <span className="text-gray-700 text-base flex-1 truncate">{user?.firstName || organizerPage} </span> */}
//                   <div className="organizer-section">
//                     <label>Organizer:</label>
//                     <span className="text-gray-700 text-base flex-1 truncate">
//                       {user ? `${user.firstName} ${user.lastName}  ` : organizerPage}
//                     </span>
//                   </div>


//                   <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
//                 </div>
//               </div>
//               <button type="button" className="flex items-center text-indigo-600 hover:text-indigo-800 text-base font-medium whitespace-nowrap">
//                 <Plus className="w-4 h-4 mr-1" /> Create new organizer page
//               </button>
//             </div>
//           </div>

//           <div className="mt-10 pt-4 border-t border-gray-200">
//             <div className="flex items-center justify-between gap-4">
//               <div className="flex-1">
//                 {errorMessage && <div className="text-sm text-red-600 mb-2">{errorMessage}</div>}
//                 {message && <div className="text-sm text-green-600 mb-2">{message}</div>}
//                 {isSubmitting && uploadProgress > 0 && <div className="text-sm text-gray-800 mb-2">Uploading: {uploadProgress}%</div>}
//               </div>
//               <button 
//                 type="submit"
//                 // disabled={isSubmitting}
//                 className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {/* {isSubmitting ? 'Saving...' : 'Continue'}*/}
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         {/* <aside className="lg:col-span-1 space-y-8"> 
//           <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//             <div className="relative h-48 bg-gray-800 flex items-center justify-center">
//               <div className="absolute inset-0 bg-indigo-900/60"></div>
//               <img src={logo} alt="AllEvents Logo" className="absolute top-4 left-4 h-8 w-auto text-white" />
//               <button
//                 type="button"
//                 className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center text-indigo-600 hover:bg-white transition z-10"
//                 aria-label="Play video"
//                 onClick={handleOpenVideoModal}
//               >
//                 <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
//               </button>
//             </div>
//             <div className="p-5">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Here's a video to help you get started!</h3>
//               <p className="text-sm text-gray-600">Check out this guide to learn how to make the most of AllEvents.</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">Import your events from other platforms</h3>
//             <p className="text-sm text-gray-600 mb-4">Have you already published your events on other platforms like Facebook, Eventbrite or your own website?</p>
//             <button type="button" className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition duration-150">Import now</button>
//           </div>

         
//         </aside> */}

//         {/* Sidebar */}
//         {showSidebarVideo && videoPlacement !== 'none' && (
//           <aside className="lg:col-span-1 space-y-8">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//               <div className="relative h-48 bg-gray-800 flex items-center justify-center">
//                 <div className="absolute inset-0 bg-indigo-900/60"></div>
//                 <img src={logo} alt="AllEvents Logo" className="absolute top-4 left-4 h-8 w-auto text-white" />
//                 <button
//                   type="button"
//                   className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center text-indigo-600 hover:bg-white transition z-10"
//                   aria-label="Play video"
//                   onClick={handleOpenVideoModal}
//                 >
//                   <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Here's a video to help you get started!</h3>
//                 <p className="text-sm text-gray-600">Check out this guide to learn how to make the most of AllEvents.</p>
//               </div>

//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//               <h3 className="text-xl font-semibold text-gray-900 mb-3">Import your events from other platforms</h3>
//               <p className="text-sm text-gray-600 mb-4">Have you already published your events on other platforms like Facebook, Eventbrite or your own website?</p>
//               <button type="button" className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition duration-150">Import now</button>
//             </div>
//           </aside>

//         )}

//       </form>

//       {/* Video Modal */}
//       {showSidebarVideo && isVideoModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="fixed inset-0 bg-black bg-opacity-80" onClick={handleCloseVideoModal}></div>

//           <div className="relative w-full max-w-5xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl lg:max-w-5xl">
//             <div className="flex justify-between items-center p-3 bg-gray-800 border-b border-gray-700">
//               <div className="flex items-center">
//                 <img src={logo} alt="AllEvents Logo" className="h-6 w-auto mr-2" />
//                 <span className="text-sm sm:text-base font-semibold text-white">#1 Event Ticketing Platform to Sell Tickets Online - AllEvents</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button className="text-gray-400 hover:text-white flex items-center text-sm">
//                   <Copy className="w-4 h-4 mr-1" /> Copy link
//                 </button>
//                 <button className="text-gray-400 hover:text-white" onClick={handleCloseVideoModal} aria-label="Close video">
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <div className="relative pt-[56.25%] bg-black">

//               <iframe
//                 className="absolute inset-0 w-full h-full"
//                 src={sampleVedio}
//                 title="How to create events"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventFormPage;





import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import sampleVedio from "../assets/vedio.mp4";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.svg";
import vedioImg from "../assets/vedio-img.webp";
import {
  MapPin,
  Globe,
  MonitorPlay,
  Calendar,
  Clock,
  ChevronDown,
  Plus,
  Check,
  Zap,
  X,
  Copy,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Video,
  MoreHorizontal,
  Headset,
} from 'lucide-react';
import { authDataContext } from '../context/Authcontext';
import { EventContext } from '../context/EventContext';

// --- Subcomponents (VenueLocationFields & RecordedEventFields) kept mostly same but augmented to lift files up via props ---

const VenueLocationFields = ({ venue, setVenue }) => {
  // venue: { name, address, city }
  return (
    <div className="mt-6 space-y-4">
      <div className="relative">
        <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 sr-only">
          Location Name *
        </label>
        <input
          type="text"
          id="locationName"
          name="locationName"
          placeholder="Venue name"
          value={venue.name}
          onChange={(e) => setVenue({ ...venue, name: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500 pr-10"
        />
        {venue.name && <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 sr-only">
          Address
        </label>
        <textarea
          id="address"
          rows="3"
          placeholder="Address"
          value={venue.address}
          onChange={(e) => setVenue({ ...venue, address: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base resize-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <div className="relative">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 sr-only">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={venue.city}
          onChange={(e) => setVenue({ ...venue, city: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500 pr-10"
        />
        {venue.city && <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />}
      </div>
    </div>
  );
};

const RecordedEventFields = ({ recorded, setRecorded }) => {
  // recorded: { hostedOn, hostedLink, uploadedFile }
  const hostedOn = recorded.hostedOn;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setRecorded({ ...recorded, uploadedFile: file });
  };

  return (
    <div className="mt-6 space-y-6">
      <label className="block text-lg font-medium text-gray-700 mb-4">
        Where is your recorded event hosted?*
      </label>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className={`flex items-center px-4 py-3 border rounded-lg text-base font-medium transition duration-150 ${hostedOn === 'Youtube' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          onClick={() => setRecorded({ ...recorded, hostedOn: 'Youtube', hostedLink: '' })}
        >
          <Youtube className="w-5 h-5 mr-2 text-red-600" /> Youtube
          {hostedOn === 'Youtube' && <Check className="w-4 h-4 ml-2" />}
        </button>

        <button
          type="button"
          className={`flex items-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 ${hostedOn === 'Vimeo' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''
            }`}
          onClick={() => setRecorded({ ...recorded, hostedOn: 'Vimeo', hostedLink: '' })}
        >
          <Video className="w-5 h-5 mr-2 text-blue-600" /> Vimeo
          {hostedOn === 'Vimeo' && <Check className="w-4 h-4 ml-2" />}
        </button>

        <button
          type="button"
          className={`flex items-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 ${hostedOn === 'Others' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : ''
            }`}
          onClick={() => setRecorded({ ...recorded, hostedOn: 'Others', hostedLink: '' })}
        >
          Others
          {hostedOn === 'Others' && <Check className="w-4 h-4 ml-2" />}
        </button>

        <button
          type="button"
          className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setRecorded({ ...recorded, hostedOn: 'Upload', hostedLink: '' })}
        >
          <Video className="w-5 h-5 mr-2" /> Upload file
          {hostedOn === 'Upload' && <Check className="w-4 h-4 ml-2" />}
        </button>
      </div>

      {hostedOn && hostedOn !== 'Upload' && (
        <div className="mt-6">
          <label htmlFor="hostedLink" className="block text-lg font-medium text-gray-700 mb-2">
            Link of the {hostedOn.toLowerCase()} video*
          </label>
          <input
            type="url"
            id="hostedLink"
            name="hostedLink"
            placeholder={`ex. https://${hostedOn.toLowerCase()}.com/yourvideo`}
            value={recorded.hostedLink}
            onChange={(e) => setRecorded({ ...recorded, hostedLink: e.target.value })}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
          />
        </div>
      )}

      {hostedOn === 'Upload' && (
        <div className="mt-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload recorded video</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          {recorded.uploadedFile && <p className="text-sm mt-2">{recorded.uploadedFile.name}</p>}
        </div>
      )}

      <div className="p-4 rounded-md bg-green-50 border border-green-200 text-sm text-green-700">
        <p>
          <span className="font-semibold">People who register for your event will get instant access to your video content.</span>
        </p>
      </div>
    </div>
  );
};

// ---------------------- Main Component ----------------------

const API_CREATE_EVENT = "http://localhost:5000/api/events"; // assumed API

const EventFormPage = ({ videoPlacement = 'sidebar', prefill = {}, showSidebarVideo = true }) => {
  // --- UI state from your original file ---
  const [eventType, setEventType] = useState('Single event');
  // const [locationType, setLocationType] = useState('Venue');
  // const [startDate, setStartDate] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  const [showEndTime, setShowEndTime] = useState(false);
  const [timezone, setTimezone] = useState('(GMT+05:30) India Standard Time - Colombo');
  // const [organizerPage, setOrganizerPage] = useState('nikhil pandey (0 subscribers)');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // const { user } = useContext(authDataContext);
  const { user } = useContext(authDataContext);
  // console.log(user)
  //  console.log(user.firstName, user.lastName, user.email); // ab defined aayega

  const [organizerPage, setOrganizerPage] = useState(
    user ? `${user.firstName} ${user.lastName}  ${user.email} ` : "nikhil pandey (0 subscribers)"
  );




  // --- Form data state ---
  // const [eventName, setEventName] = useState('');
  // const [description, setDescription] = useState('');
  // const [venue, setVenue] = useState({ name: '', address: '', city: '' });
  // const [bannerFile, setBannerFile] = useState(null);
  // const [bannerPreview, setBannerPreview] = useState(null);

  // const [recorded, setRecorded] = useState({
  //   hostedOn: 'Youtube',
  //   hostedLink: '',
  //   uploadedFile: null,
  // });

    const { resetEventData } = useContext(EventContext);

  useEffect(() => {
    // ✅ Clear old event data when new form opens
    resetEventData();
  }, []);





  const [eventName, setEventName] = useState(prefill.name || '');
  const [description, setDescription] = useState(prefill.description || '');
  const [venue, setVenue] = useState({
    name: prefill.venueName || '',
    address: prefill.venueAddress || '',
    city: prefill.venueCity || ''
  });
  const [startDate, setStartDate] = useState(prefill.startDate || '');
  const [startTime, setStartTime] = useState(prefill.startTime || '');
  const [endTime, setEndTime] = useState(prefill.endTime || '');
  const [locationType, setLocationType] = useState(prefill.locationType || 'Venue');
  const [recorded, setRecorded] = useState({
    hostedOn: prefill.recorded?.hostedOn || 'Youtube',
    hostedLink: prefill.recorded?.hostedLink || '',
    uploadedFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);



  const locationTypes = [
    { id: 'Venue', icon: MapPin, title: 'Venue', description: 'Host in-person events with check-in management.' },
    { id: 'Online', icon: Globe, title: 'Online', description: 'Host virtual events, sharing access with ticket buyers.' },
    { id: 'Recorded events', icon: MonitorPlay, title: 'Recorded events', description: 'Provide instant access to pre-recorded content after purchase.' },
  ];

  // --- Handlers ---
  const toggleEndTime = () => setShowEndTime(!showEndTime);

  // const handleBannerChange = (e) => {
  //   const file = e.target.files?.[0] || null;
  //   setBannerFile(file);
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setBannerPreview(url);
  //   } else {
  //     setBannerPreview(null);
  //   }
  // };

  const handleOpenVideoModal = () => setIsVideoModalOpen(true);
  const handleCloseVideoModal = () => setIsVideoModalOpen(false);

  // Simple client-side validation (light) ye hatana hai 
  const validate = () => {
    if (!eventName.trim()) {
      setErrorMessage('Event name is required.');
      return false;
    }
    if ((locationType === 'Venue') && !venue.name.trim()) {
      setErrorMessage('Venue name is required for Venue events.');
      return false;
    }
    if (locationType === 'Recorded events') {
      if (recorded.hostedOn !== 'Upload' && !recorded.hostedLink.trim()) {
        setErrorMessage('Please provide the link for your recorded event.');
        return false;
      }
      if (recorded.hostedOn === 'Upload' && !recorded.uploadedFile) {
        setErrorMessage('Please upload your recorded video file.');
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  





  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validate()) return;

    setIsSubmitting(true);
    setMessage(null);
    setErrorMessage(null);
    setUploadProgress(0);

    try {
      // Build form data
      const formData = new FormData();
      formData.append('name', eventName);
      formData.append('description', description);
      formData.append('eventType', eventType);
      formData.append('locationType', locationType);
      formData.append('startDate', startDate);
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);
      formData.append('timezone', timezone);
      formData.append('organizerPage', organizerPage);

      // Venue fields
      formData.append('venueName', venue.name || '');
      formData.append('venueAddress', venue.address || '');
      formData.append('venueCity', venue.city || '');
      // formData.append("image", imageFile); // if image uploaded
      formData.append("image", imageFile);


     

      // Banner file
      // if (bannerFile) formData.append('banner', bannerFile);

      // Recorded event data
      if (locationType === 'Recorded events') {
        formData.append('recorded.hostedOn', recorded.hostedOn);
        if (recorded.hostedOn === 'Upload' && recorded.uploadedFile) {
          formData.append('recorded.file', recorded.uploadedFile);
        } else {
          formData.append('recorded.link', recorded.hostedLink || '');
        }
      }

      // Example: add a JSON snapshot for debugging (optional)
      // formData.append('meta', JSON.stringify({ createdBy: 'frontend' }));

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
        timeout: 120000, // 2 min
      };

  const resp = await axios.post("https://events-backend2-nwra.onrender.com/api/events", formData, config);
      setMessage('Event created successfully.');
      setErrorMessage(null);
      // console.log(formData)
      
      navigate("/event-edit")
      // Reset form lightly (you can tailor to prefer staying on page)
      setEventName('');
      setDescription('');
      setVenue({ name: '', address: '', city: '' });
      setBannerFile(null);
      setBannerPreview(null);
      setRecorded({ hostedOn: 'Youtube', hostedLink: '', uploadedFile: null });
      setUploadProgress(0);
    } catch (err) {
      console.error(err);
      const serverMessage = err?.response?.data?.message || err.message || 'Failed to create event.';
      setErrorMessage(serverMessage);
    } finally {
      setIsSubmitting(false);
      // release object URL
      if (bannerPreview) {
        URL.revokeObjectURL(bannerPreview);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      {showSidebarVideo && videoPlacement !== 'none' && (
        <header className="sticky top-0 left-0 w-full bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-20 border-b border-gray-100">
          <div className="flex items-center">
            <div className="flex items-center">
              <svg width="24" height="24" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-6 w-6'>
                <circle cx="27" cy="27" r="27" fill="#00BCD4" />
                <text x="13" y="37" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">ae</text>
              </svg>
              <span className="font-semibold text-xl text-gray-800 ml-2">allevents</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800 text-base font-medium">
              <Plus className="w-4 h-4 mr-1" /> Create Event
            </button>
            <Headset className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="relative cursor-pointer">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-red-700/80">
                <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="20" height="20" fill="white" fillOpacity="0" />
                  <path d="M10 0L20 10L10 20L0 10L10 0Z" fill="white" />
                  <path d="M10 0L15 5L10 10L5 5L10 0Z" fill="#C42B2B" />
                  <path d="M10 10L15 5L10 0L5 5L10 10Z" fill="#C42B2B" />
                  <path d="M10 10L15 15L10 20L5 15L10 10Z" fill="#C42B2B" />
                </svg>
              </div>
              <ChevronDown className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500" />
            </div>
          </div>
        </header>
      )}

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 lg:mt-8 relative z-10 p-4 sm:p-6 lg:p-8 pt-0">
        <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create an event</h1>

          <div className="mb-8">
            <label htmlFor="eventName" className="block text-lg font-medium text-gray-700 mb-2">Event Name *</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter the name of your event"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
            />
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
            <p className="text-gray-600 mb-4">Choose where your event will take place.</p>
            <label className="block text-lg font-medium text-gray-700 mb-4">Where will your event take place?</label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locationTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = locationType === item.id;
                return (
                  <div
                    key={item.id}
                    className={`p-5 border relative rounded-lg cursor-pointer transition duration-150 ease-in-out ${isSelected ? 'border-green-500 ring-1 ring-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'}`}
                    onClick={() => setLocationType(item.id)}
                  >
                    {isSelected && <Check className="absolute top-2 right-2 w-5 h-5 text-green-500" />}
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="p-3 bg-gray-100 rounded-full mb-3">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-600 mt-auto">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {locationType === 'Venue' && <VenueLocationFields venue={venue} setVenue={setVenue} />}
            {locationType === 'Recorded events' && <RecordedEventFields recorded={recorded} setRecorded={setRecorded} />}

          </div>

          {(locationType === 'Venue' || locationType === 'Online') && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Date and time</h2>
              <p className="text-gray-600 mb-4">Select the event date, time, and timezone.</p>

              <label className="block text-lg font-medium text-gray-700 mb-2">Event type *</label>
              <div className="flex space-x-3 mb-6">
                <button type="button" className={`flex items-center px-4 py-2 border rounded-full text-base font-medium transition duration-150 ${eventType === 'Single event' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setEventType('Single event')}>
                  Single event {eventType === 'Single event' && <Check className="w-4 h-4 ml-2" />}
                </button>

                <button type="button" className={`flex items-center px-4 py-2 border rounded-full text-base font-medium transition duration-150 ${eventType === 'Recurring event' ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={() => setEventType('Recurring event')}>
                  Recurring event {eventType === 'Recurring event' && <Check className="w-4 h-4 ml-2" />}
                </button>
              </div>

              {eventType === 'Single event' && (
                <>
                  <div className="flex flex-wrap items-end gap-4 mb-6">
                    <div className="flex-1 min-w-[150px]">
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start date *</label>
                      <div className="relative">
                        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base appearance-none focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-[120px]">
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start time *</label>
                      <div className="relative">
                        <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                    </div>

                    {!showEndTime ? (
                      <button type="button" onClick={toggleEndTime} className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap pt-7 sm:pt-0">
                        <Plus className="w-4 h-4 mr-1" /> Add end time
                      </button>
                    ) : (
                      <>
                        <div className="flex-1 min-w-[120px]">
                          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End time</label>
                          <div className="relative">
                            <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
                          </div>
                        </div>
                        <button type="button" onClick={toggleEndTime} className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap pt-7 sm:pt-0" style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                          - Remove End Time
                        </button>
                      </>
                    )}
                  </div>

                  <div className="max-w-md">
                    <label htmlFor="timezone" className="block text-lg font-medium text-gray-700 mb-2">Time Zone *</label>
                    <div className="relative">
                      <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base pr-10 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                        <option>{timezone}</option>
                        <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                        <option>(GMT+01:00) Central European Time</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {eventType === 'Recurring event' && (
                <>
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1 min-w-[120px]">
                      <label htmlFor="startTimeRec" className="block text-sm font-medium text-gray-700 mb-1">Start time *</label>
                      <div className="relative">
                        <input type="time" id="startTimeRec" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-[120px]">
                      <label htmlFor="endTimeRec" className="block text-sm font-medium text-gray-700 mb-1">End time</label>
                      <div className="relative">
                        <input type="time" id="endTimeRec" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-md bg-green-50 border border-green-200 text-sm text-green-700 mb-6">
                    <p><span className="font-semibold">Note: You'll be able to add dates/occurrences to your event in the next step.</span></p>
                  </div>

                  <div className="max-w-md">
                    <label htmlFor="timezoneRec" className="block text-lg font-medium text-gray-700 mb-2">Time Zone *</label>
                    <div className="relative">
                      <select id="timezoneRec" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base pr-10 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                        <option>{timezone}</option>
                        <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                        <option>(GMT+01:00) Central European Time</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="mb-10">
            <label htmlFor="eventDescription" className="block text-lg font-medium text-gray-700 mb-2">Event Description *</label>
            <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <div className="flex justify-between items-center p-2 border-b bg-gray-50">
                <div className="flex space-x-2">
                  <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded font-bold">B</button>
                  <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded italic">I</button>
                  <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded underline">U</button>
                  <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded">⋯</button>
                  <button type="button" className="p-1 text-gray-600 hover:bg-gray-200 rounded">⋯</button>
                </div>
                <button type="button" className="flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700 transition">
                  <Zap className="w-4 h-4 mr-1" /> Generate using AI
                </button>
              </div>

              <textarea id="eventDescription" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full p-3 border-0 resize-none focus:ring-0 text-base" placeholder="Enter event details..."></textarea>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Organizer Page</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-gray-400">
                  <div className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-red-700/80">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0" y="0" width="20" height="20" fill="white" fillOpacity="0" />
                      <path d="M10 0L20 10L10 20L0 10L10 0Z" fill="white" />
                      <path d="M10 0L15 5L10 10L5 5L10 0Z" fill="#C42B2B" />
                      <path d="M10 10L15 5L10 0L5 5L10 10Z" fill="#C42B2B" />
                      <path d="M10 10L15 15L10 20L5 15L10 10Z" fill="#C42B2B" />
                    </svg>
                  </div>
                  {/* <span className="text-gray-700 text-base flex-1 truncate">{user?.firstName || organizerPage} </span> */}
                  <div className="organizer-section">
                    <label>Organizer:</label>
                    <span className="text-gray-700 text-base flex-1 truncate">
                      {user ? `${user.firstName} ${user.lastName}  ` : organizerPage}
                    </span>
                  </div>


                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                </div>
              </div>
              <button type="button" className="flex items-center text-indigo-600 hover:text-indigo-800 text-base font-medium whitespace-nowrap">
                <Plus className="w-4 h-4 mr-1" /> Create new organizer page
              </button>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                {errorMessage && <div className="text-sm text-red-600 mb-2">{errorMessage}</div>}
                {message && <div className="text-sm text-green-600 mb-2">{message}</div>}
                {isSubmitting && uploadProgress > 0 && <div className="text-sm text-gray-800 mb-2">Uploading: {uploadProgress}%</div>}
              </div>
              <button 
                type="submit"
                // disabled={isSubmitting}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {/* {isSubmitting ? 'Saving...' : 'Continue'}*/}
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {/* <aside className="lg:col-span-1 space-y-8"> 
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="relative h-48 bg-gray-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-900/60"></div>
              <img src={logo} alt="AllEvents Logo" className="absolute top-4 left-4 h-8 w-auto text-white" />
              <button
                type="button"
                className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center text-indigo-600 hover:bg-white transition z-10"
                aria-label="Play video"
                onClick={handleOpenVideoModal}
              >
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Here's a video to help you get started!</h3>
              <p className="text-sm text-gray-600">Check out this guide to learn how to make the most of AllEvents.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Import your events from other platforms</h3>
            <p className="text-sm text-gray-600 mb-4">Have you already published your events on other platforms like Facebook, Eventbrite or your own website?</p>
            <button type="button" className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition duration-150">Import now</button>
          </div>

         
        </aside> */}

        {/* Sidebar */}
        {showSidebarVideo && videoPlacement !== 'none' && (
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="relative h-48 bg-gray-800 flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-900/60"></div>
                <img src={logo} alt="AllEvents Logo" className="absolute top-4 left-4 h-8 w-auto text-white" />
                <button
                  type="button"
                  className="w-16 h-16 bg-white/70 rounded-full flex items-center justify-center text-indigo-600 hover:bg-white transition z-10"
                  aria-label="Play video"
                  onClick={handleOpenVideoModal}
                >
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Here's a video to help you get started!</h3>
                <p className="text-sm text-gray-600">Check out this guide to learn how to make the most of AllEvents.</p>
              </div>

            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Import your events from other platforms</h3>
              <p className="text-sm text-gray-600 mb-4">Have you already published your events on other platforms like Facebook, Eventbrite or your own website?</p>
              <button type="button" className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition duration-150">Import now</button>
            </div>
          </aside>

        )}

      </form>

      {/* Video Modal */}
      {showSidebarVideo && isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-80" onClick={handleCloseVideoModal}></div>

          <div className="relative w-full max-w-5xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl lg:max-w-5xl">
            <div className="flex justify-between items-center p-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center">
                <img src={logo} alt="AllEvents Logo" className="h-6 w-auto mr-2" />
                <span className="text-sm sm:text-base font-semibold text-white">#1 Event Ticketing Platform to Sell Tickets Online - AllEvents</span>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white flex items-center text-sm">
                  <Copy className="w-4 h-4 mr-1" /> Copy link
                </button>
                <button className="text-gray-400 hover:text-white" onClick={handleCloseVideoModal} aria-label="Close video">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="relative pt-[56.25%] bg-black">

              <iframe
                className="absolute inset-0 w-full h-full"
                src={sampleVedio}
                title="How to create events"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFormPage;









