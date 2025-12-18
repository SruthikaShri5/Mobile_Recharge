import { useEffect, useState } from 'react';

const Confirmation = ({ onNavigate }) => {
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
    
    const txnId = 'TXN' + Math.floor(Math.random() * 1000000000);
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    const txn = {
      id: txnId,
      date: currentDate,
      mobile: rechargeData.mobile,
      operator: rechargeData.operator,
      plan: `₹${selectedPlan.price} - ${selectedPlan.validity}`,
      amount: selectedPlan.price
    };
    
    setTransaction(txn);
    
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    history.unshift({
      date: currentDate,
      mobile: rechargeData.mobile,
      operator: rechargeData.operator,
      amount: selectedPlan.price,
      status: 'Success'
    });
    localStorage.setItem('rechargeHistory', JSON.stringify(history.slice(0, 10)));
  }, []);

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-2xl mx-auto card-glass p-8 text-center">
        <div className="text-6xl mb-4 animate-float">✅</div>
        <h2 className="text-4xl font-bold text-green-400 mb-6">Recharge Successful!</h2>
        
        <article className="bg-gradient-to-br from-slate-800 to-purple-900/50 rounded-lg p-6 mb-6 text-left border border-purple-500/30">
          <h3 className="text-2xl font-bold gradient-text mb-4">📦 Transaction Details</h3>
          <div className="space-y-2 text-purple-200">
            <p><strong>Transaction ID:</strong> {transaction.id}</p>
            <p><strong>Date:</strong> {transaction.date}</p>
            <p><strong>Mobile:</strong> {transaction.mobile}</p>
            <p><strong>Operator:</strong> {transaction.operator?.toUpperCase()}</p>
            <p><strong>Plan:</strong> {transaction.plan}</p>
            <p><strong>Amount Paid:</strong> ₹{transaction.amount}</p>
            <p><strong>Status:</strong> <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">Success</span></p>
          </div>
        </article>
        
        <div className="flex gap-4 justify-center">
          <button onClick={() => onNavigate('dashboard')} className="btn-primary">
            Go to Dashboard
          </button>
          <button onClick={() => onNavigate('recharge')} className="btn-secondary">
            New Recharge
          </button>
        </div>
      </section>
    </main>
  );
};

export default Confirmation;
