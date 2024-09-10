import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
