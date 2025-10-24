
import React, { useRef, useContext } from 'react';
import { EventContext } from "../context/EventContext";

const EventMedia = ({ banner, setBanner, bannerPreview, setBannerPreview }) => {
  const fileInputRef = useRef(null);
  const { events } = useContext(EventContext);

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);

      // Save preview in localStorage for persistence
      const eventId = localStorage.getItem("currentEventId") || "temp";
      localStorage.setItem(`eventBanner_${eventId}`, previewUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg">
      {/* Upload event banner Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload event banner</h2>
        <p className="text-sm text-gray-500 mb-4">This banner will appear everywhere.</p>

        <div className="border border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50 h-96">
          {/* {bannerPreview ? ( */}
            {/* <img
              src={bannerPreview}
              alt="Banner Preview"
             
              className="rounded-lg mb-4 w-full h-72 object-cover"
            /> */}
          {/* // ) : (
          //   <div className="text-gray-400 mb-4">No banner selected yet</div>
          // )} */}

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleBannerClick}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Add Banner
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleBannerChange}
              className="hidden"
            />

            <div className="mt-4 text-center text-[18px] text-gray-500">
              <p>Max image size <strong>20MB</strong>. Recommended dimension: <strong>1200x600px (2:1)</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <hr className="my-8 border-t border-gray-200" />

      {/* Add a promotional video Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Add a promotional video</h2>
        <p className="text-sm text-gray-500 mb-4">Share a YouTube link to showcase your event in action.</p>
        <input
          type="url"
          placeholder="ex. https://youtube.com/yourvideo"
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
        />
      </section>

      {/* Upload media Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload media</h2>
        <p className="text-sm text-gray-500 mb-4">This media will appear under gallery section.</p>
        <div className="border border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50 h-80">
          <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
            <svg
              className="w-5 h-5 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Upload media
          </button>
          <div className="mt-2 text-center text-sm text-gray-500">
            <p>You can upload maximum <strong>10 images</strong>.</p>
            <p>Max size should be <strong>20MB</strong> per media.</p>
          </div>
        </div>
      </section>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <button className="px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
          Next
        </button>
      </div>
    </div>
  );
};

export default EventMedia;
