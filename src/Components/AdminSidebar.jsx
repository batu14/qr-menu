import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
  HiOutlineShare,
  HiOutlineStar,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Reducers/AuthReducer";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      dispatch(clearUser());
      navigate("/admin");
    }
  }, [token]);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { name: "Karşılama", icon: HiOutlineHome, path: "/dashboard/home" },
    {
      name: "Kategoriler",
      icon: HiOutlineViewGrid,
      path: "/dashboard/category",
    },
    {
      name: "Ürünler",
      icon: HiOutlineShoppingCart,
      path: "/dashboard/product",
    },
    {
      name: "Değerlendirmeler",
      icon: HiOutlineStar,
      path: "/dashboard/review",
    }
  ];

  const settingsItems = [
    { name: "Genel Ayarlar", icon: HiOutlineCog, path: "/dashboard/general" },
    { name: "Sosyal Medya", icon: HiOutlineShare, path: "/dashboard/social" },
    { name: "Dil Ayarları", icon: HiOutlineGlobe, path: "/dashboard/language" },
    { name: "Qr Oluştur", icon: HiOutlineSun, path: "/dashboard/qr" },
  ];

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/admin");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (isMobile) {
      document.body.style.overflow = isCollapsed ? "hidden" : "auto";
    }
  };

  const isSettingsPage = location.pathname.includes("/admin/settings");

  return (
    <>
      {/* Mobil Menü Butonu */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isCollapsed ? (
          <HiOutlineMenu className="w-6 h-6 text-gray-700" />
        ) : (
          <HiOutlineX className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40
          ${
            isCollapsed
              ? "-translate-x-full md:translate-x-0 md:w-20"
              : "translate-x-0 w-64"
          }
        `}
      >
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
            onClick={toggleSidebar}
            className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
              onClick={() => isMobile && toggleSidebar()}
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
              {!isCollapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}

          {/* Ayarlar Menüsü */}
          <div className="pt-2">
            {!isCollapsed ? (
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  isSettingsPage
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <HiOutlineCog
                    className={`w-5 h-5 ${
                      isSettingsPage ? "text-white" : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">Ayarlar</span>
                </div>
                <HiOutlineChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isSettingsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!isMobile) {
                    setIsCollapsed(false);
                    setIsSettingsOpen(true);
                  }
                }}
                className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                  isSettingsPage
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <HiOutlineCog
                  className={`w-5 h-5 ${
                    isSettingsPage ? "text-white" : "text-gray-400"
                  }`}
                />
              </button>
            )}

            {/* Ayarlar Alt Menüsü */}
            {!isCollapsed && isSettingsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100">
                {settingsItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => isMobile && toggleSidebar()}
                    className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        location.pathname === item.path
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    />
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
    </>
  );
};

export default AdminSidebar;
