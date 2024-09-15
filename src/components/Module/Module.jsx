import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Module.css';

function Module({ imageURL, name }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    if (location.state && location.state.loggedInStaff) {
      setStaff(location.state.loggedInStaff);
    }
  }, []);

  const handleModuleClick = (moduleName) => {
    switch (moduleName) {
      case 'My Profile':
        navigate('/profile', {
          replace: true,
          state: { loggedInStaff: staff },
        });
        break;
      case 'View Requests':
        navigate('/requests', {
          replace: true,
          state: { loggedInStaff: staff },
        });
        break;
      case 'Send Drone':
        navigate('/control-drone', {
          replace: true,
          state: { loggedInStaff: staff },
        });
        break;
      case 'Control Printer':
        navigate('/control-printer', {
          replace: true,
          state: { loggedInStaff: staff },
        });
        break;
      case 'Answered Requests':
        navigate('/answered-requests', {
          replace: true,
          state: { loggedInStaff: staff },
        });
        break;
    }
  };

  return (
    <button
      onClick={() => handleModuleClick(name)}
      className="group flex flex-col items-center p-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
    >
      <div className="w-16 h-16 mb-2 rounded-full bg-white p-2 overflow-hidden group-hover:bg-blue-100 transition-colors duration-300">
        <img
          src={imageURL}
          alt={name}
          className="w-fit h-fit rounded-full object-cover"
        />
      </div>
      <p className="text-white font-medium text-sm group-hover:text-blue-100 transition-colors duration-300">
        {name}
      </p>
    </button>
  );
}

export default Module;
