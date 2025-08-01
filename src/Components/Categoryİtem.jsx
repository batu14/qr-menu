import React from 'react'

const Categoryİtem = ({ image, title, isActive, onClick }) => {

  return (
    <div 
      onClick={() => onClick(title)}
      className={`w-full cursor-pointer p-2 transition-all duration-300 relative group`}
    >
      <div className={`absolute inset-x-2 inset-y-1 rounded-xl transition-all duration-300 
        bg-white border shadow-sm
        ${isActive 
          ? 'border-gray-900 shadow-md' 
          : 'border-gray-100 hover:border-gray-200 hover:shadow'
        }`} 
      />
      
      <div className="relative flex flex-col items-center p-1.5">
        <div className={`w-20 aspect-square rounded-xl overflow-hidden transition-transform duration-300 
          ${isActive ? 'ring-1 ring-gray-900' : 'group-hover:ring-1 group-hover:ring-gray-200'}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-1.5">
          <h3 className={`text-xs font-medium text-center transition-colors duration-300 
            ${isActive 
              ? 'text-gray-900' 
              : 'text-gray-500 group-hover:text-gray-700'
            }`}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Categoryİtem