import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../components/Header/Header.jsx';
import StaffList from '../components/StaffList/StaffList.jsx';
import Module from '../components/Module/Module.jsx';
import Footer from '../components/Footer/Footer.jsx';

function Home() {
  document.title = 'BuildUp Dashboard';

  const navigate = useNavigate();
  const location = useLocation();
  const [staff, setStaff] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Check if staff data is in location state
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
      setIsAdmin(location.state.loggedInStaff.isAdmin);
    } else {
      // If no staff data, redirect to login
      navigate('/login');
    }
  }, [location, navigate]);

  const regularModules = [
    {
      name: 'My Profile',
      imageURL:
        (staff && staff.avatarURL) ||
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
    },
    { name: 'View Requests', imageURL: '/images/tasks.png' },
    { name: 'Send Drone', imageURL: '/images/messages.png' },
    { name: 'Control Printer', imageURL: '/images/calendar.png' },
  ];

  const adminModules = [
    { name: 'Answered Requests', imageURL: '/images/analytics.png' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 transition-opacity duration-1000 ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Header firstName={(staff && staff.firstName) || null} />

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
                    <Module imageURL={module.imageURL} name={module.name} />
                  </div>
                ))}
              </div>
            </section>

            {isAdmin && (
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
              isLoaded
                ? 'translate-x-0 opacity-100'
                : 'translate-x-10 opacity-0'
            }`}
          >
            <StaffList staffData={staff} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
