import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setUser } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be 6+ characters';
    }

    if (Object.keys(newErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        onNavigate('dashboard');
      } else {
        alert('Invalid credentials!');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-md mx-auto card-glass p-8">
        <div className="text-5xl text-center mb-4 animate-float">🔑</div>
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-purple-200">
          Don't have an account? <button onClick={() => onNavigate('signup')} className="text-pink-400 font-semibold hover:underline">Sign up</button>
        </p>
      </section>
    </main>
  );
};

export default Login;
