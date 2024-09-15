import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Image } from 'lucide-react';
import BackButton from '../BackButton/BackButton.jsx';

function ProfileDetailsForm() {
  const [staff, setStaff] = useState(null);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);
  const [submitText, setSubmitText] = useState('Loading...');
  const [changesMade, setChangesMade] = useState(false);
  const [staffID, setStaffID] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
      setStaffID(location.state.loggedInStaff._id);
      setIsFieldsDisabled(false);
      setSubmitText('Save Changes');
    } else {
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (changesMade) {
      handleSaving();
    }
  }, [staff]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFieldsDisabled(true);
    setSubmitText('Saving...');
    setChangesMade(true);
    const formData = new FormData(event.target);
    setStaff(Object.fromEntries(formData.entries()));
  };

  const handleSaving = async () => {
    try {
      const response = await fetch(
        `https://buildup-backend.onrender.com/staff/${staffID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(staff),
        }
      );

      if (!response.ok) {
        setSubmitText('Failed Updating');
        throw new Error('The response was not ok');
      }

      setSubmitText('Changes Saved!');
    } catch (error) {
      console.error('Error updating staff:', error.message);
    } finally {
      setTimeout(() => {
        setSubmitText('Save Changes');
        setIsFieldsDisabled(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="mb-6">
        <BackButton />
      </div>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Profile Info
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Update your profile information below.
      </p>

      <form onSubmit={(event) => handleSubmit(event)} className="space-y-6">
        <div
          className={`transition-all duration-500 ease-in-out delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name:
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={(staff && staff.firstName) || ''}
              onChange={(e) =>
                setStaff({ ...staff, firstName: e.target.value })
              }
              placeholder="Enter first name"
              disabled={isFieldsDisabled}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name:
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={(staff && staff.lastName) || ''}
              onChange={(e) => setStaff({ ...staff, lastName: e.target.value })}
              placeholder="Enter last name"
              disabled={isFieldsDisabled}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-450 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="emailField"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="emailField"
              name="email"
              type="email"
              value={(staff && staff.email) || ''}
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
              placeholder="Enter email"
              disabled={isFieldsDisabled}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="passwordField"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="passwordField"
              name="password"
              type="password"
              value={(staff && staff.password) || ''}
              onChange={(e) => setStaff({ ...staff, password: e.target.value })}
              placeholder="Enter password"
              disabled={isFieldsDisabled}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-750 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="avatarURL"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Avatar URL:
          </label>
          <div className="relative">
            <Image
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              id="avatarURL"
              name="avatarURL"
              type="text"
              value={(staff && staff.avatarURL) || ''}
              onChange={(e) =>
                setStaff({ ...staff, avatarURL: e.target.value })
              }
              placeholder="Enter avatar URL"
              disabled={isFieldsDisabled}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-900 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="submit"
            disabled={isFieldsDisabled}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileDetailsForm;
