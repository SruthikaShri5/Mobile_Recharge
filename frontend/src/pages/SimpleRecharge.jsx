import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SimpleRecharge = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    operator: '',
    planType: ''
  })
  const [loading, setLoading] = useState(false)
  const [mobileError, setMobileError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate mobile number
    if (!validateMobile(formData.mobile)) {
      return
    }
    
    setLoading(true)
    
    // Save data and navigate
    localStorage.setItem('rechargeData', JSON.stringify(formData))
    
    setTimeout(() => {
      setLoading(false)
      navigate('/plans')
    }, 500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'mobile') {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, '')
      setFormData({
        ...formData,
        [name]: numericValue
      })
      
      // Validate mobile number
      if (numericValue.length === 10) {
        validateMobile(numericValue)
      } else if (numericValue.length > 0) {
        setMobileError('Mobile number must be 10 digits')
      } else {
        setMobileError('')
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  
  const validateMobile = (mobile) => {
    if (mobile.length !== 10) {
      setMobileError('Mobile number must be 10 digits')
      return false
    }
    if (mobile === '0000000000') {
      setMobileError('Mobile number cannot be all zeros')
      return false
    }
    if (!/^[6-9]/.test(mobile)) {
      setMobileError('Mobile number must start with 6, 7, 8, or 9')
      return false
    }
    setMobileError('')
    return true
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
              Mobile Recharge
            </h1>
            <p className="text-gray-600 font-opensans">
              Enter your details to browse plans
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">
                Mobile Number:
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
                maxLength="10"
                className={`input-field ${mobileError ? 'border-red-300 focus:border-red-500' : ''}`}
                required
              />
              {mobileError && <p className="mt-2 text-sm text-red-600">{mobileError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">
                Select Operator:
              </label>
              <select
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose Operator</option>
                <option value="airtel">Airtel</option>
                <option value="jio">Jio</option>
                <option value="vi">Vi (Vodafone Idea)</option>
                <option value="bsnl">BSNL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">
                Plan Type:
              </label>
              <select
                name="planType"
                value={formData.planType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Choose Plan Type</option>
                <option value="topup">Topups</option>
                <option value="data">Data Plans</option>
                <option value="prepaid">Prepaid</option>
                <option value="postpaid">Postpaid</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-emerald w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              ) : (
                'Browse Plans'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SimpleRecharge