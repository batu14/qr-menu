import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import Menu from './Pages/Menu'


const App = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App