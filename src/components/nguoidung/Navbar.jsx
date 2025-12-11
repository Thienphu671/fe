import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("userName");
    if (stored) setUserName(stored);

    const handler = () => setUserName(localStorage.getItem("userName") || "");
    window.addEventListener("userNameUpdated", handler);
    return () => window.removeEventListener("userNameUpdated", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName("");
    window.location.href = "/auth/login";
  };

  // CSS đẹp sang trọng – hoạt động 100% với React thường (Vite/CRA)
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .luxury-nav .navbar-nav .nav-link {
        color: #2d2d2d !important;
        font-weight: 500 !important;
        font-size: 16px;
        position: relative;
        padding: 0.5rem 1.2rem !important;
        transition: color 0.3s ease;
      }
      .luxury-nav .navbar-nav .nav-link:hover {
        color: #d4a574 !important;
      }
      .luxury-nav .navbar-nav .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 6px;
        left: 50%;
        background-color: #d4a574;
        transition: all 0.3s ease;
      }
      .luxury-nav .navbar-nav .nav-link:hover::after {
        width: 100%;
        left: 0;
      }
      .luxury-nav .dropdown-menu {
        border: 1px solid #f0e9e2 !important;
        border-radius: 12px !important;
        box-shadow: 0 15px 40px rgba(0,0,0,0.12) !important;
        min-width: 240px;
        margin-top: 10px !important;
      }
      .luxury-nav .dropdown-item {
        padding: 14px 28px !important;
        font-size: 15px;
        transition: all 0.2s;
      }
      .luxury-nav .dropdown-item:hover {
        background-color: #fdf9f5 !important;
        color: #d4a574 !important;
        padding-left: 36px !important;
      }
      .luxury-nav .navbar-brand {
        font-family: 'Georgia', serif !important;
        font-size: 30px !important;
        font-weight: 400 !important;
        color: #2d2d2d !important;
        transition: color 0.3s;
      }
      .luxury-nav .navbar-brand:hover {
        color: #d4a574 !important;
      }
      .user-welcome {
        color: #d4a574 !important;
        font-weight: 600 !important;
        font-size: 15px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm luxury-nav" style={{
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f0e9e2",
      padding: "1.2rem 0",
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Shop Thời Trang
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">Trang Chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sanPham">Sản Phẩm</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Yêu Thích</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donHangND">Lịch Sử</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/giohang">Giỏ Hàng</Link>
            </li>

            {/* Chào user */}
            {userName && (
              <li className="nav-item">
                <span className="navbar-text user-welcome mx-4">
                  Xin chào, {userName}
                </span>
              </li>
            )}

            {/* Dropdown Tài khoản */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                aria-expanded={isDropdownOpen}
              >
                Tài Khoản
              </a>

              <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? "show" : ""}`}>
                <li><Link className="dropdown-item" to="/auth/login">Đăng Nhập</Link></li>
                <li><Link className="dropdown-item" to="/DangKy">Đăng Ký</Link></li>
                <li><Link className="dropdown-item" to="/quenmatkhau">Quên Mật Khẩu</Link></li>
                <li><Link className="dropdown-item" to="/DoiMatKhau">Đổi Mật Khẩu</Link></li>
                <li><Link className="dropdown-item" to="/thongtin">Thông Tin Cá Nhân</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link
                    className="dropdown-item text-danger"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;