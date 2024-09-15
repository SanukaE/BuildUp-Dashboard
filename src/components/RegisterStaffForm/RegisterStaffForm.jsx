import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BackButton from '../BackButton/BackButton.jsx';

function RegisterStaffForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const staff = location.state && location.state.loggedInStaff;
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newStaff, setNewStaff] = useState();
  const [submitText, setSubmitText] = useState('Register');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (staff && staff.isAdmin) setIsAdmin(true);
    else navigate('/login', { replace: true });
  }, [location, navigate]);

  useEffect(() => {
    if (newStaff) registerStaff(newStaff);
  }, [newStaff]);

  const handleLogin = () => navigate('/login', { replace: true });

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitText('Registering...');
    setIsSubmitDisabled(true);

    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    if (data.isAdmin) data.isAdmin = true;

    setNewStaff(data);
  };

  const registerStaff = async (staffData) => {
    try {
      const response = await fetch(
        'https://buildup-backend.onrender.com/staff/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(staffData),
        }
      );

      if (!response.ok)
        throw new Error(`Response was not ok with stats: ${response.status}`);

      setSubmitText('Staff Registered!');

      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('isAdmin').checked = false;
    } catch (error) {
      console.error('Error sending new staff data:', error.message);

      setSubmitText('Failed!');
    } finally {
      setTimeout(() => {
        setSubmitText('Register');
        setIsSubmitDisabled(false);
      }, 3000);
    }
  };

  return !isAdmin ? (
    <div
      className={`max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <BackButton />
      <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
        Access Denied
      </h2>
      <p className="text-yellow-600 mb-6 text-center">
        You do not have permission to access this page. Please login with your
        staff account which has admin access.
      </p>
      <div
        className={`transition-all duration-500 ease-in-out delay-450 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={() => handleLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Login
        </button>
      </div>
    </div>
  ) : (
    <div
      className={`max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="mb-6">
        <BackButton />
      </div>
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Register Staff
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        When entering new staff info, please double check the entered email for
        any typos.
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
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-450 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <input type="checkbox" id="isAdmin" name="isAdmin" className="mr-2" />
          <label htmlFor="isAdmin" className="text-gray-700">
            Is Admin?
          </label>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out delay-450 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
            disabled={isSubmitDisabled}
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterStaffForm;
