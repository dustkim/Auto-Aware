import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/Header.css";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const location = useLocation(); // 현재 경로를 추적

  // 사이드바 열고 닫힘 확인
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // localStorage에 저장된 토큰이 있는지 확인
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    setLogin(!!token);
  }, [location]);

  return (
    <div className="header_total">
      <header className="header">
        <div className="menu_logo">
          <button onClick={toggleSidebar}>
            <img src="/image/menu.png" alt="menu" />
            {/* <div className="logoBox">
              <img src="./image/logo.png" alt="logo" />
              <h2>GUARDIAN</h2>
            </div> */}
          </button>
          <div className="logoBox">
            <img src="./image/logo.png" alt="logo" />
            <h2>GUARDIAN</h2>
          </div>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <a href="#">main ▼</a>
            </li>
            <li>
              <a href="#">List ▼</a>
            </li>
            <li>
              <a href="#">Map ▼</a>
            </li>
          </ul>
        </nav>
        <div className="bell_logo">
          <button>
            <img src="/image/bell.png" alt="logo" />
          </button>
        </div>
      </header>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isLogin={isLogin}
        setLogin={setLogin}
      />
    </div>
  );
};

export default Header;
