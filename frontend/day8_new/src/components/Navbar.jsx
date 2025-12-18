import { useApp } from '../context/AppContext';

const Navbar = ({ isLoggedIn }) => {
  const { user } = useApp();

  return (
    <header className="navbar-gradient text-white shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-3">Mobile Recharge Portal</h1>
        <nav className="flex gap-6">
          {isLoggedIn ? (
            <>
              <span className="hover:text-purple-300 transition">Dashboard</span>
              <span className="hover:text-pink-300 transition">Recharge</span>
              <span className="hover:text-rose-300 transition">Logout</span>
              {user && <span className="ml-auto">👤 {user.name}</span>}
            </>
          ) : (
            <>
              <span className="hover:text-purple-300 transition">Home</span>
              <span className="hover:text-pink-300 transition">Login</span>
              <span className="hover:text-rose-300 transition">Signup</span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
