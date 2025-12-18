import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import { useApp } from '../context/AppContext';

const RechargePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedPlanLocal, setSelectedPlanLocal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { setSelectedPlan } = useApp();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/plans`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setPlans(data.plans);
        setError(null);
      } else {
        setError('Failed to load plans');
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(plan => 
    filter === 'all' || plan.type === filter
  );

  const handlePlanSelect = (plan) => {
    console.log('Plan selected:', JSON.stringify(plan, null, 2));
    setSelectedPlanLocal(plan);
    setShowModal(true);
  };

  const confirmPlan = () => {
    console.log('Confirming plan:', JSON.stringify(selectedPlanLocal, null, 2));
    setSelectedPlan(selectedPlanLocal);
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlanLocal));
    setShowModal(false);
    navigate('/payment');
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl gradient-text">Loading plans...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-500">⚠</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Plans</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchPlans} className="btn-emerald px-6 py-3 rounded-xl font-semibold">
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-4">Recharge Plans</h1>
          <p className="text-xl font-opensans text-gray-600">Choose the perfect plan for your needs</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold font-roboto transition-all duration-300 ${
              filter === 'all' 
                ? 'btn-emerald' 
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-300'
            }`}
          >
            All Plans
          </button>
          <button
            onClick={() => setFilter('prepaid')}
            className={`px-6 py-3 rounded-xl font-semibold font-roboto transition-all duration-300 ${
              filter === 'prepaid' 
                ? 'btn-cyan' 
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-300'
            }`}
          >
            Prepaid
          </button>
          <button
            onClick={() => setFilter('postpaid')}
            className={`px-6 py-3 rounded-xl font-semibold font-roboto transition-all duration-300 ${
              filter === 'postpaid' 
                ? 'btn-orange' 
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300'
            }`}
          >
            Postpaid
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPlans.map((plan, index) => (
            <div key={plan.id} className="card p-6 animate-scale-in hover:shadow-2xl transform hover:-translate-y-2" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="text-center mb-6">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  plan.type === 'prepaid' ? 'bg-cyan-100 text-cyan-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {plan.type.toUpperCase()}
                </div>
                <h3 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">₹{plan.price}</h3>
                <p className="text-lg font-medium font-roboto text-gray-600">{plan.validity}</p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium font-opensans text-gray-700">Data</span>
                  <span className="font-bold text-gray-900">{plan.data}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium font-opensans text-gray-700">Benefits</span>
                  <p className="font-bold text-gray-900 mt-1">{plan.description}</p>
                </div>
              </div>
              
              <button 
                onClick={() => handlePlanSelect(plan)}
                className={`w-full py-3 rounded-xl font-semibold font-roboto transition-all duration-300 ${
                  plan.type === 'prepaid' ? 'btn-cyan' : 'btn-orange'
                }`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">?</span>
            </div>
            <h3 className="text-xl font-semibold font-roboto text-gray-700">No plans found</h3>
            <p className="text-gray-500 font-opensans">Try adjusting your filter</p>
          </div>
        )}
      </div>

      {/* Plan Confirmation Modal */}
      {showModal && selectedPlanLocal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-scale-in border border-gray-100" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">Confirm Plan Selection</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Plan Amount</span>
                <span className="font-bold text-gray-900">₹{selectedPlanLocal.price}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Type</span>
                <span className="font-bold text-gray-900">{selectedPlanLocal.type}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Validity</span>
                <span className="font-bold text-gray-900">{selectedPlanLocal.validity}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Data</span>
                <span className="font-bold text-gray-900">{selectedPlanLocal.data}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium font-opensans text-gray-700">Benefits</span>
                <p className="font-bold text-gray-900 mt-1">{selectedPlanLocal.description}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={confirmPlan} className="btn-emerald flex-1 py-3 rounded-xl font-semibold">
                Proceed to Payment
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="btn-rose flex-1 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargePlans;