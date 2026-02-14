import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const TravelPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      // Small delay to trigger the slide-in animation
      setTimeout(() => setIsVisible(true), 50);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before hiding
    setTimeout(() => setShowPopup(false), 300);
  };

  const handleKnowMore = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
      // navigate("/free-kundali"); // Uncomment when using with router
      console.log("Navigating to /free-kundali");
    }, 300);
  };

  if (!showPopup) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 bg-orange-300 hover:bg-white shadow-2xl rounded-xl z-50 w-80 h-56 transition-all duration-500 ease-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      {/* Scroll Background */}
      <div className="relative w-full h-full group">
        {/* Scroll SVG */}
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full drop-shadow-2xl group-hover:drop-shadow-3xl transition-all duration-300"
        >
          {/* Scroll shadow */}
          <defs>
            <filter id="scrollShadow">
              <feDropShadow
                dx="2"
                dy="4"
                stdDeviation="3"
                floodColor="rgba(0,0,0,0.3)"
              />
            </filter>
            <radialGradient id="scrollGradient" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f4e4bc" />
              <stop offset="50%" stopColor="#e6d3a3" />
              <stop offset="100%" stopColor="#d4c294" />
            </radialGradient>
          </defs>

          {/* Left wooden handle */}
          <rect
            x="20"
            y="80"
            width="12"
            height="140"
            fill="#8B4513"
            rx="6"
            filter="url(#scrollShadow)"
          />
          <ellipse cx="26" cy="75" rx="8" ry="8" fill="#654321" />
          <ellipse cx="26" cy="225" rx="8" ry="8" fill="#654321" />

          {/* Right wooden handle */}
          <rect
            x="368"
            y="80"
            width="12"
            height="140"
            fill="#8B4513"
            rx="6"
            filter="url(#scrollShadow)"
          />
          <ellipse cx="374" cy="75" rx="8" ry="8" fill="#654321" />
          <ellipse cx="374" cy="225" rx="8" ry="8" fill="#654321" />

          {/* Scroll parchment with torn edges */}
          <path
            d="M 40 90 
               Q 42 85 45 87 
               Q 48 85 50 87 
               Q 53 85 55 87 
               Q 58 85 60 87 
               Q 63 85 65 87 
               Q 68 85 70 87 
               Q 73 85 75 87 
               Q 78 85 80 87 
               Q 83 85 85 87 
               Q 88 85 90 87 
               Q 93 85 95 87 
               Q 98 85 100 87 
               Q 103 85 105 87 
               Q 108 85 110 87 
               Q 113 85 115 87 
               Q 118 85 120 87 
               Q 123 85 125 87 
               Q 128 85 130 87 
               Q 133 85 135 87 
               Q 138 85 140 87 
               Q 143 85 145 87 
               Q 148 85 150 87 
               Q 153 85 155 87 
               Q 158 85 160 87 
               Q 163 85 165 87 
               Q 168 85 170 87 
               Q 173 85 175 87 
               Q 178 85 180 87 
               Q 183 85 185 87 
               Q 188 85 190 87 
               Q 193 85 195 87 
               Q 198 85 200 87 
               Q 203 85 205 87 
               Q 208 85 210 87 
               Q 213 85 215 87 
               Q 218 85 220 87 
               Q 223 85 225 87 
               Q 228 85 230 87 
               Q 233 85 235 87 
               Q 238 85 240 87 
               Q 243 85 245 87 
               Q 248 85 250 87 
               Q 253 85 255 87 
               Q 258 85 260 87 
               Q 263 85 265 87 
               Q 268 85 270 87 
               Q 273 85 275 87 
               Q 278 85 280 87 
               Q 283 85 285 87 
               Q 288 85 290 87 
               Q 293 85 295 87 
               Q 298 85 300 87 
               Q 303 85 305 87 
               Q 308 85 310 87 
               Q 313 85 315 87 
               Q 318 85 320 87 
               Q 323 85 325 87 
               Q 328 85 330 87 
               Q 333 85 335 87 
               Q 338 85 340 87 
               Q 343 85 345 87 
               Q 348 85 350 87 
               Q 353 85 355 87 
               Q 358 85 360 87 
               L 360 210 
               Q 358 215 355 213 
               Q 353 215 350 213 
               Q 348 215 345 213 
               Q 343 215 340 213 
               Q 338 215 335 213 
               Q 333 215 330 213 
               Q 328 215 325 213 
               Q 323 215 320 213 
               Q 318 215 315 213 
               Q 313 215 310 213 
               Q 308 215 305 213 
               Q 303 215 300 213 
               Q 298 215 295 213 
               Q 293 215 290 213 
               Q 288 215 285 213 
               Q 283 215 280 213 
               Q 278 215 275 213 
               Q 273 215 270 213 
               Q 268 215 265 213 
               Q 263 215 260 213 
               Q 258 215 255 213 
               Q 253 215 250 213 
               Q 248 215 245 213 
               Q 243 215 240 213 
               Q 238 215 235 213 
               Q 233 215 230 213 
               Q 228 215 225 213 
               Q 223 215 220 213 
               Q 218 215 215 213 
               Q 213 215 210 213 
               Q 208 215 205 213 
               Q 203 215 200 213 
               Q 198 215 195 213 
               Q 193 215 190 213 
               Q 188 215 185 213 
               Q 183 215 180 213 
               Q 178 215 175 213 
               Q 173 215 170 213 
               Q 168 215 165 213 
               Q 163 215 160 213 
               Q 158 215 155 213 
               Q 153 215 150 213 
               Q 148 215 145 213 
               Q 143 215 140 213 
               Q 138 215 135 213 
               Q 133 215 130 213 
               Q 128 215 125 213 
               Q 123 215 120 213 
               Q 118 215 115 213 
               Q 113 215 110 213 
               Q 108 215 105 213 
               Q 103 215 100 213 
               Q 98 215 95 213 
               Q 93 215 90 213 
               Q 88 215 85 213 
               Q 83 215 80 213 
               Q 78 215 75 213 
               Q 73 215 70 213 
               Q 68 215 65 213 
               Q 63 215 60 213 
               Q 58 215 55 213 
               Q 53 215 50 213 
               Q 48 215 45 213 
               Q 42 215 40 210 
               Z"
            fill="url(#scrollGradient)"
            filter="url(#scrollShadow)"
            className="fill-amber-100 transition-all duration-300"
          />

          {/* Scroll texture lines */}
          <line
            x1="50"
            y1="110"
            x2="350"
            y2="110"
            stroke="#d4c294"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="125"
            x2="350"
            y2="125"
            stroke="#d4c294"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="140"
            x2="350"
            y2="140"
            stroke="#d4c294"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="155"
            x2="350"
            y2="155"
            stroke="#d4c294"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="170"
            x2="350"
            y2="170"
            stroke="#d4c294"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="185"
            x2="350"
            y2="185"
            stroke="#d4c294"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 pt-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-8 text-amber-800 hover:text-amber-600 transition-colors duration-200 hover:rotate-90 transform z-10"
          >
            <X size={20} />
          </button>

          {/* Main content */}
          <div className="text-center max-w-xs">
            <h2 className="text-lg font-bold text-amber-900 leading-tight mb-9 font-serif"></h2>

            <p className="text-lg font-bold text-amber-900 leading-tight mb-4 mt-20 font-serif">
              ✈️ Want to Know If Foreign Travel Is in Your Destiny?
            </p>

            <button
              onClick={handleKnowMore}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-3 rounded-full hover:from-amber-600 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-serif"
            >
              Know more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPopup;
