import React from 'react';
import MainProject from './components/MainProject';
import useDeviceType from './components/useDeviceType';
import MobileDevice from './components/MobileDevice';

const App = () => {
  const isMobile = useDeviceType();

  return (
    <>
      {isMobile ? (
       <MobileDevice/>
      ) : (
        <MainProject />
      )}
    </>
  );
};

export default App;
