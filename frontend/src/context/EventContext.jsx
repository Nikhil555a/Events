
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://events-backend2-nwra.onrender.com/api/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    }
  };

  const addTicket = (ticketData) => {
    setTickets((prev) => [ticketData, ...prev]);
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      localStorage.removeItem(`eventBanner_${id}`);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Reset data for new event
  const resetEventData = () => {
    setTickets([]);
    setBanner(null);
    setBannerPreview(null);
    localStorage.removeItem("currentEventId");
  };

  // Persist Banner
  useEffect(() => {
    const currentEventId = localStorage.getItem("currentEventId");
    if (currentEventId) {
      const savedBanner = localStorage.getItem(`eventBanner_${currentEventId}`);
      if (savedBanner) setBannerPreview(savedBanner);
    }
  }, []);

  useEffect(() => {
    if (bannerPreview) {
      const currentEventId = localStorage.getItem("currentEventId");
      if (currentEventId) {
        localStorage.setItem(`eventBanner_${currentEventId}`, bannerPreview);
      }
    }
  }, [bannerPreview]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        fetchEvents,
        deleteEvent,
        tickets,
        addTicket,
        banner,
        setBanner,
        bannerPreview,
        setBannerPreview,
        resetEventData, // ✅ export reset function
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
