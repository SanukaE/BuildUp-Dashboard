import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './StaffList.css';

function StaffList({ staffData }) {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStaffAdmin, setIsStaffAdmin] = useState(
    staffData && staffData.isAdmin
  );

  const loadingContainer = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-16 h-16 bg-blue-200 rounded-full animate-pulse"></div>
      <p className="text-blue-200 animate-pulse">Loading...</p>
    </div>
  );

  useEffect(() => {
    if (staffData && staffData.isAdmin) setIsStaffAdmin(true);
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://buildup-backend.onrender.com/staff'
        );

        if (response.ok) {
          const data = await response.json();
          setStaffList(data);
        } else throw new Error('The response was not ok.');
      } catch (error) {
        console.error('Error fetching staff list:', error.message);
        setStaffList(
          <p className="text-red-500">An error occurred while fetching data.</p>
        );
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-white text-center py-4 bg-blue-700">
        Staff Team
      </h2>

      <div className="p-4 space-y-4">
        {isLoading
          ? loadingContainer
          : staffList.map((staff) => (
              <div
                key={staff._id}
                className="flex items-center space-x-4 bg-blue-500 bg-opacity-30 p-3 rounded-lg transition duration-300 ease-in-out hover:bg-blue-400 hover:bg-opacity-40"
              >
                <img
                  src={staff.avatarURL}
                  alt={`${staff.firstName}'s avatar`}
                  className="w-12 h-12 rounded-full border-2 border-blue-300"
                />
                <p className="text-lg font-medium text-white">
                  {staff.firstName}
                </p>
              </div>
            ))}
      </div>

      {isStaffAdmin ? (
        <div className="p-4 bg-blue-700">
          <button
            onClick={() =>
              navigate('/register-staff', {
                replace: true,
                state: { loggedInStaff: staffData },
              })
            }
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register Staff
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default StaffList;
