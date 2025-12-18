import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const menuItems = [
    { label: 'Home', icon: '🏠' },
    { label: 'Dashboard', icon: '📊' },
    { label: 'Recharge', icon: '📱' },
    { label: 'Plans', icon: '🎯' },
  ];

  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-gradient flex flex-col">
        <Navbar isLoggedIn={false} />
        <div className="flex flex-1">
          <Sidebar menuItems={menuItems} />
          <div className="flex-1">
            <Home />
          </div>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
