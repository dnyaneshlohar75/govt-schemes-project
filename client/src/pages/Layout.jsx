import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MainNavbar from '../components/customUI/MainNavbar';
import Navbar from '@/components/customUI/Navbar';
import MitraBot from './MitraBot';
import ChatBase from './ChatBase';

const Layout = () => {
     const location = useLocation();
  const hideNavbar = location.pathname === "/"; 
  return (
    <div>
        {!hideNavbar ? <MainNavbar />:<Navbar/>}  
       {/* {!hideNavbar &&<MitraBot/> }  */}
       {!hideNavbar &&<ChatBase/> }   {/* chatbase */}
        <Outlet/>
    </div>
  )
}

export default Layout