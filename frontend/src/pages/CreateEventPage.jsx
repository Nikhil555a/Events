
import React, { useState, useContext } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import { authDataContext } from "../context/Authcontext";
import slide1 from "../assets/slide1.webp";
import slide2 from "../assets/slide2.webp";
import slide3 from "../assets/slide3.webp";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import logo from "../assets/logo.svg";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(authDataContext);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: slide1, title: "STRESS-FREE SETUP", text: "Go live in minutes and start selling instantly. No tech headaches." },
    { image: slide2, title: "BOOST YOUR AUDIENCE", text: "Reach thousands of event seekers looking for experiences like yours." },
    { image: slide3, title: "MAXIMIZE TICKET SALES", text: "Manage registrations and payments effortlessly with our tools." },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCloseModal = (userData) => {
    setIsSignInModalOpen(false);
    if (userData) navigate("/event-form"); // After login → EventFormPage
  };

  // If user already logged in, redirect directly
  if (user) {
    navigate("/event-form");
    return null;
  }

  return (
    <div className="flex w-full h-screen">
      {/* Left slider */}
      <div className="hidden md:flex w-[65%] relative bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{slides[currentSlide].title}</h2>
          <p className="text-lg mb-6 text-center">{slides[currentSlide].text}</p>
        </div>
        <div className="absolute top-4 left-4 flex gap-3 text-white text-2xl">
          <button onClick={prevSlide} className="p-2 border-2 rounded-full border-gray-50"><HiArrowSmallLeft /></button>
          <button onClick={nextSlide} className="p-2 border-2 border-gray-50 rounded-full"><HiArrowSmallRight /></button>
        </div>
      </div>

      {/* Right - Login CTA */}
      <div className="flex flex-col w-[35%] justify-center items-center bg-white">
        <img src={logo} alt="logo" className="h-12 mb-6" />
        <h1 className="text-2xl font-bold mb-6">Ready to Host? Let's Go</h1>
        <button
          className="flex items-center text-lg gap-2 px-8 py-3 rounded-lg mb-3 border-2 w-[60%] justify-center"
          onClick={() => setIsSignInModalOpen(true)}
        >
          <FaEnvelope /> Continue with Email
        </button>
      </div>

      {isSignInModalOpen && <SignInModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CreateEventPage;
