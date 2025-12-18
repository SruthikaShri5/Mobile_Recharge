import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiDownload, FiPrinter } from 'react-icons/fi';

const Confirmation = () => {
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;
    
    const processTransaction = async () => {
      
      const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
      const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
      const paymentMethodData = JSON.parse(localStorage.getItem('paymentMethod') || '{}');
      
      if (!rechargeData.mobile || !selectedPlan.price) {
        setIsLoading(false);
        return;
      }
      
      const txnId = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
      const currentDate = new Date().toLocaleDateString('en-IN');
      const currentTime = new Date().toLocaleTimeString('en-IN');
      
      let paymentDisplay = 'UPI';
      if (paymentMethodData?.method) {
        const methodMap = {
          'card': 'Credit/Debit Card',
          'upi': 'UPI Payment',
          'wallet': 'Digital Wallet',
          'netbanking': 'Net Banking'
        };
        paymentDisplay = methodMap[paymentMethodData.method] || paymentMethodData.method;
      }
      
      const txn = {
        id: txnId,
        date: currentDate,
        time: currentTime,
        mobile: rechargeData.mobile,
        operator: rechargeData.operator,
        planName: selectedPlan.planName || `₹${selectedPlan.price} Plan`,
        planType: selectedPlan.type || 'prepaid',
        plan: `₹${selectedPlan.price} - ${selectedPlan.validity || 'N/A'}`,
        data: selectedPlan.data || 'Not Available',
        validity: selectedPlan.validity || 'Not Available',
        description: selectedPlan.description || 'Plan benefits not available',
        amount: selectedPlan.price,
        paymentMethod: paymentDisplay
      };
      
      setTransaction(txn);
      
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('Current user for transaction:', user);
        
        const transactionData = {
          userId: user._id || user.id,
          mobile: rechargeData.mobile,
          operator: rechargeData.operator,
          planName: selectedPlan.planName || `₹${selectedPlan.price} Plan`,
          planType: rechargeData.planType || selectedPlan.type || 'prepaid',
          amount: selectedPlan.price,
          validity: selectedPlan.validity || 'N/A',
          data: selectedPlan.data || 'N/A',
          description: selectedPlan.description || 'Plan benefits not available',
          paymentMethod: paymentDisplay,
          status: 'success'
        };
        
        console.log('Saving transaction data:', transactionData);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData)
        });
        
        const result = await response.json();
        console.log('Confirmation: Transaction save result:', result);
        console.log('Confirmation: Response status:', response.status);
        
        if (!result.success) {
          console.error('Confirmation: Failed to save transaction:', result);
        } else {
          console.log('Confirmation: Transaction saved successfully with ID:', result.transaction?._id);
        }
        
      } catch (error) {
        console.error('Failed to save transaction:', error);
      }
      
      localStorage.removeItem('rechargeData');
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('paymentMethod');
      
      // Force dashboard refresh by setting a flag
      localStorage.setItem('dashboardRefresh', Date.now().toString());
      
      setIsLoading(false);
    };
    
    processTransaction();
  }, []);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-opensans text-gray-600">Processing your transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-6 sm:p-8 lg:p-12 text-center animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <FiCheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montserrat text-gray-900 mb-2">
            Recharge Successful!
          </h2>
          <p className="text-lg sm:text-xl font-opensans text-emerald-600 mb-8 font-semibold">
            Your mobile recharge has been completed successfully
          </p>
          
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 text-left border-2 border-gray-200 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold font-montserrat text-gray-900 mb-6 text-center">
              Transaction Details
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Transaction ID:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base break-all">{transaction.id || 'N/A'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Date & Time:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.date} at {transaction.time}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Mobile Number:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.mobile}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Operator:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.operator?.toUpperCase()}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Plan Name:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.planName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Plan Type:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base capitalize">{transaction.planType}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Data Allowance:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.data}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Validity:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.validity}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Benefits:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.description}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                <span className="font-medium font-opensans text-gray-700 text-sm sm:text-base">Payment Method:</span>
                <span className="font-bold font-roboto text-gray-900 text-sm sm:text-base">{transaction.paymentMethod}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-emerald-50 rounded-lg border-2 border-emerald-200 gap-2 sm:gap-0">
                <span className="font-bold font-opensans text-emerald-800 text-base sm:text-lg">Amount Paid:</span>
                <span className="font-bold font-montserrat text-emerald-900 text-lg sm:text-xl">₹{transaction.amount}</span>
              </div>
              <div className="text-center p-4">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold font-roboto shadow-lg text-sm sm:text-base">
                  SUCCESS
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-base sm:text-lg mb-8 text-center font-opensans text-gray-600">
            Your mobile has been successfully recharged and is ready to use.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link 
              to="/dashboard" 
              className="btn-emerald py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold font-roboto hover:scale-105 transition-transform text-sm sm:text-base"
            >
              Back to Dashboard
            </Link>
            <Link 
              to="/recharge" 
              className="btn-cyan py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold font-roboto hover:scale-105 transition-transform text-sm sm:text-base"
            >
              New Recharge
            </Link>
            <button 
              onClick={() => window.print()} 
              className="btn-orange py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold font-roboto hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FiPrinter className="w-4 h-4" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;