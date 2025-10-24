
import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        {/* Left content section */}
        <div className="mb-8 lg:mb-0 lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4">
            Best of Jaipur Events in Your Inbox
          </h2>
          <p className="text-lg">
            Don't miss your favorite concert again. We deliver best of the city
            happenings and handpicked content for you every week. Subscribe
            weekly email newsletter for Jaipur.
          </p>
        </div>

        {/* Right form section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="p-6 md:p-8 border border-gray-600 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              <input
                type="email"
                placeholder="Enter your email here"
                className="flex-grow p-3 rounded-md border border-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-center text-gray-300 mt-2">
              Join over a million newsletter subscribers.
            </p>
          </div>
        </div>
      </div>

      {/* Blue horizontal line */}
      <div className="w-full border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Newsletter;

