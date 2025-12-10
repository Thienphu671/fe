// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css";
// // import axios from "axios";

// // const AdminNavbar = () => {
// //   const [userName, setUserName] = useState("");
// //   const [reviews, setReviews] = useState([]);
// //   const [showModal, setShowModal] = useState(false);

// //   useEffect(() => {
// //     const storedUserName = localStorage.getItem("userName");
// //     if (storedUserName) setUserName(storedUserName);

// //     axios
// //       .get("http://localhost:8080/api/danhgia/all")
// //       .then((res) => setReviews(res.data))
// //       .catch((err) => console.error("Lỗi khi lấy đánh giá:", err));
// //   }, []);

// //   const toggleModal = () => setShowModal(!showModal);

// //   return (
// //     <>
// //       <div className="sidebar d-flex flex-column justify-content-between p-3 text-white">
// //         <div>
// //           <h4 className="mb-4">
// //             <i className="fas fa-cogs me-2"></i>Admin Panel
// //           </h4>
// //           <ul className="nav flex-column">
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/admin/sanpham">
// //                 <i className="fas fa-box me-2"></i> Sản Phẩm
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/categories">
// //                 <i className="fas fa-list me-2"></i> Danh Mục
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/User">
// //                 <i className="fas fa-users me-2"></i> Người Dùng
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/Orders">
// //                 <i className="fas fa-shopping-cart me-2"></i> Đơn Hàng
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/admin/revenue/thongke">
// //                 <i className="fas fa-chart-line me-2"></i> Doanh Thu
// //               </Link>
// //             </li>
// //           </ul>
// //         </div>

// //         <div>
// //           {userName && (
// //             <div className="mb-2">
// //               <span className="nav-link text-white">
// //                 <i className="fas fa-user-circle me-2"></i>Xin chào, <strong>{userName}</strong>
// //               </span>
// //             </div>
// //           )}

// //           <div className="mb-2">
// //             <button className="nav-link text-white btn btn-link p-0" onClick={toggleModal}>
// //               <i className="fas fa-bell"></i> Thông Báo ({reviews.length})
// //             </button>
// //           </div>

// //           <div>
// //             <Link className="nav-link text-danger fw-bold" to="/logout">
// //               <i className="fas fa-sign-out-alt me-2"></i>Đăng Xuất
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div className="modal show fade" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
// //           <div className="modal-dialog" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Danh Sách Đánh Giá</h5>
// //                 <button type="button" className="btn-close" onClick={toggleModal}></button>
// //               </div>
// //               <div className="modal-body">
// //                 {reviews.length > 0 ? (
// //                   <ul className="list-group">
// //                     {reviews.map((review, index) => (
// //                       <li key={index} className="list-group-item">
// //                         <strong>{review.userName}</strong>: {review.danhgia} - {review.sao} sao
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 ) : (
// //                   <p>Chưa có đánh giá nào.</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         .sidebar {
// //           width: 250px;
// //           height: 100vh;
// //           background-color: #007bff;
// //           position: fixed;
// //           left: 0;
// //           top: 0;
// //           overflow-y: auto;
// //         }

// //         .sidebar .nav-link {
// //           padding: 10px;
// //           border-radius: 5px;
// //           transition: all 0.3s ease-in-out;
// //         }

// //         .sidebar .nav-link:hover {
// //           background-color: rgba(255, 255, 255, 0.2);
// //           color: #ffc107 !important;
// //         }

// //         .sidebar .nav-link.active {
// //           color: #ffc107 !important;
// //           font-weight: bold;
// //           background-color: rgba(255, 255, 255, 0.3);
// //         }

// //         .logout-btn:hover {
// //           color: white !important;
// //           background-color: #dc3545;
// //           transform: scale(1.1);
// //         }

// //         .modal .modal-dialog {
// //           margin-top: 10%;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default AdminNavbar;

// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css";
// // import axios from "axios";

// // const AdminNavbar = () => {
// //   const [userName, setUserName] = useState("");
// //   const [reviews, setReviews] = useState([]);
// //   const [showModal, setShowModal] = useState(false);

// //   useEffect(() => {
// //     const storedUserName = localStorage.getItem("userName");
// //     if (storedUserName) setUserName(storedUserName);

// //     axios
// //       .get("http://localhost:8080/api/danhgia/all")
// //       .then((res) => setReviews(res.data))
// //       .catch((err) => console.error("Lỗi khi lấy đánh giá:", err));
// //   }, []);

// //   const toggleModal = () => setShowModal(!showModal);

// //   return (
// //     <>
// //       <div className="sidebar d-flex flex-column justify-content-between p-3 text-white">
// //         <div>
// //           <h4 className="mb-4">
// //             <i className="fas fa-cogs me-2"></i>Admin Panel
// //           </h4>
// //           <ul className="nav flex-column">
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/admin/sanpham">
// //                 <i className="fas fa-box me-2"></i> Sản Phẩm
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/categories">
// //                 <i className="fas fa-list me-2"></i> Danh Mục
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/User">
// //                 <i className="fas fa-users me-2"></i> Người Dùng
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/Orders">
// //                 <i className="fas fa-shopping-cart me-2"></i> Đơn Hàng
// //               </Link>
// //             </li>
// //             <li className="nav-item mb-2">
// //               <Link className="nav-link text-white" to="/admin/revenue/thongke">
// //                 <i className="fas fa-chart-line me-2"></i> Doanh Thu
// //               </Link>
// //             </li>
// //           </ul>
// //         </div>

// //         <div>
// //           {userName && (
// //             <div className="mb-2">
// //               <span className="nav-link text-white">
// //                 <i className="fas fa-user-circle me-2"></i>Xin chào, <strong>{userName}</strong>
// //               </span>
// //             </div>
// //           )}

// //           <div className="mb-2">
// //             <button className="nav-link text-white btn btn-link p-0" onClick={toggleModal}>
// //               <i className="fas fa-bell"></i> Thông Báo ({reviews.length})
// //             </button>
// //           </div>

// //           <div>
// //             <Link className="nav-link text-danger fw-bold" to="/logout">
// //               <i className="fas fa-sign-out-alt me-2"></i>Đăng Xuất
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div className="modal show fade" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
// //           <div className="modal-dialog" role="document">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Danh Sách Đánh Giá</h5>
// //                 <button type="button" className="btn-close" onClick={toggleModal}></button>
// //               </div>
// //               <div className="modal-body">
// //                 {reviews.length > 0 ? (
// //                   <ul className="list-group">
// //                     {reviews.map((review, index) => (
// //                       <li key={index} className="list-group-item">
// //                         <strong>{review.userName}</strong>: {review.danhgia} - {review.sao} sao
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 ) : (
// //                   <p>Chưa có đánh giá nào.</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         .sidebar {
// //           width: 200px; /* Thay đổi độ rộng ở đây */
// //           height: 100vh;
// //           background-color: #007bff;
// //           position: fixed;
// //           left: 0;
// //           top: 0;
// //           overflow-y: auto;
// //         }

// //         .sidebar .nav-link {
// //           padding: 8px; /* Giảm padding */
// //           border-radius: 5px;
// //           transition: all 0.3s ease-in-out;
// //         }

// //         .sidebar .nav-link:hover {
// //           background-color: rgba(255, 255, 255, 0.2);
// //           color: #ffc107 !important;
// //         }

// //         .sidebar .nav-link.active {
// //           color: #ffc107 !important;
// //           font-weight: bold;
// //           background-color: rgba(255, 255, 255, 0.3);
// //         }

// //         .logout-btn:hover {
// //           color: white !important;
// //           background-color: #dc3545;
// //           transform: scale(1.1);
// //         }

// //         .modal .modal-dialog {
// //           margin-top: 10%;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default AdminNavbar;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import axios from "axios";

// const AdminNavbar = () => {
//   const [userName, setUserName] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const storedUserName = localStorage.getItem("userName");
//     if (storedUserName) setUserName(storedUserName);

//     axios
//       .get("http://localhost:8080/api/danhgia/all")
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error("Lỗi khi lấy đánh giá:", err));
//   }, []);

//   const toggleModal = () => setShowModal(!showModal);

//   return (
//     <>
//       <div className="sidebar d-flex flex-column justify-content-between p-3 text-white">
//         <div>
//           <h4 className="mb-4">
//             <i className="fas fa-cogs me-2"></i>Admin Panel
//           </h4>
//           <ul className="nav flex-column">
//             <li className="nav-item mb-2">
//               <Link className="nav-link text-white" to="/admin/sanpham">
//                 <i className="fas fa-box me-2"></i> Sản Phẩm
//               </Link>
//             </li>
//             <li className="nav-item mb-2">
//               <Link className="nav-link text-white" to="/categories">
//                 <i className="fas fa-list me-2"></i> Danh Mục
//               </Link>
//             </li>
//             <li className="nav-item mb-2">
//               <Link className="nav-link text-white" to="/User">
//                 <i className="fas fa-users me-2"></i> Người Dùng
//               </Link>
//             </li>
//             <li className="nav-item mb-2">
//               <Link className="nav-link text-white" to="/Orders">
//                 <i className="fas fa-shopping-cart me-2"></i> Đơn Hàng
//               </Link>
//             </li>
//             <li className="nav-item mb-2">
//               <Link className="nav-link text-white" to="/admin/revenue/thongke">
//                 <i className="fas fa-chart-line me-2"></i> Doanh Thu
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           {userName && (
//             <div className="mb-2">
//               <span className="nav-link text-white">
//                 <i className="fas fa-user-circle me-2"></i>Xin chào, <strong>{userName}</strong>
//               </span>
//             </div>
//           )}

//           <div className="mb-2">
//             <button className="nav-link text-white btn btn-link p-0" onClick={toggleModal}>
//               <i className="fas fa-bell"></i> Thông Báo ({reviews.length})
//             </button>
//           </div>

//           <div>
//             <Link className="nav-link text-danger fw-bold" to="/logout">
//               <i className="fas fa-sign-out-alt me-2"></i>Đăng Xuất
//             </Link>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal show fade" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Danh Sách Đánh Giá</h5>
//                 <button type="button" className="btn-close" onClick={toggleModal}></button>
//               </div>
//               <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
//                 {reviews.length > 0 ? (
//                   <ul className="list-group">
//                     {reviews.map((review, index) => (
//                       <li key={index} className="list-group-item d-flex justify-content-between">
//                         <div>
//                           <strong>{review.userName}</strong>: {review.danhgia} - {review.sao} sao
//                         </div>
//                         <div>
//                           <small>{new Date(review.ngayDanhgia).toLocaleString()}</small>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Chưa có đánh giá nào.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .sidebar {
//           width: 220px; /* Thay đổi độ rộng ở đây */
//           height: 100vh;
//           background-color: #007bff;
//           position: fixed;
//           left: 0;
//           top: 0;
//           overflow-y: auto;
//         }

//         .sidebar .nav-link {
//           padding: 8px; /* Giảm padding */
//           border-radius: 5px;
//           transition: all 0.3s ease-in-out;
//         }

//         .sidebar .nav-link:hover {
//           background-color: rgba(255, 255, 255, 0.2);
//           color: #ffc107 !important;
//         }

//         .sidebar .nav-link.active {
//           color: #ffc107 !important;
//           font-weight: bold;
//           background-color: rgba(255, 255, 255, 0.3);
//         }

//         .logout-btn:hover {
//           color: white !important;
//           background-color: #dc3545;
//           transform: scale(1.1);
//         }

//         .modal .modal-dialog {
//           margin-top: 10%;
//           max-width: 500px;
//         }
//       `}</style>
//     </>
//   );
// };

// export default AdminNavbar;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const AdminNavbar = () => {
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newReview, setNewReview] = useState({
    danhgia: "",
    sao: 5,
    ngayDanhgia: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
  });

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) setUserName(storedUserName);

    // Lấy danh sách đánh giá
    axios
      .get("http://localhost:8080/api/danhgia/all")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Lỗi khi lấy đánh giá:", err));
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/danhgia/submit", newReview)
      .then((res) => {
        setReviews([res.data, ...reviews]); // Thêm đánh giá mới vào danh sách
        setNewReview({
          danhgia: "",
          sao: 5,
          ngayDanhgia: new Date().toISOString().split("T")[0],
        }); // Reset form
      })
      .catch((err) => console.error("Lỗi khi gửi đánh giá:", err));
  };

  return (
    <>
      <div className="sidebar d-flex flex-column justify-content-between p-3 text-white">
        <div>
          <h4 className="mb-4">
            <i className="fas fa-cogs me-2"></i>Admin Panel
          </h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/sanpham">
                <i className="fas fa-box me-2"></i> Sản Phẩm
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/categories">
                <i className="fas fa-list me-2"></i> Danh Mục
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/User">
                <i className="fas fa-users me-2"></i> Người Dùng
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/Orders">
                <i className="fas fa-shopping-cart me-2"></i> Đơn Hàng
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/revenue/thongke">
                <i className="fas fa-chart-line me-2"></i> Doanh Thu
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin/review">
                <i className="fas fa-chart-line me-2"></i> danh gia
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {userName && (
            <div className="mb-2">
              <span className="nav-link text-white">
                <i className="fas fa-user-circle me-2"></i>Xin chào, <strong>{userName}</strong>
              </span>
            </div>
          )}

          <div className="mb-2">
            <button className="nav-link text-white btn btn-link p-0" onClick={toggleModal}>
              <i className="fas fa-bell"></i> Thông Báo ({reviews.length})
            </button>
          </div>

          <div>
            <Link className="nav-link text-danger fw-bold" to="/logout">
              <i className="fas fa-sign-out-alt me-2"></i>Đăng Xuất
            </Link>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show fade" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Danh Sách Đánh Giá</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {reviews.length > 0 ? (
                  <ul className="list-group">
                    {reviews.map((review, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between">
                        <div>
                          <strong>{review.userName}</strong>: {review.danhgia} - {review.sao} sao
                        </div>
                        <div>
                          <small>{new Date(review.ngayDanhgia).toLocaleDateString()}</small> {/* Hiển thị ngày tháng năm */}
                        </div>
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

      {/* Form thêm đánh giá */}
      <div className="container mt-4">
        <h4>Thêm Đánh Giá Mới</h4>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-3">
            <label htmlFor="danhgia" className="form-label">Đánh giá</label>
            <input
              type="text"
              className="form-control"
              id="danhgia"
              value={newReview.danhgia}
              onChange={(e) => setNewReview({ ...newReview, danhgia: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sao" className="form-label">Sao</label>
            <select
              className="form-select"
              id="sao"
              value={newReview.sao}
              onChange={(e) => setNewReview({ ...newReview, sao: e.target.value })}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} sao
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="ngayDanhgia" className="form-label">Ngày Đánh Giá</label>
            <input
              type="date"
              className="form-control"
              id="ngayDanhgia"
              value={newReview.ngayDanhgia}
              onChange={(e) => setNewReview({ ...newReview, ngayDanhgia: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Gửi Đánh Giá</button>
        </form>
      </div>

      <style>{`
        .sidebar {
          width: 220px;
          height: 100vh;
          background-color: #007bff;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
        }

        .sidebar .nav-link {
          padding: 8px;
          border-radius: 5px;
          transition: all 0.3s ease-in-out;
        }

        .sidebar .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffc107 !important;
        }

        .sidebar .nav-link.active {
          color: #ffc107 !important;
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .logout-btn:hover {
          color: white !important;
          background-color: #dc3545;
          transform: scale(1.1);
        }

        .modal .modal-dialog {
          margin-top: 10%;
          max-width: 500px;
        }
      `}</style>
    </>
  );
};

export default AdminNavbar;
