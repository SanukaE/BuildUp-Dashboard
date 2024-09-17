import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Send } from 'lucide-react';

import Header from '../../components/Header/Header.jsx';
import BackButton from '../../components/BackButton/BackButton.jsx';
import DroneDashboard from '../../components/DroneDashboard/DroneDashboard.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const SendDrone = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [isConnectDisabled, setIsConnectDisabled] = useState(true);
  const [connectBtnText, setConnectBtnText] = useState('Connect to drone');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
    } else {
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  const handleConnect = () => {
    setConnectBtnText('Connecting...');
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1500);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsConnectDisabled(value !== staff?.password);
  };

  const passwordField = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Connect to Drone</h2>
      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
        <motion.span
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isConnectDisabled ? <Lock className="text-gray-400" /> : <Unlock className="text-green-500" />}
        </motion.span>
      </div>
      <motion.button
        onClick={handleConnect}
        disabled={isConnectDisabled}
        className={`mt-4 w-full p-2 rounded-md text-white font-semibold transition-colors duration-300 flex items-center justify-center ${
          isConnectDisabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        whileHover={{ scale: isConnectDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isConnectDisabled ? 1 : 0.95 }}
      >
        <Send className="mr-2" size={18} />
        {connectBtnText}
      </motion.button>
    </motion.div>
  );

  const droneControls = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Drone Cam</h3>
      <div className="aspect-w-16 aspect-h-9 mb-8" style={{ height: '70vh' }}>
        <iframe
          src="https://fpvsim.com/sim"
          className="w-full h-full rounded-lg shadow-lg"
          title="Drone Camera Simulator"
        />
      </div>
      <DroneDashboard />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header firstName={(staff && staff.firstName) || null} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <BackButton />
          <h2 className="text-3xl font-bold text-gray-800">Drone Dashboard</h2>
        </div>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Here you can send a drone to a location from an accepted request.
        </p>
        <AnimatePresence mode="wait">
          {!isLoggedIn ? passwordField : droneControls}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default SendDrone;