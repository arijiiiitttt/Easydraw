import React from 'react';
import { FaChrome } from 'react-icons/fa';

const MobileDevice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 relative overflow-hidden">
      
      {/* Background waves (optional, ensure the SVG exists at public/wave.svg) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[url('/wave.svg')] bg-no-repeat bg-cover bg-center" />
      </div>

      {/* Main content */}
      <div className="z-10 text-center flex flex-col items-center">
        {/* Broken file + Chrome icon */}
        <div className="text-7xl mb-4 relative">
          <span role="img" aria-label="broken file" className="text-gray-700">📄</span>
          <FaChrome className="absolute -top-2 -right-4 text-red-500 text-3xl" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-red-600 mb-1">
          Webpage not available
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Please switch to a larger screen device (tablet or desktop).
        </p>
      </div>

      {/* Watermark / Footer */}
      <div className="absolute bottom-4 right-4 text-sm text-blue-500 font-semibold">
        WPOven
      </div>
    </div>
  );
};

export default MobileDevice;
