import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminNavbar = ({ userName }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#007bff', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold text-white" to="#">
                    <i className="fas fa-cogs me-2"></i> Admin Panel
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/sanpham">
                                <i className="fas fa-box me-1"></i> Sản Phẩm
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/categories">
                                <i className="fas fa-list me-1"></i> Danh Mục
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/users">
                                <i className="fas fa-users me-1"></i> Người Dùng
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/donhang">
                                <i className="fas fa-shopping-cart me-1"></i> Đơn Hàng
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/admin/revenue/thongke">
                                <i className="fas fa-chart-line me-1"></i> Doanh Thu
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        {userName && (
                            <li className="nav-item d-flex align-items-center">
                <span className="nav-link text-white">
                  <i className="fas fa-user-circle me-1"></i> Xin chào, <span className="fw-bold">{userName}</span>
                </span>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link text-danger fw-bold logout-btn" to="/trangChu/form">
                                Trang Chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-danger fw-bold logout-btn" to="/auth/logout">
                                Đăng Xuất
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <style>{`
        .navbar-nav .nav-link {
          transition: all 0.3s ease-in-out;
          padding: 10px 15px;
          border-radius: 5px;
        }
        .navbar-nav .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffc107 !important;
          transform: scale(1.05);
        }
        .navbar-nav .nav-item .nav-link.active {
          color: #ffc107 !important;
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.3);
        }
        .logout-btn {
          transition: all 0.3s ease-in-out;
        }
        .logout-btn:hover {
          color: white !important;
          background-color: #dc3545;
          transform: scale(1.1);
        }
      `}</style>
        </nav>
    );
};

export default AdminNavbar;
