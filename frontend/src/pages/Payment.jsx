import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiSmartphone, FiDollarSign, FiShield, FiCheck } from 'react-icons/fi';

const Payment = () => {
  const navigate = useNavigate();
  const [rechargeData, setRechargeData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const promoCodes = {
    'DATA20': { discount: 20, type: 'percentage', minAmount: 299 },
    'FIRST50': { discount: 50, type: 'fixed', minAmount: 500 },
    'WEEKEND2X': { discount: 15, type: 'percentage', minAmount: 199 }
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    const promo = promoCodes[code];
    const planPrice = selectedPlan.price || 0;
    
    if (!promo) {
      setPromoMessage('Invalid promo code');
      setDiscount(0);
      return;
    }
    
    if (planPrice < promo.minAmount) {
      setPromoMessage(`Minimum amount ₹${promo.minAmount} required`);
      setDiscount(0);
      return;
    }
    
    let discountAmount = 0;
    if (promo.type === 'percentage') {
      discountAmount = Math.round((planPrice * promo.discount) / 100);
    } else {
      discountAmount = promo.discount;
    }
    
    setDiscount(discountAmount);
    setPromoMessage(`Promo applied! You saved ₹${discountAmount}`);
  };

  const finalAmount = (selectedPlan.price || 0) - discount;

  useEffect(() => {
    const storedRecharge = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
    setRechargeData(storedRecharge);
    setSelectedPlan(storedPlan);
  }, []);

  const validatePaymentDetails = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!paymentDetails.expiryDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentDetails.expiryDate)) {
        newErrors.expiryDate = 'Please enter valid expiry date (MM/YY)';
      }
      if (!paymentDetails.cvv || paymentDetails.cvv.length !== 3) {
        newErrors.cvv = 'Please enter a valid 3-digit CVV';
      }
      if (!paymentDetails.cardName || paymentDetails.cardName.length < 2) {
        newErrors.cardName = 'Please enter cardholder name';
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId || !/^[\w.-]+@[\w.-]+$/.test(paymentDetails.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    } else if (paymentMethod === 'wallet') {
      if (!paymentDetails.walletType) {
        newErrors.walletType = 'Please select a wallet';
      }
      if (!paymentDetails.walletPhone || paymentDetails.walletPhone.length !== 10) {
        newErrors.walletPhone = 'Please enter a valid 10-digit phone number';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!paymentDetails.bankName) {
        newErrors.bankName = 'Please select your bank';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod && validatePaymentDetails()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('paymentMethod', JSON.stringify({
        method: paymentMethod,
        details: paymentDetails
      }));
      navigate('/confirmation');
    }
  };

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const paymentOptions = [
    { value: 'card', label: 'Credit/Debit Card', icon: FiCreditCard, color: 'emerald' },
    { value: 'upi', label: 'UPI Payment', icon: FiSmartphone, color: 'orange' },
    { value: 'wallet', label: 'Digital Wallet', icon: FiDollarSign, color: 'cyan' },
    { value: 'netbanking', label: 'Net Banking', icon: FiShield, color: 'rose' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold font-montserrat text-gray-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-lg sm:text-xl font-opensans text-gray-600">
            Secure and fast payment processing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="card p-6 sm:p-8 animate-scale-in">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mr-4">
                <FiSmartphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-900">
                Order Summary
              </h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Mobile Number</span>
                <span className="font-roboto font-semibold text-gray-900">{rechargeData.mobile || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Operator</span>
                <span className="font-roboto font-semibold text-gray-900 capitalize">{rechargeData.operator || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Plan</span>
                <span className="font-roboto font-semibold text-gray-900">₹{selectedPlan.price || 0}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Validity</span>
                <span className="font-roboto font-semibold text-gray-900">{selectedPlan.validity || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Data</span>
                <span className="font-roboto font-semibold text-gray-900">{selectedPlan.data || 'N/A'}</span>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code (e.g., DATA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <button 
                  type="button"
                  onClick={applyPromoCode}
                  className="btn-cyan px-4 py-3 rounded-lg font-medium"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs mt-2 ${discount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {promoMessage}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">Get promo codes from Special Offers section</p>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 rounded-xl border border-emerald-200">
              {discount > 0 && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-opensans text-gray-700">Plan Amount</span>
                    <span className="font-roboto text-gray-700">₹{selectedPlan.price || 0}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-opensans text-green-600">Discount</span>
                    <span className="font-roboto text-green-600">-₹{discount}</span>
                  </div>
                  <hr className="my-3 border-emerald-200" />
                </>
              )}
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-montserrat font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl sm:text-3xl font-bold font-montserrat text-emerald-600">₹{finalAmount}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="card p-6 sm:p-8 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl mr-4">
                <FiCreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-900">
                Payment Method
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {paymentOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div key={option.value}>
                    <label 
                      className={`flex items-center p-4 sm:p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                        paymentMethod === option.value 
                          ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value={option.value} 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                        className="sr-only" 
                      />
                      <div className={`p-3 rounded-xl mr-4 ${
                        paymentMethod === option.value 
                          ? 'bg-emerald-500' 
                          : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          paymentMethod === option.value ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`font-roboto font-semibold flex-1 ${
                        paymentMethod === option.value ? 'text-emerald-700' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </span>
                      {paymentMethod === option.value && (
                        <FiCheck className="w-5 h-5 text-emerald-600" />
                      )}
                    </label>
                    
                    {/* Payment Method Specific Forms */}
                    {paymentMethod === option.value && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
                        {option.value === 'card' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                              <input
                                type="text"
                                maxLength="16"
                                placeholder="1234 5678 9012 3456"
                                value={paymentDetails.cardNumber || ''}
                                onChange={(e) => handlePaymentDetailChange('cardNumber', e.target.value.replace(/\D/g, ''))}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                  errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                                }`}
                              />
                              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  maxLength="5"
                                  value={paymentDetails.expiryDate || ''}
                                  onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length >= 2) value = value.slice(0,2) + '/' + value.slice(2,4);
                                    handlePaymentDetailChange('expiryDate', value);
                                  }}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                    errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                />
                                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                <input
                                  type="text"
                                  maxLength="3"
                                  placeholder="123"
                                  value={paymentDetails.cvv || ''}
                                  onChange={(e) => handlePaymentDetailChange('cvv', e.target.value.replace(/\D/g, ''))}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                    errors.cvv ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                />
                                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                              <input
                                type="text"
                                placeholder="John Doe"
                                value={paymentDetails.cardName || ''}
                                onChange={(e) => handlePaymentDetailChange('cardName', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                  errors.cardName ? 'border-red-300' : 'border-gray-300'
                                }`}
                              />
                              {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                            </div>
                          </>
                        )}
                        
                        {option.value === 'upi' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                            <input
                              type="text"
                              placeholder="yourname@paytm"
                              value={paymentDetails.upiId || ''}
                              onChange={(e) => handlePaymentDetailChange('upiId', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                errors.upiId ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                            {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                          </div>
                        )}
                        
                        {option.value === 'wallet' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Select Wallet</label>
                              <select
                                value={paymentDetails.walletType || ''}
                                onChange={(e) => handlePaymentDetailChange('walletType', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                  errors.walletType ? 'border-red-300' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Choose Wallet</option>
                                <option value="paytm">Paytm</option>
                                <option value="phonepe">PhonePe</option>
                                <option value="googlepay">Google Pay</option>
                                <option value="amazonpay">Amazon Pay</option>
                              </select>
                              {errors.walletType && <p className="text-red-500 text-sm mt-1">{errors.walletType}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                              <input
                                type="text"
                                maxLength="10"
                                placeholder="9876543210"
                                value={paymentDetails.walletPhone || ''}
                                onChange={(e) => handlePaymentDetailChange('walletPhone', e.target.value.replace(/\D/g, ''))}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                  errors.walletPhone ? 'border-red-300' : 'border-gray-300'
                                }`}
                              />
                              {errors.walletPhone && <p className="text-red-500 text-sm mt-1">{errors.walletPhone}</p>}
                            </div>
                          </>
                        )}
                        
                        {option.value === 'netbanking' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                            <select
                              value={paymentDetails.bankName || ''}
                              onChange={(e) => handlePaymentDetailChange('bankName', e.target.value)}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                                errors.bankName ? 'border-red-300' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Choose Bank</option>
                              <option value="sbi">State Bank of India</option>
                              <option value="hdfc">HDFC Bank</option>
                              <option value="icici">ICICI Bank</option>
                              <option value="axis">Axis Bank</option>
                              <option value="kotak">Kotak Mahindra Bank</option>
                              <option value="pnb">Punjab National Bank</option>
                            </select>
                            {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              <button 
                type="submit" 
                disabled={!paymentMethod || isLoading || Object.keys(errors).length > 0}
                className={`btn-emerald w-full py-4 text-lg font-semibold mt-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  `Proceed to Pay ₹${finalAmount}`
                )}
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center text-sm text-gray-600">
                <FiShield className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="font-opensans">Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
