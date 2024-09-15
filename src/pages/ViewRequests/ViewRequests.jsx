import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import Header from '../../components/Header/Header.jsx';
import RequestCard from '../../components/RequestCard/RequestCard.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import BackButton from '../../components/BackButton/BackButton.jsx';

function ViewRequests() {
  const [staff, setStaff] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
      getRequests();
    } else {
      navigate('/login', { replace: true });
    }
  }, [location.state, navigate]);

  const getRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://buildup-backend.onrender.com/requests/'
      );

      if (!response.ok)
        throw new Error(`The response was not ok with code ${response.status}`);

      const data = await response.json();
      setRequests(data.filter((req) => !req.isAccepted && !req.isDeclined));
    } catch (error) {
      console.error('Error fetching requests:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestHandled = (requestID) => {
    setRequests((prevRequests) =>
      prevRequests.filter((req) => req._id !== requestID)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header firstName={(staff && staff.firstName) || null} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Pending Requests
          </h2>
          <p className="text-gray-600">
            All requests that haven't been accepted/declined appear here.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {requests.map((request) => (
                <motion.div key={request._id} variants={itemVariants}>
                  <RequestCard
                    firstName={request.firstName}
                    lastName={request.lastName}
                    email={request.email}
                    phoneNo={request.phoneNo}
                    requestID={request._id}
                    address={request.address}
                    designID={request.designID}
                    onRequestHandled={handleRequestHandled}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && requests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-500 mt-12"
          >
            <p className="text-xl">No pending requests at the moment.</p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ViewRequests;
