import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header/Header.jsx';
import RegisterStaffForm from '../../components/RegisterStaffForm/RegisterStaffForm.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function RegisterStaff() {
  const location = useLocation();
  const staff = location.state && location.state.loggedInStaff;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-200">
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header firstName={(staff && staff.firstName) || null} />
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div
          className={`w-full max-w-md transition-all duration-500 ease-in-out delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <RegisterStaffForm />
        </div>
      </main>

      <div
        className={`transition-opacity duration-500 ease-in-out delay-600 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}

export default RegisterStaff;
