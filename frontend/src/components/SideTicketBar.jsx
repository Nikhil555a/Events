
import React, { useState } from "react";
import axios from "axios";

const SideTicketBar = ({ isOpen, onClose, onSave, eventId }) => {
  const [ticketType, setTicketType] = useState("Paid");

  const [ticketData, setTicketData] = useState({
    name: "",
    ticketsOnSale: 0,
    price: 0,
    currency: "INR",
    description: "",
    minDonation: 0,
    maxDonation: 0,
    additionalInstruction: "",
    salesStart: "",
    salesEnd: "",
    minTickets: 0,
    maxTickets: 20,
    groupName: "",
  });

  if (!isOpen) return null;

  const ticketTypes = ["Paid", "Free", "Donation"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTicketData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      const organizerPage = localStorage.getItem("currentOrganizerName") || "";

      const ticketPayload = {
        name: ticketType === "Donation" ? "Donation" : ticketData.name,
        type: ticketType,
        ticketsOnSale: ticketData.ticketsOnSale,
        price: ticketType === "Paid" ? ticketData.price : 0,
        currency: ticketData.currency,
        description: ticketData.description,
        minDonation: ticketType === "Donation" ? ticketData.minDonation : 0,
        maxDonation: ticketType === "Donation" ? ticketData.maxDonation : 0,
        additionalInstruction: ticketData.additionalInstruction,
        salesStart: ticketData.salesStart,
        salesEnd: ticketData.salesEnd,
        minTickets: ticketData.minTickets,
        maxTickets: ticketData.maxTickets,
        groupName: ticketData.groupName,
        organizerPage, // ✅ include organizer info
      };

      const response = await axios.post(
        `https://events-backend2-nwra.onrender.com/api/events/${eventId}/tickets`,
        { tickets: [ticketPayload] }
      );

      console.log("Ticket saved:", response.data);

      // ✅ Pass full ticket info (with organizer) back to AddTicket state
      if (onSave) onSave({ ...ticketPayload, _id: response.data.tickets[0]._id });

   
      onClose();
    } catch (error) {
      console.error("Error saving ticket:", error);
      alert("Error saving ticket. Check console for details.");
    }
  };

  // --- Shared fields ---
  const SharedTicketFields = (placeholder = "Ex. Early bird, VIP") => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ticket name*</label>
        <input
          type="text"
          id="name"
          placeholder={placeholder}
          value={ticketData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of ticket(s) on sale*</label>
        <input
          type="number"
          id="ticketsOnSale"
          value={ticketData.ticketsOnSale}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </>
  );

  const CurrencyField = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Currency*</label>
      <select
        id="currency"
        value={ticketData.currency}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option>USD ($)</option>
        <option>INR (₹)</option>
      </select>
    </div>
  );

  const TicketDescriptionField = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Ticket description</label>
      <textarea
        id="description"
        value={ticketData.description}
        onChange={handleChange}
        placeholder="Type your description here"
        rows="3"
        className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  // --- JSX ---
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-600 bg-opacity-50" onClick={onClose}></div>
      <section className="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-xl transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          <header className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create new tickets</h2>
              <p className="text-sm text-gray-500">Add or edit tickets</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>✕</button>
          </header>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select ticket*</label>
              <div className="flex space-x-3">
                {ticketTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTicketType(type)}
                    className={`flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium ${
                      ticketType === type
                        ? "border-green-500 text-green-600 bg-white shadow-sm ring-1 ring-green-500"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {ticketType === "Paid" && (
              <>
                {SharedTicketFields()}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ticket price*</label>
                  <input
                    type="number"
                    id="price"
                    value={ticketData.price}
                    onChange={handleChange}
                    placeholder="Ticket price"
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {TicketDescriptionField()}
              </>
            )}

            {ticketType === "Free" && (
              <>
                {SharedTicketFields()}
                {CurrencyField()}
                {TicketDescriptionField()}
              </>
            )}

            {ticketType === "Donation" && (
              <>
                {SharedTicketFields("Donation")}
                {CurrencyField()}
                <div className="flex space-x-4">
                  <input
                    type="number"
                    id="minDonation"
                    value={ticketData.minDonation}
                    onChange={handleChange}
                    placeholder="Min 0"
                    className="w-1/2 border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    id="maxDonation"
                    value={ticketData.maxDonation}
                    onChange={handleChange}
                    placeholder="Max"
                    className="w-1/2 border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          <footer className="p-4 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0 bg-white">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">Reset</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">Save</button>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default SideTicketBar;


// sahi hai thoda thoda 
// import React, { useState, useEffect } from "react";

// const SideTicketBar = ({ isOpen, onClose, onSave }) => {
//   const [ticketType, setTicketType] = useState("Paid");
//   const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

//   // Form states
//   const [ticketName, setTicketName] = useState("");
//   const [numTickets, setNumTickets] = useState(0);
//   const [ticketPrice, setTicketPrice] = useState(0);
//   const [currency, setCurrency] = useState("USD ($)");
//   const [description, setDescription] = useState("");
//   const [minDonation, setMinDonation] = useState(0);
//   const [maxDonation, setMaxDonation] = useState("");

//   useEffect(() => {
//     if (ticketType === "Donation") {
//       setTicketName("Donation");
//     } else {
//       setTicketName("");
//     }
//   }, [ticketType]);

//   if (!isOpen) return null;

//   const ticketTypes = ["Paid", "Free", "Donation"];

//   const handleSave = () => {
//     const ticketData = {
//       name: ticketName,
//       type: ticketType,
//       price: ticketType === "Paid" ? Number(ticketPrice) : 0,
//       currency,
//       ticketsOnSale: Number(numTickets),
//       description,
//       minDonation: ticketType === "Donation" ? Number(minDonation) : 0,
//       maxDonation: ticketType === "Donation" ? Number(maxDonation) : 0,
//     };
//     onSave(ticketData);
//     // Reset form after save
//     setTicketName("");
//     setNumTickets(0);
//     setTicketPrice(0);
//     setCurrency("USD ($)");
//     setDescription("");
//     setMinDonation(0);
//     setMaxDonation("");
//     setTicketType("Paid");
//     setIsMoreOptionsOpen(false);
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-gray-600 bg-opacity-50"
//         onClick={onClose}
//       ></div>

//       {/* Drawer */}
//       <section className="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-xl flex flex-col">
//         {/* Header */}
//         <header className="p-6 border-b border-gray-200 flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Create new tickets
//             </h2>
//             <p className="text-sm text-gray-500">Add or edit tickets</p>
//           </div>
//           <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </button>
//         </header>

//         {/* Form Content */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6">
//           {/* Ticket Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select ticket*
//             </label>
//             <div className="flex space-x-3">
//               {ticketTypes.map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => setTicketType(type)}
//                   className={`flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium ${
//                     ticketType === type
//                       ? "border-green-500 text-green-600 bg-white shadow-sm ring-1 ring-green-500"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Ticket Name & Number of Tickets */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Ticket name*
//             </label>
//             <input
//               type="text"
//               placeholder={
//                 ticketType === "Donation"
//                   ? "Donation"
//                   : "Ex. Early bird, VIP, Gold, Silver etc."
//               }
//               value={ticketName}
//               onChange={(e) => setTicketName(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Number of ticket(s) on sale*
//             </label>
//             <input
//               type="number"
//               placeholder="Number of ticket(s) on sale"
//               value={numTickets}
//               onChange={(e) => setNumTickets(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Price for Paid */}
//           {ticketType === "Paid" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Ticket price*
//               </label>
//               <input
//                 type="number"
//                 placeholder="Ticket price"
//                 value={ticketPrice}
//                 onChange={(e) => setTicketPrice(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           )}

//           {/* Currency */}
//           {(ticketType === "Free" || ticketType === "Donation") && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Currency*
//               </label>
//               <select
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
//               >
//                 <option>USD ($)</option>
//                 <option>INR (₹)</option>
//               </select>
//             </div>
//           )}

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Ticket description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Type your description here"
//               rows="3"
//               className="w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
//             ></textarea>
//           </div>

//           {/* Donation Amount */}
//           {ticketType === "Donation" && (
//             <div className="flex space-x-4">
//               <input
//                 type="number"
//                 placeholder="Min 0"
//                 value={minDonation}
//                 onChange={(e) => setMinDonation(e.target.value)}
//                 className="w-1/2 border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Max maximum"
//                 value={maxDonation}
//                 onChange={(e) => setMaxDonation(e.target.value)}
//                 className="w-1/2 border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           )}
//         </div>

//         {/* Footer Buttons */}
//         <footer className="p-4 border-t border-gray-200 flex justify-end space-x-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </footer>
//       </section>
//     </div>
//   );
// };

// export default SideTicketBar;
