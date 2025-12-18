import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiDownload, FiSearch, FiDollarSign, FiUsers, FiActivity } from 'react-icons/fi'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [userSearch, setUserSearch] = useState('')
  const [transactionSearch, setTransactionSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard')
      return
    }
    fetchData()
  }, [user, navigate])

  useEffect(() => {
    const filtered = users.filter(u => 
      u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.mobile.includes(userSearch)
    )
    setFilteredUsers(filtered)
  }, [userSearch, users])

  useEffect(() => {
    let filtered = transactions
    if (transactionSearch) {
      filtered = filtered.filter(t => 
        t.transactionId.toLowerCase().includes(transactionSearch.toLowerCase()) ||
        t.mobile.includes(transactionSearch) ||
        t.operator.toLowerCase().includes(transactionSearch.toLowerCase())
      )
    }
    if (dateFilter) {
      filtered = filtered.filter(t => 
        new Date(t.createdAt).toISOString().split('T')[0] === dateFilter
      )
    }
    setFilteredTransactions(filtered)
  }, [transactionSearch, dateFilter, transactions])

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0)
  const todayTransactions = transactions.filter(t => 
    new Date(t.createdAt).toDateString() === new Date().toDateString()
  ).length

  const operatorData = transactions.reduce((acc, t) => {
    const op = t.operator
    acc[op] = (acc[op] || 0) + 1
    return acc
  }, {})
  const operatorChartData = Object.entries(operatorData).map(([name, value]) => ({ name, value }))

  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()

  const dailyRevenue = last7Days.map(date => {
    const dayTransactions = transactions.filter(t => 
      new Date(t.createdAt).toISOString().split('T')[0] === date
    )
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: dayTransactions.reduce((sum, t) => sum + t.amount, 0),
      count: dayTransactions.length
    }
  })

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']

  const exportToCSV = (data, filename) => {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }

  const fetchData = async () => {
    try {
      console.log('Fetching admin data with token:', token ? 'Present' : 'Missing')
      
      const [usersRes, transactionsRes] = await Promise.all([
        fetch('http://localhost:3002/api/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:3002/api/transactions', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      console.log('Users response status:', usersRes.status)
      console.log('Transactions response status:', transactionsRes.status)

      const usersData = await usersRes.json()
      const transactionsData = await transactionsRes.json()

      console.log('Users data:', usersData)
      console.log('Transactions data:', transactionsData)

      if (usersData.success) {
        setUsers(usersData.users)
        setFilteredUsers(usersData.users)
        console.log('Loaded users:', usersData.users.length)
      } else {
        console.error('Failed to fetch users:', usersData.message)
      }
      
      if (transactionsData.success) {
        setTransactions(transactionsData.transactions)
        setFilteredTransactions(transactionsData.transactions)
        console.log('Loaded transactions:', transactionsData.transactions.length)
      } else {
        console.error('Failed to fetch transactions:', transactionsData.message)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/dashboard')} className="text-emerald-600 hover:text-emerald-800">
                User View
              </button>
              <button onClick={() => { logout(); navigate('/login'); }} className="btn-rose py-2 px-4">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'users' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'transactions' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Transactions ({transactions.length})
            </button>
          </div>

          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="card p-6 bg-gradient-to-br from-emerald-500 to-teal-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-black text-sm font-medium">Total Revenue</p>
                      <h3 className="text-3xl font-bold mt-2 text-black">₹{totalRevenue.toLocaleString()}</h3>
                    </div>
                    <span className="text-4xl text-black opacity-30">₹</span>
                  </div>
                </div>
                <div className="card p-6 bg-gradient-to-br from-blue-500 to-indigo-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-black text-sm font-medium">Total Users</p>
                      <h3 className="text-3xl font-bold mt-2 text-black">{users.filter(u => u.role !== 'admin').length}</h3>
                      <p className="text-black text-xs opacity-75">({users.length} total including admin)</p>
                    </div>
                    <FiUsers className="w-12 h-12 text-black opacity-30" />
                  </div>
                </div>
                <div className="card p-6 bg-gradient-to-br from-purple-500 to-pink-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-black text-sm font-medium">Today's Transactions</p>
                      <h3 className="text-3xl font-bold mt-2 text-black">{todayTransactions}</h3>
                    </div>
                    <span className="text-4xl text-black opacity-30">#</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold mb-4">Revenue Trend (Last 7 Days)</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue (₹)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="card p-6">
                  <h2 className="text-lg font-semibold mb-4">Transactions by Operator</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={operatorChartData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                        {operatorChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h2 className="text-lg font-semibold mb-4">Daily Transaction Count</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#3b82f6" name="Transactions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction._id} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <p className="font-medium">{transaction.mobile}</p>
                          <p className="text-sm text-gray-500">{transaction.operator} - {transaction.planName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">₹{transaction.amount}</p>
                          <p className="text-xs text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">All Users</h2>
                <button onClick={() => exportToCSV(users.map(u => ({name: u.username, email: u.email, mobile: u.mobile, role: u.role})), 'users.csv')} className="btn-emerald py-2 px-4 flex items-center gap-2">
                  <FiDownload /> Export CSV
                </button>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or mobile..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.mobile}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">All Transactions</h2>
                <button onClick={() => exportToCSV(transactions.map(t => ({id: t.transactionId, mobile: t.mobile, operator: t.operator, amount: t.amount, date: new Date(t.createdAt).toLocaleDateString()})), 'transactions.csv')} className="btn-emerald py-2 px-4 flex items-center gap-2">
                  <FiDownload /> Export CSV
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, mobile, or operator..."
                    value={transactionSearch}
                    onChange={(e) => setTransactionSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction._id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Transaction ID</p>
                        <p className="font-medium">{transaction.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Mobile</p>
                        <p className="font-medium">{transaction.mobile}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Operator</p>
                        <p className="font-medium capitalize">{transaction.operator}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-bold text-emerald-600">₹{transaction.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Plan</p>
                        <p className="font-medium">{transaction.planName}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-medium">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard