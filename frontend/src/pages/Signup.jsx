import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../schemas/validationSchemas';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });

  const checkPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    const strength = {
      0: { text: 'Very Weak', color: 'bg-red-500', width: '20%' },
      1: { text: 'Weak', color: 'bg-red-400', width: '40%' },
      2: { text: 'Fair', color: 'bg-yellow-500', width: '60%' },
      3: { text: 'Good', color: 'bg-blue-500', width: '80%' },
      4: { text: 'Strong', color: 'bg-green-500', width: '100%' },
      5: { text: 'Very Strong', color: 'bg-green-600', width: '100%' }
    };
    
    setPasswordStrength({ score, ...strength[score] });
  };

  const checkUnique = async (field, value) => {
    if (!value) return;
    try {
      const response = await fetch(`http://localhost:3002/api/auth/check-unique`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      });
      const result = await response.json();
      if (!result.unique) {
        setValidationErrors(prev => ({ ...prev, [field]: `${field} already exists` }));
      } else {
        setValidationErrors(prev => ({ ...prev, [field]: '' }));
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    
    try {
      // Register with backend API
      const response = await fetch('http://localhost:3002/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          mobile: data.phone,
          password: data.password
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message briefly
        setSuccessMessage('Account created successfully! Logging you in...');
        
        // Wait a moment to show success, then auto-login
        setTimeout(() => {
          login({ 
            name: result.user.username, 
            email: result.user.email, 
            mobile: result.user.mobile,
            _id: result.user.id,
            id: result.user.id 
          }, result.token);
          reset();
          navigate('/dashboard');
        }, 1500);
      } else {
        setServerError(result.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setServerError('Registration failed. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 font-opensans">
            Join our platform to get started
          </p>
        </div>
        
        {/* Error Message */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">{serverError}</p>
          </div>
        )}
        
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-3"></div>
              <p className="text-emerald-600 text-sm font-medium">{successMessage}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              {...register('name')} 
              className={`input-field ${errors.name ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Enter your full name" 
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              {...register('email')} 
              onBlur={(e) => checkUnique('email', e.target.value)}
              className={`input-field ${errors.email || validationErrors.email ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Enter your email" 
            />
            {validationErrors.email && <p className="mt-2 text-sm text-red-600 font-opensans">{validationErrors.email}</p>}
            {errors.email && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel" 
              {...register('phone')} 
              onBlur={(e) => {
                if (/^[0-9]{10}$/.test(e.target.value)) {
                  checkUnique('mobile', e.target.value);
                }
              }}
              maxLength="10"
              onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
              className={`input-field ${errors.phone || validationErrors.mobile ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Enter valid 10-digit phone number (6-9 start)" 
            />
            {validationErrors.mobile && <p className="mt-2 text-sm text-red-600 font-opensans">{validationErrors.mobile}</p>}
            {errors.phone && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.phone.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              {...register('password')} 
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className={`input-field ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Create a strong password" 
            />
            {password && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Password Strength:</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength.score <= 1 ? 'text-red-500' :
                    passwordStrength.score <= 2 ? 'text-yellow-500' :
                    passwordStrength.score <= 3 ? 'text-blue-500' : 'text-green-500'
                  }`}>
                    {passwordStrength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
              </div>
            )}
            <div className="mt-2 text-xs text-gray-500">
              Password must contain: 8+ characters, uppercase, lowercase, number, and special character
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.password.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium font-roboto text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              {...register('confirmPassword')} 
              className={`input-field ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : ''}`} 
              placeholder="Confirm your password" 
            />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 font-opensans">{errors.confirmPassword.message}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || successMessage}
            className={`btn-emerald w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
              (isLoading || successMessage) ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : successMessage ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging you in...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-opensans">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium font-roboto text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;