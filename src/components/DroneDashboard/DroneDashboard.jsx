import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, User, Mail, Phone, Image } from 'lucide-react';
import KeyPad from '../KeyPad/KeyPad.jsx';
import UpDownPad from '../UpDownPad/UpDownPad.jsx';
import RotatePad from '../RotatePad/RotatePad.jsx';

const DroneDashboard = () => {
  const [speed, setSpeed] = useState(0);
  const [attitude, setAttitude] = useState(0);
  const [direction, setDirection] = useState('STILL');
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [displayDashboard, setDisplayDashboard] = useState(false);

  useEffect(() => {
    getAcceptedRequests();

    // Prevent space key from scrolling
    const preventSpaceScroll = (e) => {
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventSpaceScroll);

    return () => {
      window.removeEventListener('keydown', preventSpaceScroll);
    };
  }, []);

  const getAcceptedRequests = async () => {
    try {
      const response = await fetch(
        'https://buildup-backend.onrender.com/requests'
      );

      if (!response.ok)
        throw new Error(`The response was not ok with code ${response.status}`);

      const data = await response.json();
      const acceptedRequests = data.filter((request) => request.isAccepted);
      setRequests(acceptedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error.message);
    }
  };

  const handleStats = useCallback((key) => {
    switch (key) {
      case 'w':
        setSpeed((prevSpeed) => Math.min(prevSpeed + 1, 100));
        break;
      case 's':
        setSpeed((prevSpeed) => Math.max(prevSpeed - 1, 0));
        break;
      case 'ARROW_UP':
        setAttitude((prevAttitude) => prevAttitude + 10);
        break;
      case 'ARROW_DOWN':
        setAttitude((prevAttitude) => Math.max(prevAttitude - 10, 0));
        break;
      case 'a':
      case 'LEFT_ARROW':
        setDirection('LEFT');
        break;
      case 'd':
      case 'RIGHT_ARROW':
        setDirection('RIGHT');
        break;
      case ' ':
        // Handle space key press (e.g., emergency stop)
        setSpeed(0);
        setDirection('STILL');
        break;
      default:
        setDirection('STILL');
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleStats(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleStats]);

  const handleDestinationChange = (e) => {
    const selectedId = e.target.value;
    const selected = requests.find((request) => request._id === selectedId);
    setSelectedRequest(selected);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setDisplayDashboard(true);
  };

  const DestinationForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Select Destination
      </h2>
      <form onSubmit={handleConfirm} className="space-y-4">
        <div className="relative">
          <select
            onChange={handleDestinationChange}
            className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an address</option>
            {requests.map((request) => (
              <option key={request._id} value={request._id}>
                {request.address}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <User className="text-blue-500" />
              <input
                type="text"
                value={`${selectedRequest.firstName} ${selectedRequest.lastName}`}
                readOnly
                className="w-full p-2 bg-gray-100 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-blue-500" />
              <input
                type="email"
                value={selectedRequest.email}
                readOnly
                className="w-full p-2 bg-gray-100 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-blue-500" />
              <input
                type="tel"
                value={selectedRequest.phoneNo}
                readOnly
                className="w-full p-2 bg-gray-100 rounded-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Image className="text-blue-500" />
              <input
                type="text"
                value={selectedRequest.designID}
                readOnly
                className="w-full p-2 bg-gray-100 rounded-md"
              />
            </div>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={!selectedRequest}
          className={`w-full p-2 rounded-md text-white font-semibold transition-colors duration-300 ${
            selectedRequest
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </form>
    </motion.div>
  );

  const Dashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Drone Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Speed" value={`${speed} m/s`} />
        <StatCard title="Altitude" value={`${attitude} ft`} />
        <StatCard title="Direction" value={direction} />
        <StatCard title="Destination" value={selectedRequest.address} />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <KeyPad onKeyPress={handleStats} />
        <UpDownPad onKeyPress={handleStats} />
        <RotatePad onKeyPress={handleStats} />
      </div>
    </motion.div>
  );

  const StatCard = ({ title, value }) => (
    <div className="bg-gray-100 p-3 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {displayDashboard ? (
          <Dashboard key="dashboard" />
        ) : (
          <DestinationForm key="form" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DroneDashboard;
