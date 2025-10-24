
import React, { useContext } from "react";
import { EventContext } from "../context/EventContext";

import Wrapper from "../components/Wrapper";
import Hero from "../components/Hero";
import Artish from "../components/Artish";
import Navbar from "../components/Navbar";
import Date from "../components/Date";
import PopularEvents from "../components/PopularEvents";
import OrganizersList from "../components/OrganizersList";
import Box from "../components/Box";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import DiscoverEvent from "../components/DiscoverEvent";
import EventFilters from "../components/EventFilters";
import Categories from "../components/Categories";
import EventCurator from "../components/EventCurator";

import EventCard from "../components/EventCard";

function HomePage() {
  const { events } = useContext(EventContext);

  return (
    <>
      <Navbar />
      <Wrapper>
        <Hero />

        {/* Event Cards */}
           <h2 className="text-3xl font-bold text-gray-800   ">Event For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 w-full max-w-[1150px] mx-auto flex-col items-center ">
          {events && events.length > 0 ? (
            events.map((event) => <EventCard key={event._id} event={event} />)
          ) : (
            <p className="text-gray-500">No events yet!</p>
          )}
        </div>





        <Categories />
        <Artish />
        <EventCurator />
        <Date />
        <PopularEvents />
        <Box />
        <OrganizersList />
      </Wrapper>

      <DiscoverEvent />
      <EventFilters />
      <Newsletter />
      <Footer />
    </>
  );
}

export default HomePage;
