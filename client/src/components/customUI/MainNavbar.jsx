import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie";
// import useOtpStore from "../store/useotpStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom';
import useOtpStore from '@/store/useotpStore';
import { Toggle } from '@/components/Toogle';
const MainNavbar = () => {
 const token = Cookies.get('token');
  // const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate();



const [userData, setUserData] = useState({
  userId: "",
  name: "",
  email: "",
  uidaiNumber: "",
  mobileNumber: "",
  documents: []
});

useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Use static ID or get it from localStorage if available
         const userId = localStorage.getItem("userId") || "610f4faf-511a-4333-9624-b0c5a7d49dc0";
      const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
     if (!userId || !token) {
        console.warn("Missing user ID or token");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      console.log("User Data:", data);

      setUserData(data.user);

    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  fetchUserData();
}, []);


  const handleLogout=()=>{
    Cookies.remove('token');
   localStorage.removeItem("userId");  
  const { resetOtpState } = useOtpStore.getState();
  resetOtpState();
    navigate('/');
  }
  return (
    <header >
          <nav className="bg-[#f5f6fb] dark:bg-[#24262b]  p-4 flex  items-center  w-full gap-10">
     <div className='flex justify-between items-center w-full'>
 <h2 className="text-2xl font-semibold text-green-900 dark:text-gray-50">GovSchemes</h2>  
       
         <Dialog>
      <form className='flex justify-end'>
        <DialogTrigger asChild>
          <FaRegUserCircle size={20}/>
        </DialogTrigger>
        <DialogContent className={'dark:bg-[#1c2029]'}>
          <DialogHeader>
            <DialogTitle>User profile</DialogTitle>
            <DialogDescription> 
         View your registered information.
            </DialogDescription>
          </DialogHeader>
<div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4">
 <div className="grid gap-3">
  <Label>Name</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
 {userData.name}
  </div>
</div>

<div className="grid gap-3">
  <Label>Mobile</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.mobileNumber}
  </div>
</div>

<div className="grid gap-3">
  <Label>email</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
   {userData.email}
  </div>
</div>

<div className="grid gap-3">
   <Label>Aadhar Number</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.uidaiNumber}
  </div>

</div>


</div>

          <DialogFooter>
           
            <Button type="submit" className={'cursor-pointer bg-transparent  text-orange-900  outline-green-900 border hover:bg-green-700 hover:text-gray-200 border-green-900'} onClick={handleLogout} >Logout</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
     </div>
      <Toggle/>
     
          </nav>  
    </header>
  
  );
};



export default MainNavbar;
