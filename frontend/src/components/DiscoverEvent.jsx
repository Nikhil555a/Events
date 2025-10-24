
import React from 'react';

import phoneImage1 from '../assets/ae1-01.webp';

import qrCode from '../assets/qr-code.webp';
import appStore from '../assets/App-Store-Icon.webp';
import googlePlay from '../assets/Google-Play-Icon.webp';

const DiscoverEvent = () => {
  return (
    <section className="bg-gray-100 min-h-screen lg:w-full flex items-center justify-center py-20">
      {/* Changed flex-col-reverse to flex-col */}
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-20 px-4 w-full">
        {/* Left side: Phone images */}
        <div className="relative w-72 md:w-96 h-96">
          <img 
            src={phoneImage1} 
            alt="Phone screen showing featured events" 
            className="absolute z-10 w-full transform "
          />
        </div>

        {/* Right side: Text and download links */}
        <div className="text-center md:text-left mt-16 md:mt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Discover Events. <br />
            Anywhere, Anytime.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Download the AllEvents app to never miss out on <br />
            the best events near you!
          </p>
          <div className="mt-8 flex flex-col items-center md:flex-row md:items-center space-y-8 md:space-y-0 md:space-x-8">
            {/* QR Code */}
            <img 
              src={qrCode} 
              alt="QR Code to download the app" 
              className="w-32 h-32" 
            />

            {/* "OR" separator */}
            <span className="text-gray-500 font-semibold text-lg md:text-xl hidden md:block">OR</span>
            
            {/* App Store Buttons */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <a href="#" className="flex items-center">
                <img src={googlePlay} alt="Get it on Google Play" className="h-12" />
              </a>
              <a href="#" className="flex items-center">
                <img src={appStore} alt="Download on the App Store" className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverEvent;


