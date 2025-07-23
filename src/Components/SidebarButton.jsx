import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";

const SidebarButton = () => {
  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <button 
        className='w-10 aspect-square bg-slate-500 rounded-md flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-150'
        onClick={() => {/* Menü açma fonksiyonu */}}
      >
        <AiOutlineMenu className='w-6 h-6 text-white' />
      </button>

      {/* Opsiyonel: Hafif parlama efekti */}
      <div className='absolute inset-0 bg-gray-900/20 rounded-full blur-xl -z-10 scale-75' />
    </div>
  )
}

export default SidebarButton