import React from 'react';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiZap, FiShield, FiClock, FiUsers, FiTrendingUp, FiStar, FiArrowRight, FiGift, FiAward, FiHeart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="#007BFF" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Instant recharges completed in under 3 seconds with 99.9% success rate and real-time confirmation",
      color: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="#1E3A8A" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Bank-Grade Security",
      description: "Advanced encryption, secure payment gateways, and fraud protection for complete peace of mind",
      color: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=250&fit=crop&auto=format"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="#F59E0B" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Exclusive Rewards",
      description: "Earn cashback, loyalty points, and exclusive offers on every recharge with our premium rewards program",
      color: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200",
      image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=250&fit=crop&auto=format"
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="#14B8A6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Premium Support",
      description: "24/7 dedicated customer support with live chat, priority assistance, and instant issue resolution",
      color: "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format"
    }
  ];

  const stats = [
    { number: "15M+", label: "Active Users", icon: <FiUsers className="w-7 h-7" />, color: "text-emerald-600" },
    { number: "100M+", label: "Transactions", icon: <FiSmartphone className="w-7 h-7" />, color: "text-cyan-600" },
    { number: "99.9%", label: "Success Rate", icon: <FiTrendingUp className="w-7 h-7" />, color: "text-orange-600" },
    { number: "4.9/5", label: "User Rating", icon: <FiStar className="w-7 h-7" />, color: "text-rose-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&fit=crop&auto=format&overlay=gradient&overlay-color=emerald" 
            alt="Mobile Technology" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-36">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-montserrat mb-6 sm:mb-8 leading-tight">
              Mobile
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Recharge Platform
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-emerald-100 max-w-4xl mx-auto leading-relaxed font-opensans px-4">
              Experience seamless mobile recharges with our advanced platform. 
              Fast, reliable, and secure - your trusted partner for all mobile recharge needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {!user ? (
                <>
                  <Link
                    to="/signup"
                    className="btn-emerald px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 w-full sm:w-auto text-center"
                  >
                    Start Free Today
                  </Link>
                  <Link
                    to="/plans"
                    className="btn-cyan px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-2xl transition-all duration-500 w-full sm:w-auto text-center"
                  >
                    Explore Plans
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/recharge"
                    className="btn-emerald px-10 py-5 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500"
                  >
                    Recharge Now
                  </Link>
                  <Link
                    to="/dashboard"
                    className="btn-cyan px-10 py-5 text-xl font-semibold rounded-2xl transition-all duration-500"
                  >
                    My Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '4s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold font-montserrat text-gray-900 mb-4">
              Trusted by Millions Worldwide
            </h2>
            <p className="text-xl font-opensans text-gray-600">Our numbers speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in card p-8 hover:shadow-2xl" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-3">{stat.number}</div>
                <div className="text-gray-600 font-medium font-lato text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold font-montserrat text-gray-900 mb-6">
              Why Industry Leaders Choose Us
            </h2>
            <p className="text-xl font-opensans text-gray-600 max-w-4xl mx-auto">
              Experience the perfect blend of cutting-edge technology, unmatched security, and exceptional user experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card p-6 sm:p-8 border-2 ${feature.color} animate-slide-in image-overlay group`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative z-10">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4 sm:mb-6 card-image"
                  />
                  <h3 className="text-xl sm:text-2xl font-bold font-roboto text-gray-900 mb-4 sm:mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-opensans text-base sm:text-lg">{feature.description}</p>
                </div>
                <div className="overlay-content">
                  <p className="text-lg font-semibold">Loved by Users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop&auto=format" 
            alt="Technology Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-8">
            Ready to Transform Your Mobile Experience?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-emerald-100 font-opensans leading-relaxed">
            Join the revolution of smart mobile recharges. Experience the future today with our premium platform.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="px-10 py-5 bg-white text-emerald-600 font-bold font-roboto text-xl rounded-2xl hover:bg-gray-100 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-center"
              >
                Begin Your Journey
              </Link>
              <Link
                to="/plans"
                className="px-10 py-5 border-3 border-white text-white font-bold font-roboto text-xl rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-500 text-center"
              >
                View Premium Plans
              </Link>
            </div>
          ) : (
            <Link
              to="/recharge"
              className="px-10 py-5 bg-white text-emerald-600 font-bold font-roboto text-xl rounded-2xl hover:bg-gray-100 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-center"
            >
              Start Recharging
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;