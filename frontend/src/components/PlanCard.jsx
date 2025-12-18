import { FiSmartphone, FiCalendar, FiDatabase } from 'react-icons/fi';

const PlanCard = ({ plan, onSelect }) => {
  return (
    <div className="card p-6 animate-scale-in hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="text-center mb-6">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
          plan.type === 'prepaid' ? 'bg-cyan-100 text-cyan-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {plan.type?.toUpperCase()}
        </div>
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiSmartphone className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold font-montserrat text-gray-900 mb-2">₹{plan.price}</h3>
        <p className="text-lg font-medium font-roboto text-gray-600 flex items-center justify-center">
          <FiCalendar className="w-4 h-4 mr-2" />
          {plan.validity}
        </p>
      </div>
      
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium font-opensans text-gray-700 flex items-center">
            <FiDatabase className="w-4 h-4 mr-2" />
            Data
          </span>
          <span className="font-bold text-gray-900">{plan.data}</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="font-medium font-opensans text-gray-700">Benefits</span>
          <p className="font-bold text-gray-900 mt-1">{plan.description}</p>
        </div>
      </div>
      
      <button 
        onClick={() => onSelect(plan)}
        className={`w-full py-3 rounded-xl font-semibold font-roboto transition-all duration-300 ${
          plan.type === 'prepaid' ? 'btn-cyan' : 'btn-orange'
        }`}
      >
        Select Plan
      </button>
    </div>
  );
};

export default PlanCard;