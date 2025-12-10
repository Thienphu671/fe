
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const AdminNavbar = () => {
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const storedUserName = localStorage.getItem("userName"); // Lưu từ khi login
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }
//   }, []);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#007bff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
//       <div className="container">
//         <Link className="navbar-brand fw-bold text-white" to="#">
//           <i className="fas fa-cogs me-2"></i> Admin Panel
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav me-auto">
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/admin/sanpham">
//                 <i className="fas fa-box me-1"></i> Sản Phẩm
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/categories">
//                 <i className="fas fa-list me-1"></i> Danh Mục
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/list/users">
//                 <i className="fas fa-users me-1"></i> Người Dùng
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/donHang/form">
//                 <i className="fas fa-shopping-cart me-1"></i> Đơn Hàng
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/admin/revenue/thongke">
//                 <i className="fas fa-chart-line me-1"></i> Doanh Thu
//               </Link>
//             </li>
//           </ul>

//           <ul className="navbar-nav">
//             {userName && (
//               <li className="nav-item d-flex align-items-center">
//                 <span className="nav-link text-white">
//                   <i className="fas fa-user-circle me-1"></i> Xin chào, <span className="fw-bold">{userName}</span>
//                 </span>
//               </li>
//             )}
            
//             <li className="nav-item">
//               <Link className="nav-link text-danger fw-bold logout-btn" to="/logout">
//                 Đăng Xuất
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <style>{`
//         .navbar-nav .nav-link {
//           transition: all 0.3s ease-in-out;
//           padding: 10px 15px;
//           border-radius: 5px;
//         }
//         .navbar-nav .nav-link:hover {
//           background-color: rgba(255, 255, 255, 0.2);
//           color: #ffc107 !important;
//           transform: scale(1.05);
//         }
//         .navbar-nav .nav-item .nav-link.active {
//           color: #ffc107 !important;
//           font-weight: bold;
//           background-color: rgba(255, 255, 255, 0.3);
//         }
//         .logout-btn:hover {
//           color: white !important;
//           background-color: #dc3545;
//           transform: scale(1.1);
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default AdminNavbar;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';

const AdminNavbar = () => {
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState([]); // Lưu trữ danh sách đánh giá
  const [showModal, setShowModal] = useState(false); // Điều khiển việc hiển thị modal

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // Lưu từ khi login
    if (storedUserName) {
      setUserName(storedUserName);
    }
  
    // Lấy các đánh giá từ API
    axios.get('http://localhost:8080/api/danhgia/all')  // Sửa API tùy theo server của bạn
      .then(response => {
        setReviews(response.data);  // Giả sử response trả về danh sách các đánh giá
      })
      .catch(error => {
        console.error('Lỗi khi lấy đánh giá:', error);
      });
  
    // Lấy đánh giá từ localStorage nếu có
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(prevReviews => [...prevReviews, ...storedReviews]);  // Kết hợp với đánh giá từ API nếu có
  
  }, []);  // Chạy khi component mount lần đầu tiên
  

  const toggleModal = () => setShowModal(!showModal);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#007bff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
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
              <Link className="nav-link text-white" to="/categories">
                <i className="fas fa-list me-1"></i> Danh Mục
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/list/users">
                <i className="fas fa-users me-1"></i> Người Dùng
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/donHang/form">
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

            {/* Thêm icon thông báo */}
            <li className="nav-item">
              <button className="nav-link text-white" onClick={toggleModal}>
                <i className="fas fa-bell"></i> Thông Báo ({reviews.length})
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-danger fw-bold logout-btn" to="/logout">
                Đăng Xuất
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal hiển thị đánh giá */}
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Danh Sách Đánh Giá</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {reviews.length > 0 ? (
                  <ul className="list-group">
                    {reviews.map((review, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{review.userName}</strong>: {review.danhgia} - {review.sao} sao
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Chưa có đánh giá nào.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
