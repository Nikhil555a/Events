
import React, { useState, useEffect, useContext } from 'react';
import { 
  FaMapMarkerAlt, FaSearch, FaChevronDown, FaPlusCircle, 
  FaRegUserCircle, FaMobileAlt, FaQuestionCircle, FaTimes ,FaSignOutAlt
} from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import { IoIosMenu } from 'react-icons/io';
import Logo from "../assets/logo.svg";
import dp from "../assets/dp.jpeg";
import SignInModal from "./SignInModal";
import { authDataContext } from "../context/Authcontext";
 import { useNavigate } from "react-router-dom"; 

const dropdownItems = [
  "Entertainment","Art & Theatre","Workshops","Meetups","Festivals",
  "Sports","Concerts","Exhibitions","Food & Drink","Kids","Community","More"
];

const Navbar = () => {
  const [isBottomNavHidden, setIsBottomNavHidden] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
 


    //  ✅ context se user aur logoutUser dono le lo
  const { user, logoutUser } = useContext(authDataContext);


    const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      navigate("/create-event");
    }
  }, [redirect, navigate]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setIsBottomNavHidden(window.scrollY > 100);
      }
      if (window.innerWidth < 1024) {
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body lock when modal/menu open
  useEffect(() => {
    if (isSignInModalOpen || isCreateEventModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSignInModalOpen, isCreateEventModalOpen, isMobileMenuOpen]);

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
    setIsMobileMenuOpen(false);
  };
  const handleCloseModal = () => {
    setIsSignInModalOpen(false);
    setIsCreateEventModalOpen(false);
  };
  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
  };
    const handleCreateEventClick = () => {
    if (user) {
      // User logged in → directly navigate to event form
      navigate("/event-form");
    } else {
      // User not logged in → show CreateEventPage
      navigate("/create-event");
    }
  };

  return (
    <nav>
      {/* ---- Desktop Navbar ---- */}
      <div className="lg:flex hidden bg-white py-4 w-full fixed top-0 left-0 z-50">
        <div className="container mx-auto px-4 w-[1200px] gap-4 flex items-center justify-around">
          <img src={Logo} alt="Logo" className="h-8" />

          <div className="flex items-center text-gray-700 hover:text-pink-500 cursor-pointer">
            <FaMapMarkerAlt className="mr-1" />
            <span className="font-semibold">Jaipur</span>
            <FaChevronDown className="ml-1 text-xs" />
          </div>

          <div className="flex-grow"></div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-[300px] pl-10 pr-4 py-2 rounded-full border" 
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* <button 
            onClick={() => setIsCreateEventModalOpen(true)} 
            className="flex items-center space-x-2 text-gray-500"
          >
            <FaPlusCircle /> <span>Create Event</span>
          </button> */}

            <button
        // onClick={() => navigate("/create-event")}
        onClick={handleCreateEventClick}
        className="flex items-center space-x-2 text-gray-500"
      >
        <FaPlusCircle /> <span>Create Event</span>
      </button>

          {/* --- Sign In / User Avatar --- */}
           {!user ? (
            <div className="flex items-center gap-2">
              <img
                src={dp}
                className="w-[25px] h-[25px] rounded-full"
                alt="dp"
              />
              <button
                onClick={handleSignInClick}
                className="text-gray-700 font-semibold"
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="relative">
              {/* Avatar + Arrow (NO EMAIL) */}
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full"
              >
                <img
                  src={user.profilePic || dp}
                  alt="profile"
                  className="w-[30px] h-[30px] rounded-full"
                />
                <FaChevronDown
                  className={`text-gray-500 transform transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
 

              </div>

              {/* Dropdown Popup */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg p-2">
                  <div className="flex flex-col items-start justify-center pl-5">
                    {/* <span className="text-sm text-gray-700 truncate">
                      {user.email}
                    </span> */}
                    <button
                      onClick={logoutUser}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600"
                    >
                      <FaSignOutAlt />
                      <span className="text-md">Logout</span>
                    </button>
                     <span className="text-md text-gray-700 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )} 
        </div>
      </div>

      {/* ---- Mobile Navbar ---- */}
      <div className={`lg:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-4 
        ${isScrolled ? 'bg-white text-gray-700 shadow-md' : 'bg-gradient-to-r from-blue-600 to-blue-100 text-white'}`}>
        <img src={Logo} alt="Logo" className="h-7" />
        <div className="flex items-center space-x-4">
          <button className={`border px-4 py-2 rounded-full text-sm ${isScrolled ? 'border-gray-300 text-gray-700' : 'border-white text-white'}`}>Open App</button>
          <CiSearch className={`text-2xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
          <IoIosMenu 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={`text-3xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} 
          />
        </div>
      </div>

      <div className="h-16"></div>

   

      {/* Desktop Bottom Navbar */}
            <div
                className={`w-full lg:flex hidden bg-white text-gray-600 transition-transform duration-300 z-40 relative
                    ${isBottomNavHidden ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}
            >
                <div className="container mx-auto px-4 w-[1200px]">
                    <div className="flex items-start justify-start gap-2 py-3">
                        {dropdownItems.map((item) => (
                            <div
                                key={item}
                                className="relative group h-full"
                                onMouseEnter={() => setHoveredItem(item)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a
                                    href="#"
                                    className="flex items-center text-sm font-medium px-2 py-2 text-gray-600 hover:text-pink-500 transition-colors duration-300"
                                >
                                    {item}
                                    {(item === 'Entertainment' || item === 'Art & Theatre' || item === 'More') && (
                                        <FaChevronDown className="ml-1 text-xs transition-transform duration-300 transform group-hover:rotate-180" />
                                    )}
                                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </a>
                                {item === 'Entertainment' && hoveredItem === 'Entertainment' && (
                                    <div className="absolute top-full left-0 mt-3 w-36 bg-white text-gray-800 rounded-lg shadow-lg
                                        transition-opacity duration-300 opacity-100"
                                    >
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Music</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Concerts</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Parties</a>
                                         <a href="#" className="block px-4 py-2 hover:bg-gray-100">Performance</a>
                                          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Comedy</a>
                                           <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dance</a>
                                    </div>
                                )}
                                 {item === 'Art & Theatre' && hoveredItem === 'Art & Theatre' && (
                                    <div className="absolute top-full left-0 mt-3 w-36 bg-white text-gray-800 rounded-lg shadow-lg
                                        transition-opacity duration-300 opacity-100"
                                    >
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Fine Arts</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Theatre</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Literary Arts</a>
                                         <a href="#" className="block px-4 py-2 hover:bg-gray-100">Crafts</a>
                                          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Photography</a>
                                           <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cooking</a>
                                    </div>
                                )}
                                 {item === 'More' && hoveredItem === 'More' && (
                                    <div className="absolute top-full left-0 mt-3 w-36 bg-white text-gray-800 rounded-lg shadow-lg
                                        transition-opacity duration-300 opacity-100"
                                    >
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Sports</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Exhibitions</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Fashion</a>
                                         <a href="#" className="block px-4 py-2 hover:bg-gray-100">Wellness</a>
                                          <a href="#" className="block px-4 py-2 hover:bg-gray-100">Yoga</a>
                                           <a href="#" className="block px-4 py-2 hover:bg-gray-100">Kids</a>
                                             <a href="#" className="block px-4 py-2 hover:bg-gray-100">Workshops</a>
                                               <a href="#" className="block px-4 py-2 hover:bg-gray-100">Webinar</a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <hr className="border-gray-300" />
                </div>
            </div>


      {/* ---- Mobile Drawer ---- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative bg-white w-full shadow-md rounded-b-xl transform translate-y-16 min-h-[70vh]">
            <div className="overflow-y-auto p-4">
              <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3 text-gray-800">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span className="font-semibold">Jaipur</span>
                </div>
                <button className="text-pink-500 font-semibold">Change City</button>
              </div>

              {/* Login / Logout */}
              {!user ? (
                <div className="flex items-center space-x-4 py-3 border-b cursor-pointer" onClick={handleSignInClick}>
                  <FaRegUserCircle className="text-xl text-gray-500" />
                  <span className="text-lg text-gray-700">Login</span>
                </div>
              ) : (
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-700">{user.email}</span>
                  <button onClick={logoutUser} className="text-red-500 font-semibold">Logout</button>
                </div>
              )}

              <h2 className="text-sm font-bold text-gray-800 mt-4 mb-2">HOST CONTROL</h2>
              <div className="space-y-3">
                 {/* <div className="flex items-center space-x-3 text-gray-700 cursor-pointer"  onClick={() => navigate("/create-event")}>  */}
                 <div className="flex items-center space-x-3 text-gray-700 cursor-pointer" onClick={() => setRedirect(true)}> 
                  <FaPlusCircle className="text-xl" />
                  <span className="text-lg">Create an event</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                  <FaPlusCircle className="text-xl" />
                  <span className="text-lg">Manage events</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between items-center text-gray-700 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <FaMobileAlt className="text-xl" />
                    <span className="text-lg">Get the App</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                  <FaQuestionCircle className="text-xl" />
                  <span className="text-lg">Need help?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- Modals ---- */}
      {isSignInModalOpen && <SignInModal onClose={handleCloseModal} />}
      {isCreateEventModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white w-full h-full relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-black text-4xl"><FaTimes /></button>
            <div className="flex items-center justify-center h-full">
              <h2 className="text-4xl font-bold">Create Event Modal Content</h2>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

