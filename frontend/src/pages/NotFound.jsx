import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="card p-8 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
          
          <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-4">
            Page Not Found
          </h1>
          
          <p className="text-lg font-opensans text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/dashboard" 
              className="btn-emerald py-3 px-6 rounded-xl font-semibold font-roboto hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <FiHome className="w-4 h-4" />
              Go to Dashboard
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="btn-cyan py-3 px-6 rounded-xl font-semibold font-roboto hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;