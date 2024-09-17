import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const RotatePad = () => {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setActiveKey('left');
      if (e.key === 'ArrowRight') setActiveKey('right');
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const KeyButton = ({ keyName, children }) => (
    <motion.div
      className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg shadow-md ${
        activeKey === keyName
          ? 'bg-purple-500 text-white'
          : 'bg-gray-200 text-gray-700'
      }`}
      animate={{
        scale: activeKey === keyName ? 0.95 : 1,
        boxShadow:
          activeKey === keyName
            ? '0px 0px 8px rgba(159, 122, 234, 0.5)'
            : '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="inline-grid grid-cols-2 gap-2 bg-gray-100 p-4 rounded-xl shadow-lg">
      <KeyButton keyName="left">
        <ArrowLeft size={24} />
      </KeyButton>
      <KeyButton keyName="right">
        <ArrowRight size={24} />
      </KeyButton>
    </div>
  );
};

export default RotatePad;
