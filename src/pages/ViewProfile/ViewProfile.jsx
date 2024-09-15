import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from '../../components/Header/Header.jsx';
import ProfileDetailsForm from '../../components/ProfileDetailsForm/ProfileDetailsForm.jsx';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function ViewProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
      setTimeout(() => setIsLoading(false), 1000); // Simulating load time
    } else {
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header firstName={null} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Header firstName={(staff && staff.firstName) || null} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ProfileCard />
          </motion.div>
          <motion.div
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ProfileDetailsForm />
          </motion.div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default ViewProfile;
