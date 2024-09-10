import { useState, useEffect } from 'react';

import Header from './components/Header/Header.jsx';
import StaffList from './components/StaffList/StaffList.jsx';
import Module from './components/Module/Module.jsx';
import Footer from './components/Footer/Footer.jsx';

function Dashboard() {
  const [staff, setStaff] = useState({ firstName: 'User', isAdmin: false });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('Please wait...');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [staffList, setStaffList] = useState([]);

  const regularModules = [
    {
      name: 'My Profile',
      imageURL:
        (staff && staff.avatarURL) ||
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
    },
    { name: 'My Tasks', imageURL: '/images/tacks.png' },
    { name: 'View Requests', imageURL: '/images/tasks.png' },
    { name: 'Send Drone', imageURL: '/images/messages.png' },
    { name: 'Control Printer', imageURL: '/images/calendar.png' },
  ];

  const adminModules = [
    { name: 'Staff Management', imageURL: '/images/users.png' },
    { name: 'Manage Task', imageURL: '/images/profile.png' },
    { name: 'Accepted Requests', imageURL: '/images/analytics.png' },
    { name: 'Servers', imageURL: '/images/settings.png' },
  ];

  useEffect(() => {
    setIsLoaded(true);

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

  const handleModuleClick = (moduleName) => {
    switch (moduleName) {
      case 'My Profile':
        return <Redirect to="/profile" />;
      case 'My Tasks':
        return <Redirect to="/task" />;
      case 'View Requests':
        return <Redirect to="/requests" />;
      case 'Send Drone':
        return <Redirect to="/send-drone" />;
      case 'Control Printer':
        return <Redirect to="/control-printer" />;
      case 'Staff Management':
        return <Redirect to="/staff-management" />;
      case 'Manage Task':
        return <Redirect to="/manage-task" />;
      case 'Accepted Requests':
        return <Redirect to="/accepted-requests" />;
      case 'Servers':
        return <Redirect to="/servers" />;
    }
  };

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
        setIsUserLoggedIn(true);
        break;
      }
    }
  };

  const homePage = (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <section
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-500 ease-in-out ${
              isLoaded
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Modules
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {regularModules.map((module, index) => (
                <div
                  key={module.name}
                  className={`transition-all duration-500 ease-in-out delay-${
                    index * 100
                  } ${
                    isLoaded
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <Module
                    imageURL={module.imageURL}
                    name={module.name}
                    onClick={() => handleModuleClick(module.name)}
                  />
                </div>
              ))}
            </div>
          </section>

          {staff.isAdmin && (
            <section
              className={`bg-blue-50 rounded-lg shadow-md p-6 transition-all duration-500 ease-in-out delay-500 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                Admin Modules
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {adminModules.map((module, index) => (
                  <div
                    key={module.name}
                    className={`transition-all duration-500 ease-in-out delay-${
                      (index + 5) * 100
                    } ${
                      isLoaded
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    }`}
                  >
                    <Module
                      imageURL={module.imageURL}
                      name={module.name}
                      onClick={() => handleModuleClick(module.name)}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div
          className={`lg:col-span-1 transition-all duration-500 ease-in-out delay-800 ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
        >
          <StaffList isAdmin={staff.isAdmin} />
        </div>
      </div>
    </main>
  );

  const loginPage = (
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

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 transition-opacity duration-1000 ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Header firstName={staff.firstName} />

      {isUserLoggedIn ? homePage : loginPage}

      <Footer />
    </div>
  );
}

export default Dashboard;
