import { useState } from 'react';

const Signup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.name.length < 3) newErrors.name = 'Name must be 3+ characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = 'Invalid 10-digit mobile';
    if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ name: formData.name, email: formData.email, mobile: formData.mobile, password: formData.password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created!');
      onNavigate('login');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-md mx-auto card-glass p-8">
        <div className="text-5xl text-center mb-4 animate-float">👤✨</div>
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Mobile Number:</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="input-field" />
            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Confirm Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field" />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-purple-200">
          Already have an account? <button onClick={() => onNavigate('login')} className="text-pink-400 font-semibold hover:underline">Login</button>
        </p>
      </section>
    </main>
  );
};

export default Signup;
