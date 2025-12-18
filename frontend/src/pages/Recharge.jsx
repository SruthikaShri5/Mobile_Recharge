import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rechargeSchema } from '../schemas/validationSchemas';
import { useApp } from '../context/AppContext';

const Recharge = () => {
  const { setRechargeData } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userMobile, setUserMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(rechargeSchema)
  });

  useEffect(() => {
    // Don't auto-fill mobile number, let user enter it
    const savedData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    if (savedData.mobile) {
      setUserMobile(savedData.mobile);
      setValue('mobile', savedData.mobile);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      console.log('Recharge form data:', JSON.stringify(data, null, 2));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRechargeData(data);
      localStorage.setItem('rechargeData', JSON.stringify(data));
      console.log('Saved to localStorage:', JSON.stringify(data, null, 2));
      reset();
      navigate('/plans');
    } catch (error) {
      console.error('Error processing recharge data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-lg mx-auto card-glass p-8">
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Mobile Recharge</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Mobile Number:</label>
            <input 
              type="tel" 
              {...register('mobile')}
              placeholder="Enter valid 10 digit mobile number (6-9 start)"
              defaultValue={userMobile}
              maxLength="10"
              onInput={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = value;
                
                // Real-time validation
                if (value.length === 0) {
                  setMobileError('');
                } else if (value.length < 10) {
                  setMobileError('Mobile number must be 10 digits');
                } else if (value === '0000000000') {
                  setMobileError('Mobile number cannot be all zeros');
                } else if (!/^[6-9]/.test(value)) {
                  setMobileError('Mobile number must start with 6, 7, 8, or 9');
                } else {
                  setMobileError('');
                }
              }}
              className={`input-field ${errors.mobile || mobileError ? 'border-red-300 focus:border-red-500' : ''}`}
            />
            {(mobileError || errors.mobile) && <p className="mt-2 text-sm text-red-600 font-opensans">{mobileError || errors.mobile?.message}</p>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Select Operator:</label>
            <select 
              {...register('operator')} 
              className={`input-field ${errors.operator ? 'border-red-300 focus:border-red-500' : ''}`}
            >
              <option value="">Choose Operator</option>
              <option value="airtel">Airtel</option>
              <option value="jio">Jio</option>
              <option value="vi">Vi (Vodafone Idea)</option>
              <option value="bsnl">BSNL</option>
            </select>
            {errors.operator && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.operator.message}</p>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Plan Type:</label>
            <select 
              {...register('planType')} 
              className={`input-field ${errors.planType ? 'border-red-300 focus:border-red-500' : ''}`}
            >
              <option value="">Choose Plan Type</option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
              <option value="data">Data Plans</option>
              <option value="topup">Top-ups</option>
            </select>
            {errors.planType && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.planType.message}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`btn-emerald w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              'Browse Plans'
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Recharge;
