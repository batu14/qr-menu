import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import FoodDetail from './Pages/FoodDetail'
import Rewiev from './Pages/Rewiev'

const App = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/menu/:id' element={<FoodDetail />} />
        <Route path='/review' element={<Rewiev />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App