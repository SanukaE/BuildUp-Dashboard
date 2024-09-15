import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login/Login.jsx';
import RegisterStaff from './pages/RegisterStaff/RegisterStaff.jsx';
import ViewProfile from './pages/ViewProfile/ViewProfile.jsx';
import ViewRequests from './pages/ViewRequests/ViewRequests.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-staff" element={<RegisterStaff />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/requests" element={<ViewRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
