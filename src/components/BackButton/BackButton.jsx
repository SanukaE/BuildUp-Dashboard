import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const staff = location.state && location.state.loggedInStaff;

  const handleClick = () => {
    navigate('/', { replace: true, state: { loggedInStaff: staff } });
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Go Back</span>
    </button>
  );
}

export default BackButton;
