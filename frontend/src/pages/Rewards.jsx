import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGift, FiStar, FiDollarSign, FiTrendingUp, FiCheck } from 'react-icons/fi';

const Rewards = () => {
  const [claimedOffers, setClaimedOffers] = useState([]);

  const handleClaimOffer = (index, title) => {
    const codes = ['REWARD20', 'CASHBACK50', 'DOUBLE2X'];
    navigator.clipboard.writeText(codes[index]);
    setClaimedOffers([...claimedOffers, index]);
    setTimeout(() => {
      setClaimedOffers(claimedOffers.filter(i => i !== index));
    }, 3000);
  };
  const rewards = [
    { title: "Cashback Earned", amount: "₹125", icon: <FiDollarSign className="w-6 h-6" />, color: "text-emerald-600" },
    { title: "Reward Points", amount: "2,450", icon: <FiStar className="w-6 h-6" />, color: "text-orange-600" },
    { title: "Total Savings", amount: "₹890", icon: <FiTrendingUp className="w-6 h-6" />, color: "text-cyan-600" }
  ];

  const offers = [
    { title: "20% Extra Data", description: "On recharges above ₹299", validity: "Valid till 31 Dec" },
    { title: "₹50 Cashback", description: "On first recharge of ₹500+", validity: "New users only" },
    { title: "Double Points", description: "Earn 2x reward points", validity: "Weekend special" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiGift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-4">Rewards Center</h1>
          <p className="text-xl font-opensans text-gray-600">Track your cashback, points, and exclusive offers</p>
        </div>

        {/* Rewards Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {rewards.map((reward, index) => (
            <div key={index} className="card p-6 text-center">
              <div className={`w-12 h-12 ${reward.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <span className={reward.color}>{reward.icon}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{reward.amount}</h3>
              <p className="text-gray-600 font-medium">{reward.title}</p>
            </div>
          ))}
        </div>

        {/* Active Offers */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">Active Offers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-3">{offer.description}</p>
                <p className="text-sm text-emerald-600 font-medium">{offer.validity}</p>
                <button 
                  onClick={() => handleClaimOffer(index, offer.title)}
                  className={`w-full mt-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    claimedOffers.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : 'btn-emerald'
                  }`}
                >
                  {claimedOffers.includes(index) ? (
                    <><FiCheck className="w-4 h-4 inline mr-1" />Copied!</>
                  ) : (
                    'Claim Offer'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link to="/dashboard" className="btn-cyan px-8 py-3 rounded-xl font-semibold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rewards;