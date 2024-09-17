import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const KeyPad = () => {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        setActiveKey(e.key.toLowerCase());
      }
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

  const KeyButton = ({ keyName }) => (
    <motion.div
      className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-lg shadow-md ${
        activeKey === keyName
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700'
      }`}
      animate={{
        scale: activeKey === keyName ? 0.95 : 1,
        boxShadow:
          activeKey === keyName
            ? '0px 0px 8px rgba(59, 130, 246, 0.5)'
            : '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {keyName.toUpperCase()}
    </motion.div>
  );

  return (
    <div className="inline-grid grid-cols-3 gap-2 bg-gray-100 p-4 rounded-xl shadow-lg">
      <div className="col-start-2">
        <KeyButton keyName="w" />
      </div>
      <div className="col-start-1 row-start-2">
        <KeyButton keyName="a" />
      </div>
      <div className="col-start-2 row-start-2">
        <KeyButton keyName="s" />
      </div>
      <div className="col-start-3 row-start-2">
        <KeyButton keyName="d" />
      </div>
    </div>
  );
};

export default KeyPad;