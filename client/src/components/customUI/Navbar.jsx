import React from 'react'
import { Toggle } from '../Toogle';
const Navbar = () => { 
  return (
    <header >
          <nav className="bg-white dark:bg-[#24262b]  p-4 flex  items-center  w-full gap-10">
     <div className='flex justify-between items-center w-full'>
 <h2 className="  text-2xl lg:text-3xl text-orange-900 font-semibold dark:text-gray-50">GovSchemes</h2>  
       
     </div>
      <Toggle/>
     
          </nav>  
    </header>
  
  );
};



export default Navbar;
