
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, ArrowLeft, Calendar, Clock, Globe2, User, Ticket } from "lucide-react";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        const [eventRes, ticketsRes] = await Promise.all([
          axios.get(`https://events-backend2-nwra.onrender.com/api/events/${id}`),
          axios.get(`https://events-backend2-nwra.onrender.com/api/events/${id}/tickets`),
        ]);

        setEvent(eventRes.data);
        setTickets(ticketsRes.data.tickets);
      } catch (err) {
        console.error("Error fetching event/tickets:", err);
        setError("Failed to load event or tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndTickets();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading event details...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not specified";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
  
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Event Banner */}
      <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg mb-6">
        <img
          src={event.imageUrl || event.banner || "/default-banner.jpg"}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.name}</h1>

      {/* Organizer */}
      <p className="text-gray-600 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" /> Organizer: {event.organizerPage || "No info"}
      </p>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {event.description || "No description provided"}
      </p>

      {/* Event Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="text-gray-500 w-5 h-5" />
          <p className="text-gray-700">
            <span className="font-medium">Start Date:</span> {formatDate(event.startDate)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="text-gray-500 w-5 h-5" />
          <p className="text-gray-700">
            <span className="font-medium">Start Time:</span> {event.startTime || "Not specified"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Globe2 className="text-gray-500 w-5 h-5" />
          <p className="text-gray-700">
            <span className="font-medium">Timezone:</span> {event.timezone || "Not specified"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-gray-500 w-5 h-5" />
          <p className="text-gray-700">
            <span className="font-medium">City:</span> {event.venueCity || "N/A"}
          </p>
        </div>
      </div>

      {/* Tickets Table */}
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <Ticket className="w-5 h-5" /> Tickets
      </h2>

      {tickets.length > 0 ? (
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Tickets on Sale</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, index) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{t.name}</td>
                  <td className="px-4 py-2 border text-center">{t.type}</td>
                  <td className="px-4 py-2 border text-center">
                    {t.type === "Free" ? "Free" : `${t.price} ${t.currency}`}
                  </td>
                  <td className="px-4 py-2 border text-center">{t.ticketsOnSale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No tickets available for this event.</p>
      )}
    </div>
    </>
  );
};

export default EventDetailsPage;
