import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Dashboard from '../../pages/Home.jsx';
import Header from '../Header/Header.jsx';

const StaffContext = createContext();

function LoginForm() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [staff, setStaff] = useState({ firstName: 'N/A' });
  const [loginMessage, setLoginMessage] = useState('Please wait...');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [staffFound, setStaffFound] = useState(false);

  // Simulate a short delay before showing the form
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function setStaffData() {
      try {
        const response = await fetch(
          'https://buildup-backend.onrender.com/staff'
        );
        const data = await response.json();

        setStaffList(data);

        setSubmitDisabled(false);
        setLoginMessage('Login');
      } catch (error) {
        console.error('Error fetching staff:', error.message);
      }
    }

    setStaffData();

    return () => {
      if (staffList.length) setStaffList([]);
    };
  }, []);

  useEffect(() => {
    if (staffFound) {
      setLoginMessage(`Hello ${staff.firstName}`);

      setTimeout(() => {
        console.log('redirecting...');
        navigate(-1);
        console.log('redirected');
        return (
          <StaffContext.Provider value={staff}>
            <Header />
            <Dashboard />
          </StaffContext.Provider>
        );
      }, 3000);
    } else if (document.getElementById('emailField').value) {
      setLoginMessage('Invalid login credentials');
      setTimeout(() => {
        setLoginMessage('Login');
        setSubmitDisabled(false);
      }, 3000);
    }
  }, [staffFound]);

  const checkStaff = (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    setLoginMessage('Checking...');

    for (const staffData of staffList) {
      if (
        staffData.email.toLowerCase() ===
          document.getElementById('emailField').value.toLowerCase() &&
        staffData.password === document.getElementById('passwordField').value
      ) {
        setStaff(staffData);
        setStaffFound(true);

        return;
      }
    }

    setStaffFound(false);
  };

  return (
    <div
      className={`max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Login Required
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Enter your login credentials that were sent by email during
        registration.
      </p>
      <form className="space-y-6" onSubmit={(event) => checkStaff(event)}>
        <div
          className={`transition-all duration-500 ease-in-out delay-150 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="emailField"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="emailField"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div
          className={`transition-all duration-500 ease-in-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <label
            htmlFor="passwordField"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="passwordField"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div
          className={`transition-all duration-500 ease-in-out delay-450 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            type="submit"
            id="submitBtn"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
            disabled={submitDisabled}
          >
            {loginMessage}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
