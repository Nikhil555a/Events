
import React, { useState, useContext } from "react";
import SideTicketBar from "../components/SideTicketBar";
import { EventContext } from "../context/EventContext";

const AddTicket = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketLink, setTicketLink] = useState("");
  const { tickets, addTicket } = useContext(EventContext);

  const features = [
    { icon: "⭐️", title: "Top rankings & better visibility on search engines", bgColor: "bg-blue-50", iconColor: "text-blue-500" },
    { icon: "⚡", title: "Instant & direct payments to your account", bgColor: "bg-yellow-50", iconColor: "text-yellow-500" },
    { icon: "🔔", title: "Booking reminders for incomplete transactions", bgColor: "bg-red-50", iconColor: "text-red-500" },
  ];

  const FeatureBox = ({ icon, title, bgColor, iconColor }) => (
    <div className={`p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-full ${bgColor}`}>
      <div className={`text-4xl mb-3 p-2 rounded-full ${iconColor} bg-white shadow-md`}>{icon}</div>
      <p className="text-gray-700 font-medium">{title}</p>
    </div>
  );

  const handleSaveTicket = (ticketData) => {
    addTicket(ticketData);
    setIsDrawerOpen(false);
  };





  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add Tickets</h1>
        <button onClick={() => setIsDrawerOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">+ Add Ticket</button>
      </div>

      {tickets.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {features.map((feature, i) => <FeatureBox key={i} {...feature} />)}
        </div>
      ) : (
        <>
          <table className="w-full border border-gray-200 rounded-lg mb-6">
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
                <tr key={index} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{ticket.name}</td>
                  <td className="p-2 border">{ticket.type}</td>
                  <td className="p-2 border">{ticket.type === "Paid" ? `${ticket.price} ${ticket.currency}` : "-"}</td>
                  <td className="p-2 border">{ticket.ticketsOnSale}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="mb-6">
            <p className="text-gray-700 font-medium mb-2">Link to your ticketing website</p>
            <input
              type="url"
              placeholder="Link of your website or external ticketing platform"
              value={ticketLink}
              onChange={(e) => setTicketLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </section>

          <div className="flex justify-end mb-6">
            <button className="px-6 py-3 rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700">Next</button>
          </div>
        </>
      )}

      <SideTicketBar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveTicket}
        eventId={localStorage.getItem("currentEventId")}
      />
    </div>
  );
};

export default AddTicket;




// import React, { useState, useContext } from "react";
// import SideTicketBar from "../components/SideTicketBar";
// import { EventContext } from "../context/EventContext";

// const AddTicket = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [ticketLink, setTicketLink] = useState("");
//   const { tickets, addTicket } = useContext(EventContext);

//   const currentEvent = JSON.parse(localStorage.getItem("currentEvent")); // ✅ current event data
//   const organizerPage = currentEvent?.organizerPage || "Unknown Organizer"; // ✅ organizer name

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
//     addTicket(ticketData, organizerPage); // ✅ save with organizer name
//     setIsDrawerOpen(false);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Add Tickets</h1>
//         <button onClick={() => setIsDrawerOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">+ Add Ticket</button>
//       </div>

//       {tickets.filter(t => t.organizerPage === organizerPage).length === 0 ? (
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
//               {tickets
//                 .filter((t) => t.organizerPage === organizerPage) // ✅ show only related tickets
//                 .map((ticket, index) => (
//                   <tr key={index} className="text-center">
//                     <td className="p-2 border">{index + 1}</td>
//                     <td className="p-2 border">{ticket.name}</td>
//                     <td className="p-2 border">{ticket.type}</td>
//                     <td className="p-2 border">{ticket.type === "Paid" ? `${ticket.price} ${ticket.currency}` : "-"}</td>
//                     <td className="p-2 border">{ticket.ticketsOnSale}</td>
//                   </tr>
//                 ))}
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

