// src/pages/user/Navbar.jsx
"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lấy tên user từ localStorage
  useEffect(() => {
    const name = localStorage.getItem("userName")
    if (name) setUserName(name)

    const handler = () => setUserName(localStorage.getItem("userName") || "")
    window.addEventListener("userNameUpdated", handler)
    return () => window.removeEventListener("userNameUpdated", handler)
  }, [])

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("token")
    setUserName("")
    window.location.href = "/auth/login"
  }

  // Chèn CSS đẹp (không dùng <style jsx> vì bạn không dùng Next.js)
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .custom-navlink {
        color: #2d2d2d !important;
        text-decoration: none !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        position: relative;
        transition: color 0.3s ease;
      }
      .custom-navlink:hover {
        color: #d4a574 !important;
      }
      .custom-navlink::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -8px;
        left: 50%;
        background: #d4a574;
        transition: all 0.3s ease;
      }
      .custom-navlink:hover::after {
        width: 100%;
        left: 0;
      }
      .custom-dd-item {
        display: block;
        padding: 14px 24px;
        color: #333;
        text-decoration: none;
        font-size: 15px;
        transition: all 0.2s;
      }
      .custom-dd-item:hover {
        background: #fdf9f5;
        color: #d4a574;
      }
      @media (max-width: 992px) {
        .desktop-menu { display: none !important; }
        .mobile-btn { display: block !important; }
        .mobile-menu-item {
          display: block;
          padding: 16px 0;
          font-size: 18px;
          color: #2d2d2d;
          text-decoration: none;
          font-weight: 500;
        }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <nav style={{
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #eee",
      padding: "20px 0",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "32px",
            fontWeight: "400",
            color: "#2d2d2d",
            textDecoration: "none"
          }}
        >
          Shop Thời Trang
        </Link>

        {/* Menu Desktop */}
        <div className="desktop-menu" style={{ display: "flex", gap: "50px", alignItems: "center" }}>
          <Link to="/" className="custom-navlink">Trang Chủ</Link>
          <Link to="/sanPham" className="custom-navlink">Sản Phẩm</Link>
          <Link to="/favorites" className="custom-navlink">Yêu Thích</Link>
          <Link to="/donHangND" className="custom-navlink">Lịch Sử</Link>
          <Link to="/giohang" className="custom-navlink">Giỏ Hàng</Link>
        </div>

        {/* Phần bên phải */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          {/* Hiển thị tên user */}
          {userName && (
            <span style={{ color: "#444", fontWeight: "500", marginRight: "20px" }}>
              Xin chào, <strong style={{ color: "#d4a574" }}>{userName}</strong>
            </span>
          )}

          {/* Dropdown Tài khoản */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                color: "#2d2d2d",
                cursor: "pointer"
              }}
            >
              Tài Khoản
            </button>

            {isDropdownOpen && (
              <div style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "#fff",
                minWidth: "220px",
                borderRadius: "12px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                border: "1px solid #f0e9e2",
                overflow: "hidden"
              }}>
                <Link to="/auth/login" className="custom-dd-item">Đăng Nhập</Link>
                <Link to="/DangKy" className="custom-dd-item">Đăng Ký</Link>
                <Link to="/quenmatkhau" className="custom-dd-item">Quên Mật Khẩu</Link>
                <Link to="/DoiMatKhau" className="custom-dd-item">Đổi Mật Khẩu</Link>
                <Link to="/thongtin" className="custom-dd-item">Thông Tin Cá Nhân</Link>
                <hr style={{ margin: "8px 0" }} />
                <Link
                  to="/logout"
                  className="custom-dd-item"
                  onClick={handleLogout}
                  style={{ color: "#e74c3c" }}
                >
                  Đăng Xuất
                </Link>
              </div>
            )}
          </div>

          {/* Nút mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-btn"
            style={{ display: "none", background: "none", border: "none", fontSize: "28px", color: "#2d2d2d" }}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          background: "#fff",
          padding: "25px 20px",
          borderTop: "1px solid #eee"
        }}>
          <Link to="/" className="mobile-menu-item">Trang Chủ</Link>
          <Link to="/sanPham" className="mobile-menu-item">Sản Phẩm</Link>
          <Link to="/favorites" className="mobile-menu-item">Yêu Thích</Link>
          <Link to="/donHangND" className="mobile-menu-item">Lịch Sử</Link>
          <Link to="/giohang" className="mobile-menu-item">Giỏ Hàng</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar