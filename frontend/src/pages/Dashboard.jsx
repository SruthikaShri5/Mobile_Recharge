import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiCreditCard, FiTrendingUp, FiDollarSign, FiClock, FiStar, FiZap, FiGift, FiAward, FiUsers } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalRecharges: 0,
    totalSpent: 0,
    successRate: 0,
    rewardsEarned: 0
  });

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const userMobile = user?.mobile;
        const userId = user?._id || user?.id;
        
        console.log('Dashboard: User data:', { userMobile, userId, fullUser: user });
        
        if (userId) {
          const url = `${import.meta.env.VITE_API_URL}/api/transactions/user/${userId}`;
          console.log('Dashboard: Fetching from:', url);
          
          const response = await fetch(url);
          const data = await response.json();
          
          console.log('Dashboard: API response:', data);
          
          if (data.success && data.transactions) {
            const transactions = data.transactions;
            console.log('Dashboard: Found transactions:', transactions);
            setRecentTransactions(transactions.slice(0, 5));
            
            const totalRecharges = transactions.length;
            const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
            const successRate = totalRecharges > 0 ? 100 : 0;
            const rewardsEarned = Math.floor(totalSpent * 0.02);
            
            setStats({ totalRecharges, totalSpent, successRate, rewardsEarned });
          } else {
            console.log('Dashboard: No transactions found');
          }
        } else {
          console.log('Dashboard: Missing userId');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    
    fetchUserTransactions();
    
    // Refresh data when returning to dashboard
    const handleFocus = () => fetchUserTransactions();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);
  
  // Listen for dashboard refresh flag
  useEffect(() => {
    const checkRefresh = () => {
      const refreshFlag = localStorage.getItem('dashboardRefresh');
      if (refreshFlag) {
        localStorage.removeItem('dashboardRefresh');
        window.location.reload();
      }
    };
    
    const interval = setInterval(checkRefresh, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      title: "Mobile Recharge",
      description: "Instant recharge for all operators",
      link: "/recharge",
      color: "btn-emerald",
      bgColor: "stat-card-emerald"
    },
    {
      title: "Browse Plans",
      description: "Discover best value plans",
      link: "/plans",
      color: "btn-orange",
      bgColor: "stat-card-orange"
    },
    {
      title: "Payment Methods",
      description: "Manage your payment options",
      link: "/payment",
      color: "btn-cyan",
      bgColor: "stat-card-cyan"
    },
    {
      title: "Rewards Center",
      description: "Check your cashback & offers",
      link: "/rewards",
      color: "btn-rose",
      bgColor: "stat-card-rose"
    }
  ];

  const statCards = [
    {
      title: "Total Recharges",
      value: stats.totalRecharges,
      color: "stat-card-emerald",
      change: "+12%",
      font: "font-montserrat"
    },
    {
      title: "Amount Spent",
      value: `₹${stats.totalSpent.toLocaleString()}`,
      color: "stat-card-orange",
      change: "+8%",
      font: "font-roboto"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      color: "stat-card-cyan",
      change: "+2%",
      font: "font-opensans"
    },
    {
      title: "Rewards Earned",
      value: `₹${stats.rewardsEarned}`,
      color: "stat-card-rose",
      change: "+15%",
      font: "font-lato"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-xl font-opensans text-gray-600">
              Manage your mobile recharges and track your activity
            </p>
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn-emerald mt-4 py-2 px-4 inline-block">
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`card p-8 ${stat.color} animate-scale-in hover:shadow-2xl transform hover:-translate-y-2`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <h3 className={`text-4xl font-bold text-gray-900 mb-3 ${stat.font}`}>
                {stat.value}
              </h3>
              <p className="text-gray-900 font-bold text-lg">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-8 animate-fade-in">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`card p-8 text-center ${action.bgColor} animate-slide-in hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 group`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="text-xl font-bold font-roboto text-gray-900 mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-600 font-opensans leading-relaxed mb-6">
                  {action.description}
                </p>
                <button className={`${action.color} px-6 py-3 rounded-xl font-medium transition-all duration-300`}>
                  Get Started
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="card p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-montserrat text-gray-900">
                  Recent Transactions
                </h2>
                <Link 
                  to="/transactions" 
                  className="text-emerald-600 hover:text-emerald-700 font-medium font-roboto transition-colors"
                >
                  View All →
                </Link>
              </div>
              
              {recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        <p className="font-semibold font-roboto text-gray-900">
                          {transaction.operator || 'Mobile Recharge'}
                        </p>
                        <p className="text-sm font-opensans text-gray-600">
                          {transaction.mobile || 'N/A'} • {new Date(transaction.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold font-montserrat text-gray-900">
                          ₹{transaction.amount || 0}
                        </p>
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700">
                          Success
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold font-roboto text-gray-900 mb-2">
                    No transactions yet
                  </h3>
                  <p className="text-gray-600 font-opensans mb-6">
                    Start your first recharge to see your transaction history
                  </p>
                  <Link 
                    to="/recharge" 
                    className="btn-emerald px-6 py-3 rounded-xl font-medium"
                  >
                    Start Recharging
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Offers Card */}
            <div className="card p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 animate-scale-in">
              <h3 className="text-lg font-bold font-roboto text-gray-900 mb-4">
                Special Offers
              </h3>
              <img 
                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=150&fit=crop&auto=format" 
                alt="Special Offers" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-sm font-opensans text-gray-600 mb-4">
                Get 20% extra data on recharges above ₹299. Limited time offer!
              </p>
              <Link to="/offers" className="btn-orange w-full py-2 rounded-lg font-medium text-sm text-center block">
                Claim Offer
              </Link>
            </div>

            {/* Support Card */}
            <div className="card p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 animate-scale-in" style={{animationDelay: '0.2s'}}>
              <h3 className="text-lg font-bold font-roboto text-gray-900 mb-4">
                Need Help?
              </h3>
              <img 
                src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=150&fit=crop&auto=format" 
                alt="Customer Support" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-sm font-opensans text-gray-600 mb-4">
                Our 24/7 support team is here to help you with any questions.
              </p>
              <Link to="/support" className="btn-cyan w-full py-2 rounded-lg font-medium text-sm text-center block">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;