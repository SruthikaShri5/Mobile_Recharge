import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiCheck, FiLock, FiMail, FiPhone, FiUser, FiShield, FiCreditCard } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, login, token } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [activeTab, setActiveTab] = useState('account');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    const updatedUser = { ...user, name };
    login(updatedUser, token);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    // Add password change logic here
    setShowPasswordModal(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleDeleteAccount = () => {
    // Delete account logic
    logout();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
              <span className="text-white font-bold text-3xl">{user?.name.charAt(0)}</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8 border-b">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'account'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'security'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'preferences'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preferences
            </button>
          </div>
          {activeTab === 'account' && (
            <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-emerald-500 rounded-lg focus:outline-none"
                  />
                ) : (
                  <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-medium">
                    {name}
                  </div>
                )}
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  {isEditing ? <FiCheck className="w-5 h-5" /> : <FiEdit2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <FiMail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900 font-medium">{user?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <FiPhone className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900 font-medium">{user?.mobile}</span>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Account Status</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">Active</span>
              </div>
            </div>
          </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="card p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowPasswordModal(true)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <FiLock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your password regularly</p>
                    </div>
                  </div>
                  <FiEdit2 className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FiCreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Login History</h3>
                    <p className="text-sm text-gray-600">Recent login activity</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{new Date().toLocaleString()}</span>
                    <span className="text-sm text-green-600 font-medium">Current Session</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
                    Login history requires backend integration
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-fade-in">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">SMS Notifications</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-emerald-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Promotional Offers</span>
                    <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded" />
                  </label>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Default Operator</h3>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none">
                  <option>Select Operator</option>
                  <option>Airtel</option>
                  <option>Jio</option>
                  <option>Vi</option>
                  <option>BSNL</option>
                </select>
              </div>


            </div>
          )}

          <div className="pt-6 border-t mt-8 space-y-4">
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl hover:from-rose-600 hover:to-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Logout
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition-all duration-300 font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowPasswordModal(false)}>
          <div className="card p-8 max-w-md mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowPasswordModal(false)} className="btn-rose flex-1 py-3 rounded-xl font-semibold">
                Cancel
              </button>
              <button onClick={handlePasswordChange} className="btn-emerald flex-1 py-3 rounded-xl font-semibold">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={() => setShowDeleteModal(false)}>
          <div className="card p-8 max-w-md mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="btn-emerald flex-1 py-3 rounded-xl font-semibold">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white flex-1 py-3 rounded-xl font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
