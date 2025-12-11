


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";  // Import đây
import "react-toastify/dist/ReactToastify.css";
// User Pages
import Logout from './pages/user/Logout';
import LoginPage from './pages/user/LoginPage';
import DangKyForm from './pages/user/DangKy';
import TrangChu from './pages/user/TrangChu';
import ForgotPassword from './pages/user/ForgotPassword';
import ResetPassword from './pages/user/ResetPassword';
import ChangePassword from './pages/user/ChangePassword';
import UserProfile from './pages/user/UserProfile';
import EditProfile from './pages/user/EditProfile';
import OrderList from './pages/user/OrderList';
import OrderDetail from './pages/user/OrderDetail';
import ProductList from './pages/user/ProductList';
import Favorites from './pages/user/YeuThich';
import Giohang from './pages/user/GioHang';
import ProductDetailForm from './pages/user/ProductDetailForm';

// Admin Pages
import SanPhamForm from './pages/admin/SanPhamForm';
import SanPhamList from './pages/admin/SanPhamList';
import CategoryList from './pages/admin/CategoryList';
import CategoryForm from './pages/admin/CategoryForm';
import UserList from './pages/admin/UserList';
import OrderDetailPage from './pages/admin/OrderDetailPage';
import OrderListPage from './pages/admin/OrderListPage';
import ThongKeDoanhThu from './pages/admin/ThongKe';
import ThongKeSPYT from "./pages/admin/TKSPYT"; 
import ThongKeSPBC from "./pages/admin/TKSPBC"; 
import ReviewPage from "./pages/admin/ReviewPage"; // Import trang xem đánh giá

// Layouts & Components
import AdminLayout from './pages/admin/AdminLayout';
import UserNavbar from './components/nguoidung/Navbar';

// Extra Pages
const GioiThieu = () => <h2>Giới Thiệu</h2>;

function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    const handleUserChange = () => {
      setUserName(localStorage.getItem("userName"));
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    window.addEventListener("userNameUpdated", handleUserChange);
    return () => window.removeEventListener("userNameUpdated", handleUserChange);
  }, []);

  const UserLayout = ({ children }) => (
    <>
      <UserNavbar userName={userName} />
      <div className="container mt-4">{children}</div>
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/dangKy" element={<DangKyForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/quenmatkhau" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout setIsAdmin={setIsAdmin} setUserName={setUserName} />} />

        {/* Admin routes */}
        {userName && isAdmin && (
          <>
            <Route path="/admin/sanpham" element={<AdminLayout userName={userName}><SanPhamList /></AdminLayout>} />
            <Route path="/admin/sanpham/form" element={<AdminLayout userName={userName}><SanPhamForm /></AdminLayout>} />
            <Route path="/categories" element={<AdminLayout userName={userName}><CategoryList /></AdminLayout>} />
            <Route path="/categories/add" element={<AdminLayout userName={userName}><CategoryForm /></AdminLayout>} />
            <Route path="/categories/edit/:id" element={<AdminLayout userName={userName}><CategoryForm /></AdminLayout>} />
            <Route path="/User" element={<AdminLayout userName={userName}><UserList /></AdminLayout>} />
            <Route path="/Orders" element={<AdminLayout userName={userName}><OrderListPage /></AdminLayout>} />
            <Route path="/orders/:id" element={<AdminLayout userName={userName}><OrderDetailPage /></AdminLayout>} />
            <Route path="/admin/revenue/thongke" element={<AdminLayout userName={userName}><ThongKeDoanhThu /></AdminLayout>} />
            <Route path="/admin/revenue/sanphamyeuthich" element={<AdminLayout userName={userName}><ThongKeSPYT /></AdminLayout>} />
            <Route path="/admin/revenue/sanphambanchay" element={<AdminLayout userName={userName}><ThongKeSPBC /></AdminLayout>} />
            <Route path="/admin/review" element={<AdminLayout userName={userName}><ReviewPage /></AdminLayout>} />

          </>
        )}

        {/* User routes */}
        {userName && !isAdmin && (
          <>
            <Route path="/" element={<UserLayout><TrangChu /></UserLayout>} />
            <Route path="/sanPham" element={<UserLayout><ProductList /></UserLayout>} />
            <Route path="/favorites" element={<UserLayout><Favorites /></UserLayout>} />
            <Route path="/donHangND" element={<UserLayout><OrderList /></UserLayout>} />
            <Route path="/donHangND/detail/:id" element={<UserLayout><OrderDetail /></UserLayout>} />
            <Route path="/product/:id" element={<UserLayout><ProductDetailForm /></UserLayout>} />
            <Route path="/giohang" element={<UserLayout><Giohang /></UserLayout>} />
            <Route path="/gioiThieu/form" element={<UserLayout><GioiThieu /></UserLayout>} />
            <Route path="/thongtin" element={<UserLayout><UserProfile /></UserLayout>} />
            <Route path="/ThayDoiThongTin" element={<UserLayout><EditProfile /></UserLayout>} />
            <Route path="/DoiMatKhau" element={<UserLayout><ChangePassword /></UserLayout>} />
          </>
        )}

        {/* Fallback route */}
        <Route
          path="*"
          element={
            userName ? (
              isAdmin ? (
                <AdminLayout userName={userName}><SanPhamList /></AdminLayout>
              ) : (
                <UserLayout><TrangChu /></UserLayout>
              )
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
