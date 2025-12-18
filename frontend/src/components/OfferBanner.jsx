import React, { useState, useEffect } from 'react';
import { FiGift, FiClock, FiZap } from 'react-icons/fi';

const OfferBanner = () => {
  const [currentOffer, setCurrentOffer] = useState(0);
  
  const offers = [
    {
      icon: <FiGift className="w-5 h-5" />,
      text: "Get 50% Extra Data on All Recharges Above ₹299! Limited Time Offer",
      bgColor: "from-orange-500 to-amber-500"
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      text: "Flash Sale: Unlimited Calls + 2GB Data for just ₹199! Hurry Up!",
      bgColor: "from-emerald-500 to-teal-500"
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      text: "Weekend Special: Double Validity on All Plans! Valid Till Sunday",
      bgColor: "from-rose-500 to-red-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-gradient-to-r ${offers[currentOffer].bgColor} text-white py-3 px-4 shadow-lg`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3 animate-fade-in">
        {offers[currentOffer].icon}
        <span className="font-montserrat font-semibold text-sm md:text-base text-center">
          {offers[currentOffer].text}
        </span>
      </div>
    </div>
  );
};

export default OfferBanner;