import React from 'react'
import { useSidebar } from '../ui/sidebar';
import { IoMdClose } from 'react-icons/io';
import { PanelLeftIcon } from 'lucide-react';

const Colse = () => {
     const { isOpen, toggleSidebar } = useSidebar();
  return (
    <div> <button onClick={toggleSidebar} className="text-xl">
          {!isOpen &&  <IoMdClose /> }
        </button></div>
  )
}

export default Colse