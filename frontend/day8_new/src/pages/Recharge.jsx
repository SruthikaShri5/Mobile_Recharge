import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Recharge = ({ onNavigate }) => {
  const { setRechargeData } = useApp();
  const [formData, setFormData] = useState({ mobile: '', operator: '', planType: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation for mobile
    if (name === 'mobile') {
      const newErrors = { ...errors };
      if (!value) {
        newErrors.mobile = 'Mobile number is required';
      } else if (value.length !== 10) {
        newErrors.mobile = 'Mobile number must be 10 digits';
      } else if (!/^[6-9]/.test(value)) {
        newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9';
      } else if (value === '0000000000') {
        newErrors.mobile = 'Mobile number cannot be all zeros';
      } else {
        delete newErrors.mobile;
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    } else if (!/^[6-9]/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must start with 6, 7, 8, or 9';
    } else if (formData.mobile === '0000000000') {
      newErrors.mobile = 'Mobile number cannot be all zeros';
    }
    if (!formData.operator) newErrors.operator = 'Select an operator';
    if (!formData.planType) newErrors.planType = 'Select a plan type';

    if (Object.keys(newErrors).length === 0) {
      setRechargeData(formData);
      localStorage.setItem('rechargeData', JSON.stringify(formData));
      onNavigate('plans');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-lg mx-auto card-glass p-8">
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Mobile Recharge</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Mobile Number:</label>
            <input 
              type="tel" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleChange}
              placeholder="Enter 10 digit mobile number"
              className="input-field"
            />
            {errors.mobile && <span className="text-red-400 text-sm">{errors.mobile}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Select Operator:</label>
            <select name="operator" value={formData.operator} onChange={handleChange} className="input-field">
              <option value="">Choose Operator</option>
              <option value="airtel">Airtel</option>
              <option value="jio">Jio</option>
              <option value="vi">Vi (Vodafone Idea)</option>
              <option value="bsnl">BSNL</option>
            </select>
            {errors.operator && <span className="text-red-400 text-sm">{errors.operator}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Plan Type:</label>
            <select name="planType" value={formData.planType} onChange={handleChange} className="input-field">
              <option value="">Choose Plan Type</option>
              <option value="prepaid">Prepaid</option>
              <option value="postpaid">Postpaid</option>
            </select>
            {errors.planType && <span className="text-red-400 text-sm">{errors.planType}</span>}
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Browse Plans
          </button>
        </form>
      </section>
    </main>
  );
};

export default Recharge;
