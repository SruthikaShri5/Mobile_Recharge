import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import SimpleRecharge from './pages/SimpleRecharge';
import Plans from './pages/Plans';
import RechargePlans from './pages/RechargePlans';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import Transactions from './pages/Transactions';
import Rewards from './pages/Rewards';
import Offers from './pages/Offers';
import Support from './pages/Support';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

function App() {


  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/recharge" element={<SimpleRecharge />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;