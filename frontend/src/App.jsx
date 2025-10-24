
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { EventProvider } from "./context/EventContext";

import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventFormPage from "./pages/EventFormPage";
import EventEditForm from "./pages/EventEditForm";
import EventDetailsPage from "./pages/EventDetailsPage";

export default function App() {
  return (
    <EventProvider>
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Create Event Pages */}
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/event-form" element={<EventFormPage />} />
          <Route path="/event-edit" element={<EventEditForm />} />
             <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}
