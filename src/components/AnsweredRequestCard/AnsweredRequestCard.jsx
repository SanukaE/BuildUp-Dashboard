import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Trash2 } from 'lucide-react';

function AnsweredRequestCard({
  firstName,
  lastName,
  email,
  phoneNo,
  address,
  designID,
  requestID,
  onRequestHandled,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
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

  const deleteRequest = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `https://buildup-backend.onrender.com/requests/${requestID}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok)
        throw new Error(`The response was not ok with code ${response.status}`);

      setIsVisible(false);
      setTimeout(() => onRequestHandled(requestID), 500);
    } catch (error) {
      console.error('Error deleting request:', error.message);
      setIsDeleting(false);
    }
  };

  const cardVariants = {
    visible: { opacity: 1, scale: 1, y: 0 },
    hidden: { opacity: 0, scale: 0.8, y: 50 },
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
          <div className="p-4 bg-gray-50">
            <motion.button
              onClick={deleteRequest}
              disabled={isDeleting}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-white font-medium transition-colors duration-300 ${
                isDeleting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={18} className="mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete Request'}
            </motion.button>
          </div>
          {isDeleting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnsweredRequestCard;