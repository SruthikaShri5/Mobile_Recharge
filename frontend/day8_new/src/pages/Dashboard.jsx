import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const Dashboard = ({ onNavigate }) => {
  const { user, setUser } = useApp();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.email) {
      setUser(currentUser);
    }
    const storedHistory = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    setHistory(storedHistory);
  }, [setUser]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold gradient-text mb-8">🏠 User Dashboard</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <article className="card-glass p-6">
          <h3 className="text-2xl font-bold gradient-text mb-4">👤 Account Details</h3>
          <div className="space-y-2 text-purple-200">
            <p><strong>Name:</strong> {user?.name || JSON.parse(localStorage.getItem('currentUser') || '{}').name || 'Guest'}</p>
            <p><strong>Email:</strong> {user?.email || JSON.parse(localStorage.getItem('currentUser') || '{}').email || 'N/A'}</p>
            <p><strong>Mobile:</strong> {user?.mobile || JSON.parse(localStorage.getItem('currentUser') || '{}').mobile || 'N/A'}</p>
          </div>
        </article>
        
        <article className="card-glass p-6">
          <h3 className="text-2xl font-bold gradient-text mb-4">⚡ Quick Actions</h3>
          <button onClick={() => onNavigate('recharge')} className="btn-primary w-full">
            New Recharge
          </button>
        </article>
      </div>
      
      <article className="card-glass p-6">
        <h3 className="text-2xl font-bold gradient-text mb-4">📊 Recharge History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Operator</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-purple-200">
              {history.length > 0 ? history.map((item, index) => (
                <tr key={index} className="border-b border-purple-500/30 hover:bg-purple-900/30">
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.mobile}</td>
                  <td className="px-4 py-3">{item.operator.toUpperCase()}</td>
                  <td className="px-4 py-3">₹{item.amount}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-4 py-3 text-center">No recharge history</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  );
};

export default Dashboard;
