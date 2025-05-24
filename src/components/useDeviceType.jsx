// hooks/useDeviceType.js
import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768); // Customize breakpoint as needed
    };

    checkDevice(); // Initial check
    window.addEventListener('resize', checkDevice); // Listen to resize

    return () => window.removeEventListener('resize', checkDevice); // Cleanup
  }, []);

  return isMobile;
};

export default useDeviceType;
