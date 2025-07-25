import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineShoppingCart,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineGlobe,
  HiOutlineSun,
  HiOutlineShare
} from 'react-icons/hi';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Karşılama', icon: HiOutlineHome, path: '/dashboard/home' },
    { name: 'Kategoriler', icon: HiOutlineViewGrid, path: '/dashboard/category' },
    { name: 'Ürünler', icon: HiOutlineShoppingCart, path: '/dashboard/product' },
  ];

  const settingsItems = [
    { name: 'Genel Ayarlar', icon: HiOutlineCog, path: '/admin/settings/general' },
    { name: 'Sosyal Medya', icon: HiOutlineShare, path: '/admin/settings/social' },
    { name: 'Dil Ayarları', icon: HiOutlineGlobe, path: '/admin/settings/language' },
    { name: 'Tema & Renkler', icon: HiOutlineSun, path: '/admin/settings/theme' },
  ];

  const handleLogout = () => {
    // Logout işlemleri burada yapılacak
    console.log('Çıkış yapılıyor...');
  };

  const isSettingsPage = location.pathname.includes('/admin/settings');

  return (
    <div className={` h-full fixed top-0 bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">L</span>
            </div>
            <span className="font-semibold text-gray-900">Lezzet Durağı</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <HiOutlineMenu className="w-5 h-5 text-gray-500" />
          ) : (
            <HiOutlineX className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {/* Ana Menü */}
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              location.pathname === item.path ? 'text-white' : 'text-gray-400'
            }`} />
            {!isCollapsed && <span className="font-medium">{item.name}</span>}
          </Link>
        ))}

        {/* Ayarlar Menüsü */}
        <div className="pt-2">
          {!isCollapsed ? (
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                isSettingsPage ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <HiOutlineCog className={`w-5 h-5 ${isSettingsPage ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium">Ayarlar</span>
              </div>
              <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <Link
              to="/admin/settings/general"
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                isSettingsPage ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HiOutlineCog className={`w-5 h-5 ${isSettingsPage ? 'text-white' : 'text-gray-400'}`} />
            </Link>
          )}

          {/* Ayarlar Alt Menüsü */}
          {!isCollapsed && isSettingsOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100">
              {settingsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${
                    location.pathname === item.path ? 'text-white' : 'text-gray-400'
                  }`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <HiOutlineLogout className="w-5 h-5 text-gray-400" />
          {!isCollapsed && <span className="font-medium">Çıkış Yap</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;