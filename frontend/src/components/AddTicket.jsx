
// import React, { useState, useContext } from "react";
// import SideTicketBar from "../components/SideTicketBar";
// import { EventContext } from "../context/EventContext";

// const AddTicket = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [ticketLink, setTicketLink] = useState("");
//   const { tickets, addTicket } = useContext(EventContext);

//   const features = [
//     { icon: "⭐️", title: "Top rankings & better visibility on search engines", bgColor: "bg-blue-50", iconColor: "text-blue-500" },
//     { icon: "⚡", title: "Instant & direct payments to your account", bgColor: "bg-yellow-50", iconColor: "text-yellow-500" },
//     { icon: "🔔", title: "Booking reminders for incomplete transactions", bgColor: "bg-red-50", iconColor: "text-red-500" },
//   ];

//   const FeatureBox = ({ icon, title, bgColor, iconColor }) => (
//     <div className={`p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-full ${bgColor}`}>
//       <div className={`text-4xl mb-3 p-2 rounded-full ${iconColor} bg-white shadow-md`}>{icon}</div>
//       <p className="text-gray-700 font-medium">{title}</p>
//     </div>
//   );

//   const handleSaveTicket = (ticketData) => {
//     addTicket(ticketData);
//     setIsDrawerOpen(false);
//   };





//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Add Tickets</h1>
//         <button onClick={() => setIsDrawerOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">+ Add Ticket</button>
//       </div>

//       {tickets.length === 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           {features.map((feature, i) => <FeatureBox key={i} {...feature} />)}
//         </div>
//       ) : (
//         <>
//           <table className="w-full border border-gray-200 rounded-lg mb-6">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="p-2 border">No.</th>
//                 <th className="p-2 border">Ticket Name</th>
//                 <th className="p-2 border">Type</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Tickets on Sale</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tickets.map((ticket, index) => (
//                 <tr key={index} className="text-center">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{ticket.name}</td>
//                   <td className="p-2 border">{ticket.type}</td>
//                   <td className="p-2 border">{ticket.type === "Paid" ? `${ticket.price} ${ticket.currency}` : "-"}</td>
//                   <td className="p-2 border">{ticket.ticketsOnSale}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <section className="mb-6">
//             <p className="text-gray-700 font-medium mb-2">Link to your ticketing website</p>
//             <input
//               type="url"
//               placeholder="Link of your website or external ticketing platform"
//               value={ticketLink}
//               onChange={(e) => setTicketLink(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </section>

//           <div className="flex justify-end mb-6">
//             <button className="px-6 py-3 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700">Next</button>
//           </div>
//         </>
//       )}

//       <SideTicketBar
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         onSave={handleSaveTicket}
//         eventId={localStorage.getItem("currentEventId")}
//       />
//     </div>
//   );
// };

// export default AddTicket;





import React, { useState, useContext } from "react";
import SideTicketBar from "../components/SideTicketBar";
import { EventContext } from "../context/EventContext";

const AddTicket = ({onNext}) => {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketLink, setTicketLink] = useState("");
  // Get state and function from context
  const { tickets, addTicket } = useContext(EventContext); 

  const features = [
    {
      icon: "⭐️",
      title: "Top rankings & better visibility on search engines",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: "⚡",
      title: "Instant & direct payments to your account",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      icon: "🔔",
      title: "Booking reminders for incomplete transactions",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  const FeatureBox = ({ icon, title, bgColor, iconColor }) => (
    <div
      className={`p-6 rounded-lg shadow-sm flex flex-col items-center justify-between text-center h-full ${bgColor}`}
    >
      <div
        className={`text-4xl mb-4 p-3 rounded-full bg-white shadow-md ${iconColor}`}
      >
        {icon}
      </div>
      <p className="text-gray-700 font-medium text-sm leading-relaxed">
        {title}
      </p>
    </div>
  );

  const handleSaveTicket = (ticketData) => {
    addTicket(ticketData);
    setIsDrawerOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Tickets</h1>
          <p className="text-gray-600 text-sm mt-1">
            Adding tickets to your event increases its visibility in AllEvents
            marketing campaigns.
          </p>
        </div>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          🎟️ Add tickets
        </button>
      </div>

      {/* Feature Section / Ticket List */}
      {tickets.length === 0 ? (
        <>
          {/* 3 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full">
            {features.map((feature, i) => (
              <FeatureBox key={i} {...feature} />
            ))}
          </div>

          {/* Add Ticket Button (same width as one card) */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-blue-600 text-white font-semibold w-full  py-3 rounded-md hover:bg-blue-700 transition"
            >
              + Add Ticket
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center mb-6">
            <span className="border-t border-gray-300 w-1/4"></span>
            <span className="mx-4 text-gray-500 text-sm">or</span>
            <span className="border-t border-gray-300 w-1/4"></span>
          </div>

          {/* External Link (same width as one card) */}
          <section className="text-center mb-8">
            <p className="text-gray-800 font-medium mb-2 flex items-start">
              Link to your ticketing website
            </p>
            <div className="flex justify-center">
              <input
                type="url"
                placeholder="Link of your website or external ticketing platform"
                value={ticketLink}
                onChange={(e) => setTicketLink(e.target.value)}
                className="w-full  border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </section>

          {/* Next Button (same width as one card) */}
          <div className="flex justify-end">
            <button 
             onClick={onNext} // ✅ call parent callback
             className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Ticket Table */}
          <table className="w-full border border-gray-200 rounded-lg mb-8">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">No.</th>
                <th className="p-2 border">Ticket Name</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Tickets on Sale</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{ticket.name}</td>
                  <td className="p-2 border">{ticket.type}</td>
                  <td className="p-2 border">
                    {ticket.type === "Paid"
                      ? `${ticket.price} ${ticket.currency}`
                      : "-"}
                  </td>
                  <td className="p-2 border">{ticket.ticketsOnSale}</td>
                </tr>
              ))}
            </tbody>
          </table>


          {/* Next Button */}
          <div  className="flex justify-end mb-6">
            <button
             onClick={onNext}

            
  
             className="px-6 py-3 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700">
              Next
            </button>
          </div>
        </>
      )}

      {/* Drawer */}
      <SideTicketBar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveTicket}
        // Added a placeholder for eventId
        eventId={localStorage.getItem("currentEventId") || "event-xyz-123"}
      />
    </div>
  );
};

export default AddTicket;
