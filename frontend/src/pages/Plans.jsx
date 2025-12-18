import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Plans = () => {
  const { setSelectedPlan } = useApp();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('prepaid');

  const categories = [
    { id: 'prepaid', label: 'Prepaid' },
    { id: 'postpaid', label: 'Postpaid' },
    { id: 'data', label: 'Data Plans' },
    { id: 'topup', label: 'Top-ups' }
  ];

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/plans`);
      const data = await response.json();

      if (data.success) {
        setPlans(data.plans);
      } else {
        throw new Error('Failed to fetch plans');
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = (plan) => {
    setCurrentPlan(plan);
    setShowModal(true);
  };

  const handleProceed = () => {
    setSelectedPlan(currentPlan);
    localStorage.setItem('selectedPlan', JSON.stringify(currentPlan));
    navigate('/payment');
  };

  const storedData = JSON.parse(localStorage.getItem('rechargeData') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-8">
            Choose Your Perfect Plan
          </h1>
          
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-opensans text-gray-600">Loading plans...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.filter(plan => (plan.type || plan.category) === selectedCategory).map((plan, index) => (
              <div key={plan._id || plan.id} className={`card p-6 animate-scale-in hover:shadow-2xl transform hover:-translate-y-2 ${plan.type === 'popular' ? 'border-2 border-emerald-400 ring-2 ring-emerald-200' : ''}`} style={{animationDelay: `${index * 0.1}s`}}>
                {plan.type === 'popular' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-4xl font-bold font-montserrat text-gray-900 mb-2">₹{plan.price}</h3>
                  <p className="text-lg font-medium font-roboto text-gray-600">{plan.validity}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium font-opensans text-gray-700">Data</span>
                    <span className="font-bold text-gray-900">{plan.data}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium font-opensans text-gray-700">Calls</span>
                    <span className="font-bold text-gray-900">Unlimited</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium font-opensans text-gray-700">SMS</span>
                    <span className="font-bold text-gray-900">{plan.description}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleSelectPlan(plan)} 
                  className={`w-full py-3 rounded-xl font-semibold font-roboto transition-all duration-300 ${plan.type === 'popular' ? 'btn-emerald' : 'btn-cyan'}`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="card p-8 max-w-md mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">Confirm Plan Selection</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Plan Amount</span>
                <span className="font-bold text-gray-900">₹{currentPlan?.price}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Validity</span>
                <span className="font-bold text-gray-900">{currentPlan?.validity}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Data</span>
                <span className="font-bold text-gray-900">{currentPlan?.data}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Mobile</span>
                <span className="font-bold text-gray-900">{storedData.mobile}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Operator</span>
                <span className="font-bold text-gray-900">{storedData.operator?.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="btn-rose flex-1 py-3 rounded-xl font-semibold">
                Cancel
              </button>
              <button onClick={handleProceed} className="btn-emerald flex-1 py-3 rounded-xl font-semibold">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
