
import React from "react";
import taj from "../assets/taj4.webp"; // replace with the image you uploaded

export default function Hero() {
  return (
    <div className="flex items-center justify-center">
      {/* Mobile-first approach: `min-w-[1250px]` is now removed for mobile and applied only for large screens */}
      <section className="lg:px-6 lg:mt-6 w-full lg:min-w-[1250px]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-100 text-white lg:rounded-xl pl-4 lg:pl-10  pt-5 lg:pt-10 pb-10 flex flex-col md:flex-row items-center justify-between">
          
          {/* Left */}
          <div className=" max-w-xl space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Events in Jaipur</h1>
            <p className="text-sm md:text-base leading-relaxed">
              Your eyes cannot see enough of the beauty of the pink city of India.
              Jaipur has its flair and charm, which boosts its heritage worldwide.
              Events in Jaipur are diverse, beautiful, and aesthetically pleasing at
              any time of the year. Festivals and events in Jaipur, like the Jaipur
              Literature Festival and International Film Festival, are the heart and
              soul of the festivals. Explore the events in Jaipur with us today!
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100">
              Join the community +
            </button>
          </div>

          {/* Right */}
          {/* <div className="w-full "> */}
              <img
            src={taj}
            alt="jaipur"
            className=" w-[100%] bottom-[-40px] relative  lg:w-98 md:w-96 "
          />
          {/* </div>  */}
          {/* top-9 relative */}
        
 
        </div>
        
      </section>
    </div>
  );
}



