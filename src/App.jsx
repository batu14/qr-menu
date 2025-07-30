import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import FoodDetail from "./Pages/FoodDetail";
import Rewiev from "./Pages/Rewiev";
import Login from "./Pages/Admin/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import NotFound from "./Pages/NotFound";
import HomeAdmin from "./Pages/Admin/Dashboard/Home";
import CategoryAdmin from "./Pages/Admin/Dashboard/Category";
import ProductAdmin from "./Pages/Admin/Dashboard/Product";
import GeneralAdmin from "./Pages/Admin/Dashboard/Settings/General";
import SocialAdmin from "./Pages/Admin/Dashboard/Settings/Social";
import LanguageAdmin from "./Pages/Admin/Dashboard/Settings/Language";
import QrAdmin from "./Pages/Admin/Dashboard/Qr";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<FoodDetail />} />
        <Route path="/review" element={<Rewiev />} />
      </Routes>
      <Routes>
        
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/home" element={<HomeAdmin />} />
          <Route path="/dashboard/category" element={<CategoryAdmin />} />
          <Route path="/dashboard/product" element={<ProductAdmin />} />
          <Route path="/dashboard/general" element={<GeneralAdmin />} />
          <Route path="/dashboard/social" element={<SocialAdmin />} />
          <Route path="/dashboard/language" element={<LanguageAdmin />} />
          <Route path="/dashboard/qr" element={<QrAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
