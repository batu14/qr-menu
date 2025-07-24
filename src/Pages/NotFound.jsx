import React from 'react'
import { Link } from 'react-router'
const NotFound = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>  
        <div className='w-full h-full flex items-center justify-center flex-col gap-4'>
            <h1 className='text-4xl font-bold'>404</h1>
            <p className='text-2xl'>Sayfa bulunamadı</p>
            <Link to='/' className='text-blue-500'>Anasayfaya dön</Link>
            <Link to='/menu' className='text-blue-500'>Menüye dön</Link>
            <Link to='/review' className='text-blue-500'>Değerlendirmeye dön</Link>
            <Link to='/admin' className='text-blue-500'>Admin girişi</Link>
            <Link to='/dashboard' className='text-blue-500'>Dashboard</Link>
        </div>
    </div>
  )
}

export default NotFound