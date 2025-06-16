import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// import Login from './Pages/Login';
// import UserPage from './Pages/UserPage';
// import MainNavbar from './components/MainNavbar';
// import SchemaPage from './Pages/SchemaPage';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {/* {isLoggedIn && <MainNavbar/>} Show navbar only when logged in */}

      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* <Route path="/user" element={<UserPage />} />
        <Route path="/scheme" element={<SchemaPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
