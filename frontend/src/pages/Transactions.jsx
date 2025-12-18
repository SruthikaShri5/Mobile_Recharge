import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userMobile = user.mobile
      const userId = user._id || user.id
      
      if (userMobile) {
        // Get user-specific transactions from database
        const url = userId 
          ? `http://localhost:3001/api/transactions/mobile/${userMobile}?userId=${userId}`
          : `http://localhost:3001/api/transactions/mobile/${userMobile}`
        
        const response = await fetch(url)
        const data = await response.json()
        
        if (data.success && data.transactions) {
          setTransactions(data.transactions)
        } else {
          // Fallback to localStorage filtered by user
          const localTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
          const userTransactions = localTransactions.filter(t => t.mobile === userMobile)
          setTransactions(userTransactions)
        }
      } else {
        setTransactions([])
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      // Fallback to localStorage filtered by user
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userMobile = user.mobile
      const localTransactions = JSON.parse(localStorage.getItem('transactions') || '[]')
      const userTransactions = userMobile ? localTransactions.filter(t => t.mobile === userMobile) : []
      setTransactions(userTransactions)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
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
              <button onClick={() => navigate('/dashboard')} className="text-emerald-600 hover:text-emerald-800 mr-4">
                ← Back
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Transaction History</h1>
            </div>
            <div className="flex items-center">
              <button onClick={() => { logout(); navigate('/login'); }} className="btn-rose py-2 px-4">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">No Transactions Found</h3>
              <p className="text-gray-500 mt-2">You haven't made any recharges yet.</p>
              <button 
                onClick={() => navigate('/recharge')}
                className="btn-emerald mt-4 py-2 px-6"
              >
                Make Your First Recharge
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={transaction._id || transaction.transactionId || index} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                          SUCCESS
                        </span>
                        <span className="text-sm text-gray-500">
                          {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : transaction.date}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Transaction ID</p>
                          <p className="font-medium">{transaction.transactionId || transaction.id}</p>
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
                      </div>
                      
                      {transaction.planName && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Plan: </span>
                          <span className="font-medium">{transaction.planName}</span>
                          {transaction.validity && (
                            <>
                              <span className="text-gray-500"> • Validity: </span>
                              <span className="font-medium">{transaction.validity}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Transactions