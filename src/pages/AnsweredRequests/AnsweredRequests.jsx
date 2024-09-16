import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import BackButton from '../../components/BackButton/BackButton.jsx';
import AnsweredRequestCard from '../../components/AnsweredRequestCard/AnsweredRequestCard.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Loader } from 'lucide-react';

const AnsweredRequests = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAccepted, setShowAccepted] = useState(true);

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
      getAllRequests();
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  const getAllRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://buildup-backend.onrender.com/requests/'
      );

      if (!response.ok)
        throw new Error(`The response was not ok with code ${response.status}`);

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching all requests:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestHandled = (requestID) => {
    setRequests((prevRequests) =>
      prevRequests.filter((prevRequest) => prevRequest._id !== requestID)
    );
  };

  const filteredRequests = requests.filter(
    (request) => request.isAccepted === showAccepted
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header firstName={(staff && staff.firstName) || null} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Answered Requests
          </h2>
          <p className="text-gray-600 mb-4">
            Here you can view all the requests that have been accepted/declined.
          </p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-700 font-medium">
              {showAccepted
                ? 'Showing Accepted Requests'
                : 'Showing Declined Requests'}
            </span>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showAccepted}
                  onChange={() => setShowAccepted(!showAccepted)}
                />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div
                  className={`absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                    showAccepted ? 'transform translate-x-full bg-blue-500' : ''
                  }`}
                ></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                {showAccepted ? 'Accepted' : 'Declined'}
              </div>
            </label>
          </div>
        </motion.div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRequests.map((request) => (
              <AnsweredRequestCard
                key={request._id}
                isAcceptedCategory={true}
                firstName={request.firstName}
                lastName={request.lastName}
                email={request.email}
                phoneNo={request.phoneNo}
                address={request.address}
                designID={request.designID}
                requestID={request._id}
                onRequestHandled={handleRequestHandled}
              />
            ))}
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AnsweredRequests;
