import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
