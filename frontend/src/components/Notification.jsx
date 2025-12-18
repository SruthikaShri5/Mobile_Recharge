import { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className={`notification ${type} animate-bounce`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{getIcon()}</span>
        <span className="font-semibold">{message}</span>
        <button onClick={onClose} className="ml-2 text-xl hover:scale-110 transition-transform">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;