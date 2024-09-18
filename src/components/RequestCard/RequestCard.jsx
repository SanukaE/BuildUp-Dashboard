import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Check, X } from 'lucide-react';

function RequestCard({
  firstName,
  lastName,
  email,
  phoneNo,
  address,
  designID,
  requestID,
  onRequestHandled,
}) {
  const [status, setStatus] = useState('pending');
  const [isVisible, setIsVisible] = useState(true);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const memeImages = [
      '/memeOne.gif',
      '/memeTwo.gif',
      '/memeThree.gif',
      '/memeFour.gif',
      '/memeFive.gif',
    ];
    const isMeme = Math.floor(Math.random() * 2);

    let newImageURL;
    if (isMeme) {
      newImageURL = memeImages[Math.floor(Math.random() * 5)];
    } else {
      switch (designID) {
        case '#1':
          newImageURL = '/designOne.jpg';
          break;
        case '#2':
          newImageURL = '/designTwo.jpg';
          break;
        case '#3':
          newImageURL = '/designThree.jpg';
          break;
        default:
          newImageURL = '/defaultDesign.jpg';
      }
    }
    setImageURL(newImageURL);
  }, [designID]);

  const handleRequest = async (action) => {
    setStatus('loading');
    try {
      const response = await fetch(
        `https://buildup-backend.onrender.com/requests/${action}/${requestID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [action === 'accept' ? 'isAccepted' : 'isDeclined']: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `The response was not ok with a status of ${response.status}`
        );
      }

      setStatus(action === 'accept' ? 'accepted' : 'declined');
      setTimeout(() => {
        setIsVisible(false);
        onRequestHandled && onRequestHandled(requestID);
      }, 1000);
    } catch (error) {
      console.error(`Error ${action}ing request:`, error.message);
      setStatus('error');
      setTimeout(() => setStatus('pending'), 3000);
    }
  };

  const cardVariants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          initial="visible"
          animate="visible"
          exit="hidden"
          variants={cardVariants}
        >
          <div className="relative">
            <img
              src={imageURL}
              alt={designID}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white text-xl font-bold">{`${firstName} ${lastName}`}</h3>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Mail className="text-blue-500" size={18} />
              <p className="text-gray-600">{email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-blue-500" size={18} />
              <p className="text-gray-600">{phoneNo}</p>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-500" size={18} />
              <p className="text-gray-600">{address}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex justify-between">
            <button
              onClick={() => handleRequest('accept')}
              disabled={status !== 'pending'}
              className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-medium transition-colors duration-300 ${
                status === 'pending'
                  ? 'bg-green-500 hover:bg-green-600'
                  : status === 'accepted'
                  ? 'bg-green-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {status === 'accepted' ? (
                <>
                  <Check size={18} className="mr-2" />
                  Accepted
                </>
              ) : (
                'Accept Request'
              )}
            </button>
            <button
              onClick={() => handleRequest('decline')}
              disabled={status !== 'pending'}
              className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-medium transition-colors duration-300 ${
                status === 'pending'
                  ? 'bg-red-500 hover:bg-red-600'
                  : status === 'declined'
                  ? 'bg-red-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {status === 'declined' ? (
                <>
                  <X size={18} className="mr-2" />
                  Declined
                </>
              ) : (
                'Decline Request'
              )}
            </button>
          </div>
          {status === 'loading' && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RequestCard;
