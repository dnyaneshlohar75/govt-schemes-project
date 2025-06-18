import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar';

const Layout = () => {
     const location = useLocation();
  const hideNavbar = location.pathname === "/"; 
  return (
    <div>
        {!hideNavbar && <Navbar />}
        <Outlet/>
    </div>
  )
}

export default Layout