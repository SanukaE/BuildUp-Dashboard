import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Mail, Lock, Shield } from 'lucide-react';

function ProfileCard() {
  const location = useLocation();
  const [staff, setStaff] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
    }
  }, [location]);

  return (
    <div
      className={`max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={
              (staff && staff.avatarURL) ||
              'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png'
            }
            alt="Staff Avatar"
            className="w-full h-full object-cover rounded-full border-4 border-blue-500"
          />
          {staff && staff.isAdmin && (
            <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-2">
              <Shield size={20} className="text-white" />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-blue-800">
          {(staff && `${staff.firstName} ${staff.lastName}`) || 'Loading...'}
        </h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          Login Credentials
        </h3>

        <div
          className={`flex items-center space-x-2 transition-all duration-500 ease-in-out delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Mail className="text-gray-400" size={20} />
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{' '}
            {(staff && staff.email) || 'Loading...'}
          </p>
        </div>

        <div
          className={`flex items-center space-x-2 transition-all duration-500 ease-in-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Lock className="text-gray-400" size={20} />
          <p className="text-gray-700">
            <span className="font-medium">Password:</span>{' '}
            {(staff && staff.password) || 'Loading...'}
          </p>
        </div>

        <div
          className={`flex items-center space-x-2 transition-all duration-500 ease-in-out delay-450 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <User className="text-gray-400" size={20} />
          <p className="text-gray-700">
            <span className="font-medium">Account Type:</span>{' '}
            {staff && staff.isAdmin ? 'Administrator' : 'Member'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
