import React, { useState } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa'; // Close and Back icons

const EmailSignInView = ({ onBack, onClose, onContinue, loading }) => {
    const [email, setEmail] = useState('');

    const handleContinueClick = () => {
        if (email) {
            onContinue(email); // Call the prop function to handle API call
        }
    };

    return (
        <div className="relative p-6 sm:p-8 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
            {/* Header with Back and Close Button */}
            <div className="flex justify-between items-center mb-6">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Go back"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 absolute left-1/2 transform -translate-x-1/2">Let's get started</h2>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <FaTimes className="text-xl" />
                </button>
            </div>
            
            {/* Sub-headline */}
            <p className="mt-4 text-sm text-center text-gray-500">
                Use email to get started
            </p>

            {/* Email Input and Continue Button */}
            <div className="mt-6 space-y-4">
                {/* Email Input Field */}
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Email address"
                />
                
                {/* Continue Button */}
                <button 
                    onClick={handleContinueClick}
                    disabled={!email || loading} // Disable if email is empty or loading
                    className={`w-full py-3 px-4 rounded-lg text-lg font-medium transition-colors shadow-md 
                                ${(!email || loading) ? 
                                    'bg-blue-300 text-gray-100 cursor-not-allowed' : 
                                    'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                >
                    {loading ? 'Checking...' : 'Continue'} {/* Show loading text */}
                </button>
            </div>
        </div>
    );
};

export default EmailSignInView;