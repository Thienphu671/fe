
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State để lưu tên người dùng

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  
    // 👇 Lắng nghe sự kiện custom khi userName được cập nhật
    const handleUserNameUpdate = () => {
      const updatedUserName = localStorage.getItem("userName");
      setUserName(updatedUserName || "");
    };
  
    window.addEventListener("userNameUpdated", handleUserNameUpdate);
  
    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("userNameUpdated", handleUserNameUpdate);
    };
  }, []); // Mảng rỗng để chỉ chạy một lần khi component được render lần đầu

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Xóa tên người dùng khỏi localStorage khi người dùng đăng xuất
    localStorage.removeItem('userName');
    setUserName(""); // Cập nhật lại state khi đăng xuất
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-shop"></i> Shop Thời Trang
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/trangChu/form">
                <i className="bi bi-house-door"></i> Trang Chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sanPham">
                <i className="bi bi-bag"></i> Sản Phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                <i className="bi bi-heart"></i> Yêu Thích
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donHangND">
                <i className="bi bi-clock-history"></i> Lịch Sử Mua Hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/giohang">
                <i className="bi bi-cart"></i> Giỏ Hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gioiThieu/form">
                <i className="bi bi-info-circle"></i> Giới Thiệu
              </Link>
            </li>

            {userName && (
              <li className="nav-item">
                <span className="nav-link text-white">
                  <i className="bi bi-person-circle"></i> Xin chào, {userName}
                </span>
              </li>
            )}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen ? "true" : "false"}
              >
                <i className="bi bi-person"></i> Tài Khoản
              </a>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/auth/login">
                    <i className="bi bi-box-arrow-in-right"></i> Đăng Nhập
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/DangKy">
                    <i className="bi bi-person-plus"></i> Đăng Ký
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/quenmatkhau">
                    <i className="bi bi-key"></i> Quên Mật Khẩu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/DoiMatKhau">
                    <i className="bi bi-lock"></i> Đổi Mật Khẩu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/thongtin">
                    <i className="bi bi-person-lines-fill"></i> Thông Tin Cá Nhân
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Đăng Xuất
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
