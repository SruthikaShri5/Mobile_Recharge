import { useState } from 'react';

const Sidebar = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg glow-purple"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      <aside className={`fixed left-0 top-16 h-full bg-slate-800 border-r border-purple-500/30 shadow-2xl transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:top-0 w-64`}>
        <div className="p-6">
          <h3 className="text-xl font-bold gradient-text mb-4">Menu</h3>
          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div className="block w-full text-left p-2 text-slate-300 hover:bg-purple-600 hover:text-white rounded transition">
                  {item.icon} {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
