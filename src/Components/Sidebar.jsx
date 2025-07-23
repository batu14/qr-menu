import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className='sticky bottom-10 right-10 flex items-center justify-center'>
        <AiOutlineMenu className='w-6 h-6 bg-white rounded-full p-1 text-gray-500 shadow-lg' />
    </div>
  )
}

export default Sidebar