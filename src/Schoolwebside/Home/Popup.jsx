// Popup.js
import React, { useEffect, useState } from 'react';

let hasPopupShown = false;

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!hasPopupShown) {
      setShowPopup(true);
      hasPopupShown = true;
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className="relative w-[90vw] h-[100vh] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/popup.webp')", backgroundSize:"contain" }} // `contain` for full display
      >
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute  p-1 p-x-5 rounded-xl xl:top-4 top-14 right-6  text-red-700 text-4xl font-bold hover:text-red-500 transition"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Popup;
