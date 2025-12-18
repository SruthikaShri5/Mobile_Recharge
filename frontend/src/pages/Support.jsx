import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPhone, FiMail, FiMessageCircle, FiSend } from 'react-icons/fi';

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! Our team will contact you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiUsers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-4">Customer Support</h1>
          <p className="text-xl font-opensans text-gray-600">We're here to help you 24/7</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Methods */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FiPhone className="w-6 h-6 text-emerald-600 mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Phone Support</p>
                  <p className="text-gray-600">1800-123-4567</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FiMail className="w-6 h-6 text-orange-600 mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Email Support</p>
                  <p className="text-gray-600">support@mobrecharge.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FiMessageCircle className="w-6 h-6 text-cyan-600 mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">Live Chat</p>
                  <p className="text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="input-field h-32 resize-none"
                required
              />
              <button type="submit" className="btn-emerald w-full py-3 rounded-xl font-semibold flex items-center justify-center">
                <FiSend className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
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

export default Support;