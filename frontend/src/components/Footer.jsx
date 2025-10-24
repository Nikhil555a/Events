
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaRss,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi2";
import { FaChevronUp } from "react-icons/fa";
import hiring from "../assets/hiring.webp"
import appStore from '../assets/App-Store-Icon.webp';
import googlePlay from '../assets/Google-Play-Icon.webp';

const Footer = () => {
  const trendingSearches = [
    "Events & Things To Do In Jaipur This Weekend",
    "Navratri Events in Jaipur",
    "Events In Jaipur Today",
    "Kolkata Events",
    "Bhubaneswar Events",
    "Vadodara Events",
    "Pimpri Chinchwad Events",
    "Jashn-e-Raatri 2025 Tickets",
    "Osman Mir live in Ahmedabad",
    "Raas Raaga Garba",
    "Dandiya Dynamite 2025",
    "Rolling Loud India",
    "Amdavad GARBA® ft Rushabh Ahir",
    "Mandavadi - Garba & Mandli",
    "NO CAR DAY CYCLOTHON",
    "Shuniyam (શૂન્યમ્) - A Full Moon Festival",
    "Vibe With The Night",
    "9AURA - 2025",
  ];

  const events = [
    "ॐ नमः शिवाय",
    "jashn",
    "mukesh choudhary",
    "RITI RIWAZ DIWALI & WEDDING EXHIBITION",
    "Shimmer Diwali and Decor exhibition",
    "Dandiya Nights Celebration",
  ];

  const footerLinks = [
    "About",
    "Careers",
    "Support",
    "Media Coverage",
    "Terms of Service",
    "Privacy",
    "Contact Us",
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Trending Searches */}
        {/* <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-4">
            Trending Searches
          </h3>
          <div className="flex flex-wrap gap-2 items-center">
            {trendingSearches.map((search, index) => (
              <React.Fragment key={index}>
                <a
                  href="#"
                  className="px-3 py-1 text-sm hover:underline transition-colors whitespace-nowrap"
                >
                  {search}
                </a>
                {index < trendingSearches.length - 1 && (
                  <span className="text-gray-500">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div> */}

        {/* Trending Searches */}
<div className="mb-12">
  <h3 className="text-xl font-semibold text-white mb-4 text-center">
    Trending Searches
  </h3>

  {/* ✅ Desktop View (inline with | separators) */}
  <div className="hidden md:flex flex-wrap gap-5 lg:gap-2 items-center">
    {trendingSearches.map((search, index) => (
      <React.Fragment key={index}>
        <a
          href="#"
          className="px-3 py-1 text-sm hover:underline transition-colors whitespace-nowrap"
        >
          {search}
        </a>
        {index < trendingSearches.length - 1 && (
          <span className="text-gray-500">|</span>
        )}
      </React.Fragment>
    ))}
  </div>

  {/* ✅ Mobile View (column like screenshot) */}
  <div className="flex flex-col md:hidden gap-3 items-center text-center">
    {trendingSearches.map((search, index) => (
      <a
        key={index}
        href="#"
        className="text-sm hover:underline transition-colors"
      >
        {search}
      </a>
    ))}
  </div>
</div>


        <hr className="border-gray-700 mb-12" />




{/* Footer Columns */}
<div className="grid grid-cols-2 gap-8 mb-12 lg:grid-cols-4 text-left">

  {/* Host Events */}
  <div>
    <h4 className="text-white text-lg font-semibold mb-4">Host Events</h4>
    <ul className="space-y-2">
      <li><a href="#">Publish Your Events</a></li>
      <li><a href="#">Promote Your Events</a></li>
      <li><a href="#">Sell Tickets Online</a></li>
      <li><a href="#">Host Recorded Events</a></li>
      <li><a href="#">Pricing Plans</a></li>
      <li><a href="#">Event Manager App</a></li>
      <li><a href="#">Events API</a></li>
      <li><a href="#">Event Listing</a></li>
      <li><a href="#">Learn Event Marketing</a></li>
      <li><a href="#">Event Creation Guidelines</a></li>
    </ul>
  </div>

  {/* Discover Events */}
  <div>
    <h4 className="text-white text-lg font-semibold mb-4">Discover Events</h4>
    <ul className="space-y-2">
      <li><a href="#">Events for You</a></li>
      <li><a href="#">Virtual Events</a></li>
      <li><a href="#">Get Event Updates</a></li>
      <li><a href="#">Event Discovery App</a></li>
      <li><a href="#">Write for Us</a></li>
    </ul>
  </div>

  {/* Explore */}
  <div>
    <h4 className="text-white text-lg font-semibold mb-4">Explore</h4>
    <ul className="space-y-2">
      <li><a href="#">Event Listing Plugin</a></li>
      <li><a href="#">Media Kit</a></li>
      <li><a href="#">Affiliate Program</a></li>
      <li><a href="#">Support Center</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </div>

  {/* Stay Happening */}
  <div>
    <h4 className="text-white text-lg font-semibold mb-4">#StayHappening</h4>
    <p className="mb-4">
      Go-to place to discover events for more than 20M people globally.
    </p>
    <div className="flex justify-start items-center space-x-4 mb-4">
      <a href="#">
        <img
          src={googlePlay}
          alt="Get it on Google Play"
          className="h-10"
        />
      </a>
      <a href="#">
        <img
          src={appStore}
          alt="Download on the App Store"
          className="h-10"
        />
      </a>
    </div>
    <img src={hiring} />
  </div>
</div>



        <hr className="border-gray-700 mb-8" />

        {/* Upcoming Events in Jaipur Section */}
        <h3 className="text-lg font-bold text-white mb-4">
          Upcoming Events In Jaipur
        </h3>
        <div className="flex flex-wrap gap-2 text-sm mb-6">
          {events.map((event, idx) => (
            <React.Fragment key={idx}>
              <a href="#" className="hover:underline whitespace-nowrap">
                {event}
              </a>
              {idx < events.length - 1 && (
                <span className="text-gray-500">|</span>
              )}
            </React.Fragment>
          ))}
        </div>


          {/* Upcoming Events in Jaipur Section */}
        {/* <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-white mb-4">
            Upcoming Events In Jaipur
          </h3>
          <ul className="space-y-2">
            {events.map((event, idx) => (
              <li key={idx}>
                <a href="#" className="hover:underline">
                  {event}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Footer Links */}
        <div className="flex  flex-wrap justify-start gap-6 text-sm mb-6">
          {footerLinks.map((link, idx) => (
            <a key={idx} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* ✅ Bottom Bar (same as screenshot) */}
      <div className="bg-[#2f3a44] py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 px-4">
          {/* Left */}
          <p>© Copyright 2025. All Rights Reserved.</p>

          <a
            href="https://allevents.in/india/jaipur"
            className="flex items-center gap-1 hover:text-white mt-2 md:mt-0"
          >
            <HiHome className="text-lg" /> allevents.in › India › Jaipur
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <HiHome />
            </a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <FaXTwitter />
            </a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <FaYoutube />
            </a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <FaPinterestP />
            </a>
            <a href="#" className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded">
              <FaRss />
            </a>
            {/* Scroll to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="p-2 border border-gray-600 hover:bg-gray-600 transition rounded"
            >
              <FaChevronUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




