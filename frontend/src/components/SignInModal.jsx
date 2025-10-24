
import React, { useState, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from "axios";
import { authDataContext } from '../context/Authcontext';

const SignInModal = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { serverurl, loginUser } = useContext(authDataContext);

  const toggleView = () => {
    setIsSignUp(prev => !prev);
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isSignUp && password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      let result;
      let user;

      if (isSignUp) {
        // SIGNUP API CALL
        result = await axios.post(
          `${serverurl}/api/auth/signup`,
          { firstName, lastName, email, password, confirmPassword },
          { withCredentials: true }
        );

        user = result.data; // backend se seedha object aa raha hai

        // Context me save karo
        loginUser(user);

        // Parent component ko bhi pass karo
        onClose(user);

        setIsSignUp(false); // toggle back to signin view

      } else {
        // SIGNIN API CALL
        result = await axios.post(
          `${serverurl}/api/auth/signin`,
          { email, password },
          { withCredentials: true }
        );

        user = result.data; // backend se seedha object

        // Context me save
        loginUser(user);

        // Parent component ko bhi pass
        onClose(user);
      }

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error("API Error:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Something went wrong, try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-2xl relative">
        <button onClick={() => onClose()} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isSignUp ? 'Create an Account' : 'Sign In'}
        </h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isSignUp && (
            <div className='flex space-x-4'>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                className="flex-1 px-3 py-2 border rounded-md"
              />
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          {isSignUp && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don’t have an account?"}
            <button onClick={toggleView} className="text-pink-500 ml-1 hover:text-pink-600">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
