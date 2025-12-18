import { useState, useEffect } from 'react';

const Payment = ({ onNavigate }) => {
  const [rechargeData, setRechargeData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const storedRecharge = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
    setRechargeData(storedRecharge);
    setSelectedPlan(storedPlan);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      localStorage.setItem('paymentMethod', paymentMethod);
      onNavigate('confirmation');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <article className="card-glass p-6">
          <h3 className="text-2xl font-bold gradient-text mb-4">📋 Order Summary</h3>
          <div className="space-y-3 text-purple-200">
            <p><strong>Mobile:</strong> {rechargeData.mobile}</p>
            <p><strong>Operator:</strong> {rechargeData.operator?.toUpperCase()}</p>
            <p><strong>Plan:</strong> ₹{selectedPlan.price} - {selectedPlan.validity}</p>
            <p><strong>Data:</strong> {selectedPlan.data}</p>
            <hr className="my-4 border-purple-500/30" />
            <p className="text-2xl font-bold gradient-text">Total: ₹{selectedPlan.price}</p>
          </div>
        </article>
        
        <section className="card-glass p-6">
          <h2 className="text-2xl font-bold gradient-text mb-6">💳 Payment Method</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center p-4 border-2 border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition bg-slate-800/50">
              <input type="radio" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 w-5 h-5" />
              <span className="text-purple-200 font-semibold">💳 Credit/Debit Card</span>
            </label>
            
            <label className="flex items-center p-4 border-2 border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition bg-slate-800/50">
              <input type="radio" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 w-5 h-5" />
              <span className="text-purple-200 font-semibold">📱 UPI</span>
            </label>
            
            <label className="flex items-center p-4 border-2 border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition bg-slate-800/50">
              <input type="radio" name="payment" value="wallet" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 w-5 h-5" />
              <span className="text-purple-200 font-semibold">👛 Wallet</span>
            </label>
            
            <label className="flex items-center p-4 border-2 border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500 transition bg-slate-800/50">
              <input type="radio" name="payment" value="netbanking" onChange={(e) => setPaymentMethod(e.target.value)} className="mr-3 w-5 h-5" />
              <span className="text-purple-200 font-semibold">🏦 Net Banking</span>
            </label>
            
            <button type="submit" className="btn-primary w-full mt-6">
              Proceed to Pay ₹{selectedPlan.price}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Payment;
