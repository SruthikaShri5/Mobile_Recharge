import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Plans = ({ onNavigate }) => {
  const { rechargeData, setSelectedPlan } = useApp();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('https://675e4e0363b05ed0797a1a3f.mockapi.io/plans');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      setPlans([
        { id: '1', price: 199, validity: '28 days', data: '1.5GB/day', description: '100 SMS/day' },
        { id: '2', price: 299, validity: '28 days', data: '2GB/day', description: '100 SMS/day', type: 'popular' },
        { id: '3', price: 399, validity: '56 days', data: '2.5GB/day', description: '100 SMS/day' },
        { id: '4', price: 599, validity: '84 days', data: '2GB/day', description: '100 SMS/day' }
      ]);
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
    onNavigate('payment');
  };

  const storedData = JSON.parse(localStorage.getItem('rechargeData') || '{}');

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold gradient-text mb-4 text-center">🎯 Select Recharge Plan</h2>
      <p className="text-center text-purple-200 mb-8 text-lg">
        Mobile: {storedData.mobile} | Operator: {storedData.operator?.toUpperCase()} | Type: {storedData.planType}
      </p>
      
      {loading ? (
        <p className="text-center text-purple-200 text-xl">Loading plans...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <article key={plan.id} className={`plan-card ${plan.type === 'popular' ? 'glow-pink' : ''}`}>
              {plan.type === 'popular' && (
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                  POPULAR
                </div>
              )}
              <h3 className="text-3xl font-bold gradient-text mb-2">₹{plan.price}</h3>
              <p className="text-purple-300 mb-4">{plan.validity}</p>
              <div className="space-y-2 mb-6 text-purple-200">
                <p>📊 Data: {plan.data}</p>
                <p>📞 Unlimited calls</p>
                <p>💬 {plan.description}</p>
              </div>
              <button onClick={() => handleSelectPlan(plan)} className="btn-primary w-full">
                Select Plan
              </button>
            </article>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="card-glass p-8 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold gradient-text mb-4">Plan Details</h3>
            <div className="space-y-3 text-purple-200 mb-6">
              <p><strong>Plan:</strong> ₹{currentPlan?.price}</p>
              <p><strong>Validity:</strong> {currentPlan?.validity}</p>
              <p><strong>Data:</strong> {currentPlan?.data}</p>
              <p><strong>Mobile:</strong> {storedData.mobile}</p>
              <p><strong>Operator:</strong> {storedData.operator?.toUpperCase()}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={handleProceed} className="btn-primary flex-1">
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Plans;
