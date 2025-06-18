import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
 const mobile = Cookies.get('mobile');
  const [userData, setUserData] = useState({  
name: '',
  mobile: '',
  address: '',
  age: '',
  gender: '',
  dob: '',
  aadhar: '' });
  const navigate = useNavigate();
useEffect(() => {
    if (mobile) {
      fetch(`https://api.example.com/user?mobile=${mobile}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData({ name: data.name, mobile: data.mobile });
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setUserData({ name: "N/A", mobile: mobile });
        });
    }
  }, [mobile]);
  const handleLogout=()=>{
    navigate('/');
  }
  return (
    <header>
          <nav className="bg-green-800 text-white p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Schemes</h2>
     
       
         <Dialog>
      <form>
        <DialogTrigger asChild>
          <FaRegUserCircle className='w-12 text-2xl' />
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl ">
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
    {userData.name || "Rushikesh Nikam"}
  </div>
</div>

<div className="grid gap-3">
  <Label>Mobile</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.mobile || "7387087643"}
  </div>
</div>

<div className="grid gap-3">
  <Label>Address</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.address || "Pune, Maharashtra"}
  </div>
</div>

<div className="grid gap-3">
  <Label>Age</Label>
  <div className="px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.age || "23"}
  </div>
</div>

<div className="grid gap-3">
  <Label>Gender</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.gender || "Male"}
  </div>
</div>

<div className="grid gap-3">
  <Label>Date of Birth</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.dob || "2001-10-27"}
  </div>
</div>

<div className="grid gap-3">
  <Label>Aadhar Number</Label>
  <div className=" px-3 py-2 rounded-md text-sm text-gray-700">
    {userData.aadhar || "1234-5678-9012"}
  </div>
</div>

</div>

          <DialogFooter>
           
            <Button type="submit" className={'cursor-pointer'} onClick={handleLogout} >Logout</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
      
          </nav>
    </header>
  
  );
};






export default Navbar;
