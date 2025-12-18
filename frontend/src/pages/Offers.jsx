import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiGift, FiPercent, FiZap, FiCheck } from 'react-icons/fi';

const Offers = () => {
  const [claimedOffers, setClaimedOffers] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClaim = (offerIndex, code) => {
    navigator.clipboard.writeText(code);
    setClaimedOffers([...claimedOffers, offerIndex]);
    setTimeout(() => {
      setClaimedOffers(claimedOffers.filter(i => i !== offerIndex));
    }, 3000);
  };
  const offers = [
    {
      title: "20% Extra Data",
      description: "Get 20% extra data on all recharges above ₹299",
      validity: "Valid till 31 Dec 2024",
      code: "DATA20",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "₹50 Cashback",
      description: "Flat ₹50 cashback on first recharge of ₹500 or more",
      validity: "New users only",
      code: "FIRST50",
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "Weekend Special",
      description: "Double reward points on all weekend recharges",
      validity: "Saturday & Sunday only",
      code: "WEEKEND2X",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiGift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-4">Special Offers</h1>
          <p className="text-xl font-opensans text-gray-600">Exclusive deals and cashback offers</p>
        </div>

        <div className="grid gap-6 mb-8">
          {offers.map((offer, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${offer.color} rounded-xl flex items-center justify-center mr-4`}>
                      <FiPercent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-500">Code: {offer.code}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <p className="text-sm text-emerald-600 font-medium">{offer.validity}</p>
                </div>
                <button 
                  onClick={() => handleClaim(index, offer.code)}
                  className={`px-6 py-2 rounded-lg font-medium ml-4 transition-all ${
                    claimedOffers.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : 'btn-emerald'
                  }`}
                >
                  {claimedOffers.includes(index) ? (
                    <><FiCheck className="w-4 h-4 inline mr-1" />Copied!</>
                  ) : (
                    'Claim Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/dashboard" className="btn-cyan px-8 py-3 rounded-xl font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offers;