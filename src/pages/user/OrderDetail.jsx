

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useParams } from 'react-router-dom';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// // // import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// // // const OrderDetail = () => {
// // //   const { id } = useParams();
// // //   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
// // //   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
// // //   const [user, setUser] = useState(null); // Thông tin người dùng
// // //   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
// // //   const [address, setAddress] = useState(''); // Địa chỉ
// // //   const [rating, setRating] = useState(0); // Số sao
// // //   const [review, setReview] = useState(''); // Nội dung đánh giá
// // //   const [message, setMessage] = useState(''); // Thông báo lỗi/success

// // //   useEffect(() => {
// // //     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
// // //       .then(response => {
// // //         const data = response.data;
// // //         console.log(data);  // Kiểm tra dữ liệu trả về từ API
// // //         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
// // //         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
// // //         setUser(data.user); // userDTO
// // //         setStatus(data.status); // status đã chuyển thành chuỗi rồi
// // //         setAddress(data.address); // Địa chỉ
// // //       })
// // //       .catch(error => {
// // //         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
// // //       });
// // //   }, [id]);

// // //   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó

// // //   const handleReviewSubmit = () => {
// // //     if (rating < 1 || rating > 5) {
// // //       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
// // //       return;
// // //     }
  
// // //     const reviewData = {
// // //       donhangId: id,
// // //       taikhoanId: Number(userId), // Chuyển đổi thành số
// // //       danhgia: review,
// // //       sao: rating,
// // //     };
  
// // //     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //       },
// // //     })
// // //       .then(response => {
// // //         setMessage('Đánh giá thành công!');
// // //         setReview(''); // Reset nội dung đánh giá
// // //         setRating(0); // Reset số sao
// // //       })
// // //       .catch(error => {
// // //         console.log('Review data:', reviewData);
// // //         setMessage('Lỗi khi gửi đánh giá!');
// // //         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
// // //       });
// // //   };

// // //   if (!user || orderDetails.length === 0) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   return (
// // //     <div className="container mt-5">
// // //       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

// // //       {/* Hiển thị thông tin khách hàng */}
// // //       <div className="card">
// // //         <div className="card-body">
// // //           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
// // //           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
// // //           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
// // //           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
// // //           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
// // //           {/* Kiểm tra nếu có ngày đặt */}
// // //           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
// // //         </div>
// // //       </div>

// // //       <h3 className="mt-4">Sản Phẩm</h3>
// // //       <table className="table table-bordered">
// // //         <thead>
// // //           <tr>
// // //             <th>Ảnh Sản Phẩm</th>
// // //             <th>Tên Sản Phẩm</th>
// // //             <th>Giá</th>
// // //             <th>Số Lượng</th>
// // //             <th>Tổng</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {orderDetails.map((detail, index) => (
// // //             <tr key={index}>
// // //               <td>
// // //                 {detail.productImage ? (
// // //                   <img
// // //                     src={`http://localhost:8080/uploads/${detail.productImage}`}
// // //                     width="80"
// // //                     height="80"
// // //                     alt={detail.productName}
// // //                   />
// // //                 ) : (
// // //                   <span>Không có ảnh</span>
// // //                 )}
// // //               </td>
// // //               <td>{detail.productName}</td>
// // //               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
// // //               <td>{detail.quantity}</td>
// // //               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
// // //             </tr>
// // //           ))}
// // //           <tr>
// // //             <td colSpan="4"><strong>Tổng tiền:</strong></td>
// // //             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
// // //           </tr>
// // //         </tbody>
// // //       </table>

// // //       {/* Phần đánh giá sản phẩm */}
// // //       <div className="review-section mt-5">
// // //         <h4>Đánh Giá Đơn Hàng</h4>
// // //         {message && <p className="message">{message}</p>}
// // //         <div className="form-group">
// // //           <label htmlFor="rating">Chọn số sao:</label>
// // //           <div className="rating-stars">
// // //             {[1, 2, 3, 4, 5].map((star) => (
// // //               <FontAwesomeIcon
// // //                 key={star}
// // //                 icon={faStar}
// // //                 color={star <= rating ? '#ffd700' : '#ccc'}
// // //                 onClick={() => setRating(star)}
// // //                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="review">Nội dung đánh giá:</label>
// // //           <textarea
// // //             id="review"
// // //             className="form-control"
// // //             rows="4"
// // //             value={review}
// // //             onChange={(e) => setReview(e.target.value)}
// // //             placeholder="Viết đánh giá của bạn"
// // //           />
// // //         </div>
// // //         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit}>Gửi Đánh Giá</button>
// // //       </div>

// // //       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
// // //     </div>
// // //   );
// // // };

// // // export default OrderDetail;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// // import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// // const OrderDetail = () => {
// //   const { id } = useParams();
// //   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
// //   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
// //   const [user, setUser] = useState(null); // Thông tin người dùng
// //   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
// //   const [address, setAddress] = useState(''); // Địa chỉ
// //   const [rating, setRating] = useState(0); // Số sao
// //   const [review, setReview] = useState(''); // Nội dung đánh giá
// //   const [message, setMessage] = useState(''); // Thông báo lỗi/success
// //   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

// //   useEffect(() => {
// //     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
// //       .then(response => {
// //         const data = response.data;
// //         console.log(data);  // Kiểm tra dữ liệu trả về từ API
// //         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
// //         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
// //         setUser(data.user); // userDTO
// //         setStatus(data.status); // status đã chuyển thành chuỗi rồi
// //         setAddress(data.address); // Địa chỉ
        
// //         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
// //         if (data.user.hasReviewed) {
// //           setAlreadyReviewed(true);
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
// //       });
// //   }, [id]);

// //   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó

  
// //   const handleReviewSubmit = () => {
// //     if (alreadyReviewed) {
// //       setMessage('Bạn đã đánh giá rồi!');
// //       return; // Dừng lại nếu đã đánh giá
// //     }
  
// //     if (rating < 1 || rating > 5) {
// //       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
// //       return;
// //     }
  
// //     const reviewData = {
// //       donhangId: id,
// //       taikhoanId: Number(userId), // Chuyển đổi thành số
// //       danhgia: review,
// //       sao: rating,
// //     };
  
// //     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     })
// //       .then(response => {
// //         setMessage('Đánh giá thành công!');
// //         setReview(''); // Reset nội dung đánh giá
// //         setRating(0); // Reset số sao
  
// //         // Lưu đánh giá vào localStorage
// //         const newReview = {
// //           userName: user.fullname,
// //           danhgia: review,
// //           sao: rating,
// //         };
  
// //         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
// //         storedReviews.push(newReview);
// //         localStorage.setItem("reviews", JSON.stringify(storedReviews));
// //       })
// //       .catch(error => {
// //         console.log('Review data:', reviewData);
// //         setMessage('Bạn đã đánh giá đơn hàng này!');
// //         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
// //       });
// //   };
  

// //   if (!user || orderDetails.length === 0) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

// //       {/* Hiển thị thông tin khách hàng */}
// //       <div className="card">
// //         <div className="card-body">
// //           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
// //           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
// //           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
// //           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
// //           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
// //           {/* Kiểm tra nếu có ngày đặt */}
// //           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
// //         </div>
// //       </div>

// //       <h3 className="mt-4">Sản Phẩm</h3>
// //       <table className="table table-bordered">
// //         <thead>
// //           <tr>
// //             <th>Ảnh Sản Phẩm</th>
// //             <th>Tên Sản Phẩm</th>
// //             <th>Giá</th>
// //             <th>Số Lượng</th>
// //             <th>Tổng</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orderDetails.map((detail, index) => (
// //             <tr key={index}>
// //               <td>
// //                 {detail.productImage ? (
// //                   <img
// //                     src={`http://localhost:8080/uploads/${detail.productImage}`}
// //                     width="80"
// //                     height="80"
// //                     alt={detail.productName}
// //                   />
// //                 ) : (
// //                   <span>Không có ảnh</span>
// //                 )}
// //               </td>
// //               <td>{detail.productName}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
// //               <td>{detail.quantity}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
// //             </tr>
// //           ))}
// //           <tr>
// //             <td colSpan="4"><strong>Tổng tiền:</strong></td>
// //             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
// //           </tr>
// //         </tbody>
// //       </table>

// //       {/* Phần đánh giá sản phẩm */}
// //       <div className="review-section mt-5">
// //         <h4>Đánh Giá Đơn Hàng</h4>
// //         {message && <p className="message">{message}</p>}
// //         <div className="form-group">
// //           <label htmlFor="rating">Chọn số sao:</label>
// //           <div className="rating-stars">
// //             {[1, 2, 3, 4, 5].map((star) => (
// //               <FontAwesomeIcon
// //                 key={star}
// //                 icon={faStar}
// //                 color={star <= rating ? '#ffd700' : '#ccc'}
// //                 onClick={() => setRating(star)}
// //                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="review">Nội dung đánh giá:</label>
// //           <textarea
// //             id="review"
// //             className="form-control"
// //             rows="4"
// //             value={review}
// //             onChange={(e) => setReview(e.target.value)}
// //             placeholder="Viết đánh giá của bạn"
// //           />
// //         </div>
// //         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
// //       </div>

// //       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
// //     </div>
// //   );
// // };

// // export default OrderDetail;




// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// // import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// // const OrderDetail = () => {
// //   const { id } = useParams();
// //   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
// //   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
// //   const [user, setUser] = useState(null); // Thông tin người dùng
// //   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
// //   const [address, setAddress] = useState(''); // Địa chỉ
// //   const [rating, setRating] = useState(0); // Số sao
// //   const [review, setReview] = useState(''); // Nội dung đánh giá
// //   const [message, setMessage] = useState(''); // Thông báo lỗi/success
// //   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

// //   useEffect(() => {
// //     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
// //       .then(response => {
// //         const data = response.data;
// //         console.log(data);  // Kiểm tra dữ liệu trả về từ API
// //         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
// //         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
// //         setUser(data.user); // userDTO
// //         setStatus(data.status); // status đã chuyển thành chuỗi rồi
// //         setAddress(data.address); // Địa chỉ
        
// //         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
// //         if (data.user.hasReviewed) {
// //           setAlreadyReviewed(true);
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
// //         setMessage('Đã xảy ra lỗi khi lấy thông tin đơn hàng!');
// //       });
// //   }, [id]);

  
// //   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó

// //   const handleReviewSubmit = () => {
// //     if (alreadyReviewed) {
// //       setMessage('Bạn đã đánh giá rồi!');
// //       return; // Dừng lại nếu đã đánh giá
// //     }
  
// //     if (rating < 1 || rating > 5) {
// //       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
// //       return;
// //     }
  
// //     if (!review.trim()) {
// //       setMessage('Vui lòng viết nội dung đánh giá.');
// //       return;
// //     }

// //     const reviewData = {
// //       donhangId: id,
// //       taikhoanId: Number(userId), // Chuyển đổi thành số
// //       danhgia: review,
// //       sao: rating,
// //     };
  
// //     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     })
// //       .then(response => {
// //         setMessage('Đánh giá thành công!');
// //         setReview(''); // Reset nội dung đánh giá
// //         setRating(0); // Reset số sao
  
// //         // Lưu đánh giá vào localStorage
// //         const newReview = {
// //           userName: user.fullname,
// //           danhgia: review,
// //           sao: rating,
// //         };
  
// //         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
// //         storedReviews.push(newReview);
// //         localStorage.setItem("reviews", JSON.stringify(storedReviews));
// //       })
// //       .catch(error => {
// //         console.log('Review data:', reviewData);
// //         setMessage('đơn hàng này bạn đánh giá!');
// //         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
// //       });
// //   };
  

// //   if (!user || orderDetails.length === 0) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

// //       {/* Hiển thị thông tin khách hàng */}
// //       <div className="card">
// //         <div className="card-body">
// //           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
// //           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
// //           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
// //           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
// //           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
// //           {/* Kiểm tra nếu có ngày đặt */}
// //           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
// //         </div>
// //       </div>

// //       <h3 className="mt-4">Sản Phẩm</h3>
// //       <table className="table table-bordered">
// //         <thead>
// //           <tr>
// //             <th>Ảnh Sản Phẩm</th>
// //             <th>Tên Sản Phẩm</th>
// //             <th>Giá</th>
// //             <th>Số Lượng</th>
// //             <th>Tổng</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orderDetails.map((detail, index) => (
// //             <tr key={index}>
// //               <td>
// //                 {detail.productImage ? (
// //                   <img
// //                     src={`http://localhost:8080/uploads/${detail.productImage}`}
// //                     width="80"
// //                     height="80"
// //                     alt={detail.productName}
// //                   />
// //                 ) : (
// //                   <span>Không có ảnh</span>
// //                 )}
// //               </td>
// //               <td>{detail.productName}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
// //               <td>{detail.quantity}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
// //             </tr>
// //           ))}
// //           <tr>
// //             <td colSpan="4"><strong>Tổng tiền:</strong></td>
// //             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
// //           </tr>
// //         </tbody>
// //       </table>

// //       {/* Phần đánh giá sản phẩm */}
// //       <div className="review-section mt-5">
// //         <h4>Đánh Giá Đơn Hàng</h4>
// //         {message && <p className="message">{message}</p>}
// //         <div className="form-group">
// //           <label htmlFor="rating">Chọn số sao:</label>
// //           <div className="rating-stars">
// //             {[1, 2, 3, 4, 5].map((star) => (
// //               <FontAwesomeIcon
// //                 key={star}
// //                 icon={faStar}
// //                 color={star <= rating ? '#ffd700' : '#ccc'}
// //                 onClick={() => setRating(star)}
// //                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="review">Nội dung đánh giá:</label>
// //           <textarea
// //             id="review"
// //             className="form-control"
// //             rows="4"
// //             value={review}
// //             onChange={(e) => setReview(e.target.value)}
// //             placeholder="Viết đánh giá của bạn"
// //           />
// //         </div>
// //         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
// //       </div>

// //       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
// //     </div>
// //   );
// // };

// // export default OrderDetail;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
//   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
//   const [user, setUser] = useState(null); // Thông tin người dùng
//   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
//   const [address, setAddress] = useState(''); // Địa chỉ
//   const [rating, setRating] = useState(0); // Số sao
//   const [review, setReview] = useState(''); // Nội dung đánh giá
//   const [message, setMessage] = useState(''); // Thông báo lỗi/success
//   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
//       .then(response => {
//         const data = response.data;
//         console.log(data);  // Kiểm tra dữ liệu trả về từ API
//         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
//         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
//         setUser(data.user); // userDTO
//         setStatus(data.status); // status đã chuyển thành chuỗi rồi
//         setAddress(data.address); // Địa chỉ
        
//         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
//         if (data.user.hasReviewed) {
//           setAlreadyReviewed(true);
//         }
//       })
//       .catch(error => {
//         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
//       });
//   }, [id]);

//   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó
//   const handleReviewSubmit = () => {
//     if (alreadyReviewed) {
//       setMessage('Bạn đã đánh giá rồi!');
//       return; // Dừng lại nếu đã đánh giá
//     }
  
//     if (rating < 1 || rating > 5) {
//       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
//       return;
//     }
  
//     const reviewData = {
//       donhangId: id,
//       taikhoanId: Number(userId), // Chuyển đổi thành số
//       danhgia: review,
//       sao: rating,
//     };
  
//     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setMessage('Đánh giá thành công!');
//         setReview(''); // Reset nội dung đánh giá
//         setRating(0); // Reset số sao
  
//         // Lưu đánh giá vào localStorage
//         const newReview = {
//           userName: user.fullname,
//           danhgia: review,
//           sao: rating,
//         };
  
//         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
//         storedReviews.push(newReview);
//         localStorage.setItem("reviews", JSON.stringify(storedReviews));
//       })
//       .catch(error => {
//         console.log('Review data:', reviewData);
//         setMessage('Bạn đã đánh giá đơn hàng này!');
//         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
//       });
//   };
  

//   if (!user || orderDetails.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

//       {/* Hiển thị thông tin khách hàng */}
//       <div className="card">
//         <div className="card-body">
//           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
//           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
//           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
//           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
//           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
//           {/* Kiểm tra nếu có ngày đặt */}
//           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
//         </div>
//       </div>

//       <h3 className="mt-4">Sản Phẩm</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Ảnh Sản Phẩm</th>
//             <th>Tên Sản Phẩm</th>
//             <th>Giá</th>
//             <th>Số Lượng</th>
//             <th>Tổng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>
//                 {detail.productImage ? (
//                   <img
//                     src={`http://localhost:8080/uploads/${detail.productImage}`}
//                     width="80"
//                     height="80"
//                     alt={detail.productName}
//                   />
//                 ) : (
//                   <span>Không có ảnh</span>
//                 )}
//               </td>
//               <td>{detail.productName}</td>
//               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
//               <td>{detail.quantity}</td>
//               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4"><strong>Tổng tiền:</strong></td>
//             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Phần đánh giá sản phẩm */}
//       <div className="review-section mt-5">
//         <h4>Đánh Giá Đơn Hàng</h4>
//         {message && <p className="message">{message}</p>}
//         <div className="form-group">
//           <label htmlFor="rating">Chọn số sao:</label>
//           <div className="rating-stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FontAwesomeIcon
//                 key={star}
//                 icon={faStar}
//                 color={star <= rating ? '#ffd700' : '#ccc'}
//                 onClick={() => setRating(star)}
//                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="review">Nội dung đánh giá:</label>
//           <textarea
//             id="review"
//             className="form-control"
//             rows="4"
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Viết đánh giá của bạn"
//           />
//         </div>
//         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
//       </div>

//       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
//     </div>
//   );
// };

// export default OrderDetail;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
//   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
//   const [user, setUser] = useState(null); // Thông tin người dùng
//   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
//   const [address, setAddress] = useState(''); // Địa chỉ
//   const [rating, setRating] = useState(0); // Số sao
//   const [review, setReview] = useState(''); // Nội dung đánh giá
//   const [message, setMessage] = useState(''); // Thông báo lỗi/success
//   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
//       .then(response => {
//         const data = response.data;
//         console.log(data);  // Kiểm tra dữ liệu trả về từ API
//         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
//         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
//         setUser(data.user); // userDTO
//         setStatus(data.status); // status đã chuyển thành chuỗi rồi
//         setAddress(data.address); // Địa chỉ
        
//         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
//         if (data.user.hasReviewed) {
//           setAlreadyReviewed(true);
//         }
//       })
//       .catch(error => {
//         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
//       });
//   }, [id]);

//   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó
  
//   // Hàm gửi đánh giá
//   const handleReviewSubmit = () => {
//     if (alreadyReviewed) {
//       setMessage('Bạn đã đánh giá rồi!');
//       return; // Dừng lại nếu đã đánh giá
//     }
  
//     if (rating < 1 || rating > 5) {
//       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
//       return;
//     }
  
//     const reviewData = {
//       donhangId: id,
//       taikhoanId: Number(userId), // Chuyển đổi thành số
//       danhgia: review,
//       sao: rating,
//     };
  
//     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setMessage('Đánh giá thành công!');
//         setReview(''); // Reset nội dung đánh giá
//         setRating(0); // Reset số sao
  
//         // Lưu đánh giá vào localStorage
//         const newReview = {
//           userName: user.fullname,
//           danhgia: review,
//           sao: rating,
//         };
  
//         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
//         storedReviews.push(newReview);
//         localStorage.setItem("reviews", JSON.stringify(storedReviews));
//       })
//       .catch(error => {
//         console.log('Review data:', reviewData);
//         setMessage('Có lỗi xảy ra khi gửi đánh giá!');
//         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
//       });
//   };

//   // Nếu chưa có thông tin đơn hàng hoặc người dùng, hiển thị loading
//   if (!user || orderDetails.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

//       {/* Hiển thị thông tin khách hàng */}
//       <div className="card">
//         <div className="card-body">
//           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
//           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
//           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
//           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
//           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
//           {/* Kiểm tra nếu có ngày đặt */}
//           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
//         </div>
//       </div>

//       <h3 className="mt-4">Sản Phẩm</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Ảnh Sản Phẩm</th>
//             <th>Tên Sản Phẩm</th>
//             <th>Giá</th>
//             <th>Số Lượng</th>
//             <th>Tổng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>
//                 {detail.productImage ? (
//                   <img
//                     src={`http://localhost:8080/uploads/${detail.productImage}`}
//                     width="80"
//                     height="80"
//                     alt={detail.productName}
//                   />
//                 ) : (
//                   <span>Không có ảnh</span>
//                 )}
//               </td>
//               <td>{detail.productName}</td>
//               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
//               <td>{detail.quantity}</td>
//               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4"><strong>Tổng tiền:</strong></td>
//             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Phần đánh giá sản phẩm */}
//       <div className="review-section mt-5">
//         <h4>Đánh Giá Đơn Hàng</h4>
//         {message && <p className="message">{message}</p>}
//         <div className="form-group">
//           <label htmlFor="rating">Chọn số sao:</label>
//           <div className="rating-stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FontAwesomeIcon
//                 key={star}
//                 icon={faStar}
//                 color={star <= rating ? '#ffd700' : '#ccc'}
//                 onClick={() => setRating(star)}
//                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="review">Nội dung đánh giá:</label>
//           <textarea
//             id="review"
//             className="form-control"
//             rows="4"
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Viết đánh giá của bạn"
//           />
//         </div>
//         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
//       </div>

//       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
//     </div>
//   );
// };

// export default OrderDetail;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import '../../App.css';

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [user, setUser] = useState(null);
//   const [status, setStatus] = useState('');
//   const [address, setAddress] = useState('');
//   const [productReviews, setProductReviews] = useState([]);
//   const [message, setMessage] = useState('');
//   const [orderDate, setOrderDate] = useState(null);

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
//       .then(response => {
//         const data = response.data;
//         setOrderDetails(data.orderDetails.orderDetails);
//         setTotalPrice(data.orderDetails.totalPrice);
//         setOrderDate(data.orderDetails.orderDate);
//         setUser(data.user);
//         setStatus(data.status);
//         setAddress(data.address);

//         const initialReviews = data.orderDetails.orderDetails.map(item => ({
//           productId: item.productId,
//           rating: 0,
//           review: '',
//           submitted: false,
//         }));
//         setProductReviews(initialReviews);
//       })
//       .catch(error => {
//         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
//       });
//   }, [id]);

//   const handleRatingChange = (index, rating) => {
//     const updated = [...productReviews];
//     updated[index].rating = rating;
//     setProductReviews(updated);
//   };
  
//   const handleReviewChange = (index, value) => {
//     const updated = [...productReviews];
//     updated[index].review = value;
//     setProductReviews(updated);
//   };
  
//   const handleSubmitReview = (index) => {
//     const { productId, rating, review } = productReviews[index];
  
//     // Kiểm tra xem productId có hợp lệ không
//     if (!productId) {
//       setMessage('Sản phẩm không hợp lệ');
//       console.error('Product ID is invalid:', productId); // Log giá trị của productId
//       return;
//     }
  
//     // Kiểm tra rating hợp lệ (từ 1 đến 5)
//     if (rating < 1 || rating > 5) {
//       setMessage('Số sao phải từ 1 đến 5');
//       return;
//     }
  
//     // Kiểm tra xem review có được nhập hay không
//     if (!review || review.trim() === '') {
//       setMessage('Vui lòng nhập đánh giá');
//       return;
//     }
  
//     // Đảm bảo các ID không bị null hoặc undefined
//     const reviewData = {
//       donhangId: Number(id),  // Kiểm tra giá trị id
//       taikhoanId: Number(userId),  // Kiểm tra giá trị userId
//       sanphamId: productId,  // Kiểm tra giá trị productId
//       sao: rating,
//       danhgia: review
//     };
  
//     // In ra để debug
//     console.log('Review data:', reviewData);
  
//     // Gửi yêu cầu đánh giá
//     axios.post('http://localhost:8080/api/danhgia/submit', reviewData)
//       .then(() => {
//         const updated = [...productReviews];
//         updated[index].submitted = true;  // Đánh dấu đã gửi thành công
//         setProductReviews(updated);
//         setMessage('Đánh giá thành công!');
//       })
//       .catch(error => {
//         setMessage('Lỗi khi gửi đánh giá!');
//         console.error(error.response?.data || error);
//       });
//   };
  

//   if (!user || orderDetails.length === 0) return <div>Loading...</div>;

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

//       <div className="card">
//         <div className="card-body">
//           <p><strong>Khách Hàng:</strong> {user.fullname}</p>
//           <p><strong>Gmail:</strong> {user.email}</p>
//           <p><strong>SĐT:</strong> {user.phoneNumber}</p>
//           <p><strong>Địa Chỉ:</strong> {address}</p>
//           <p><strong>Trạng Thái:</strong> {status}</p>
//           {orderDate && (
//             <p><strong>Ngày Đặt:</strong> {new Date(orderDate).toLocaleDateString()}</p>
//           )}
//         </div>
//       </div>

//       <h3 className="mt-4">Sản Phẩm</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Ảnh</th>
//             <th>Tên</th>
//             <th>Giá</th>
//             <th>Số Lượng</th>
//             <th>Tổng</th>
//             <th>Đánh Giá</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>
//                 {detail.productImage ? (
//                   <img src={`http://localhost:8080/uploads/${detail.productImage}`} alt={detail.productName} width="80" height="80" />
//                 ) : 'Không có ảnh'}
//               </td>
//               <td>{detail.productName}</td>
//               <td>{detail.price.toLocaleString()} VNĐ</td>
//               <td>{detail.quantity}</td>
//               <td>{(detail.price * detail.quantity).toLocaleString()} VNĐ</td>
//               <td>
//                 {productReviews[index]?.submitted ? (
//                   <span className="text-success">Đã đánh giá</span>
//                 ) : (
//                   <div>
//                     <div className="mb-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <FontAwesomeIcon
//                           key={star}
//                           icon={faStar}
//                           color={star <= productReviews[index].rating ? '#ffd700' : '#ccc'}
//                           onClick={() => handleRatingChange(index, star)}
//                           style={{ cursor: 'pointer', fontSize: '20px' }}
//                         />
//                       ))}
//                     </div>
//                     <textarea
//                       rows="2"
//                       className="form-control mb-2"
//                       placeholder="Nội dung đánh giá..."
//                       value={productReviews[index].review}
//                       onChange={(e) => handleReviewChange(index, e.target.value)}
//                     />
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => handleSubmitReview(index)}
//                     >
//                       Gửi
//                     </button>
//                   </div>
//                 )}
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4"><strong>Tổng tiền:</strong></td>
//             <td colSpan="2">{totalPrice.toLocaleString()} VNĐ</td>
//           </tr>
//         </tbody>
//       </table>

//       {message && <div className="alert alert-info mt-3">{message}</div>}
//       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
//     </div>
//   );
// };

// export default OrderDetail;


// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useParams } from 'react-router-dom';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// // // import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// // // const OrderDetail = () => {
// // //   const { id } = useParams();
// // //   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
// // //   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
// // //   const [user, setUser] = useState(null); // Thông tin người dùng
// // //   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
// // //   const [address, setAddress] = useState(''); // Địa chỉ
// // //   const [rating, setRating] = useState(0); // Số sao
// // //   const [review, setReview] = useState(''); // Nội dung đánh giá
// // //   const [message, setMessage] = useState(''); // Thông báo lỗi/success

// // //   useEffect(() => {
// // //     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
// // //       .then(response => {
// // //         const data = response.data;
// // //         console.log(data);  // Kiểm tra dữ liệu trả về từ API
// // //         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
// // //         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
// // //         setUser(data.user); // userDTO
// // //         setStatus(data.status); // status đã chuyển thành chuỗi rồi
// // //         setAddress(data.address); // Địa chỉ
// // //       })
// // //       .catch(error => {
// // //         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
// // //       });
// // //   }, [id]);

// // //   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó

// // //   const handleReviewSubmit = () => {
// // //     if (rating < 1 || rating > 5) {
// // //       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
// // //       return;
// // //     }
  
// // //     const reviewData = {
// // //       donhangId: id,
// // //       taikhoanId: Number(userId), // Chuyển đổi thành số
// // //       danhgia: review,
// // //       sao: rating,
// // //     };
  
// // //     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //       },
// // //     })
// // //       .then(response => {
// // //         setMessage('Đánh giá thành công!');
// // //         setReview(''); // Reset nội dung đánh giá
// // //         setRating(0); // Reset số sao
// // //       })
// // //       .catch(error => {
// // //         console.log('Review data:', reviewData);
// // //         setMessage('Lỗi khi gửi đánh giá!');
// // //         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
// // //       });
// // //   };

// // //   if (!user || orderDetails.length === 0) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   return (
// // //     <div className="container mt-5">
// // //       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

// // //       {/* Hiển thị thông tin khách hàng */}
// // //       <div className="card">
// // //         <div className="card-body">
// // //           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
// // //           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
// // //           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
// // //           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
// // //           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
// // //           {/* Kiểm tra nếu có ngày đặt */}
// // //           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
// // //         </div>
// // //       </div>

// // //       <h3 className="mt-4">Sản Phẩm</h3>
// // //       <table className="table table-bordered">
// // //         <thead>
// // //           <tr>
// // //             <th>Ảnh Sản Phẩm</th>
// // //             <th>Tên Sản Phẩm</th>
// // //             <th>Giá</th>
// // //             <th>Số Lượng</th>
// // //             <th>Tổng</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {orderDetails.map((detail, index) => (
// // //             <tr key={index}>
// // //               <td>
// // //                 {detail.productImage ? (
// // //                   <img
// // //                     src={`http://localhost:8080/uploads/${detail.productImage}`}
// // //                     width="80"
// // //                     height="80"
// // //                     alt={detail.productName}
// // //                   />
// // //                 ) : (
// // //                   <span>Không có ảnh</span>
// // //                 )}
// // //               </td>
// // //               <td>{detail.productName}</td>
// // //               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
// // //               <td>{detail.quantity}</td>
// // //               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
// // //             </tr>
// // //           ))}
// // //           <tr>
// // //             <td colSpan="4"><strong>Tổng tiền:</strong></td>
// // //             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
// // //           </tr>
// // //         </tbody>
// // //       </table>

// // //       {/* Phần đánh giá sản phẩm */}
// // //       <div className="review-section mt-5">
// // //         <h4>Đánh Giá Đơn Hàng</h4>
// // //         {message && <p className="message">{message}</p>}
// // //         <div className="form-group">
// // //           <label htmlFor="rating">Chọn số sao:</label>
// // //           <div className="rating-stars">
// // //             {[1, 2, 3, 4, 5].map((star) => (
// // //               <FontAwesomeIcon
// // //                 key={star}
// // //                 icon={faStar}
// // //                 color={star <= rating ? '#ffd700' : '#ccc'}
// // //                 onClick={() => setRating(star)}
// // //                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //         <div className="form-group">
// // //           <label htmlFor="review">Nội dung đánh giá:</label>
// // //           <textarea
// // //             id="review"
// // //             className="form-control"
// // //             rows="4"
// // //             value={review}
// // //             onChange={(e) => setReview(e.target.value)}
// // //             placeholder="Viết đánh giá của bạn"
// // //           />
// // //         </div>
// // //         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit}>Gửi Đánh Giá</button>
// // //       </div>

// // //       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
// // //     </div>
// // //   );
// // // };

// // // export default OrderDetail;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// // import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// // const OrderDetail = () => {
// //   const { id } = useParams();
// //   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
// //   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
// //   const [user, setUser] = useState(null); // Thông tin người dùng
// //   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
// //   const [address, setAddress] = useState(''); // Địa chỉ
// //   const [rating, setRating] = useState(0); // Số sao
// //   const [review, setReview] = useState(''); // Nội dung đánh giá
// //   const [message, setMessage] = useState(''); // Thông báo lỗi/success
// //   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

// //   useEffect(() => {
// //     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
// //       .then(response => {
// //         const data = response.data;
// //         console.log(data);  // Kiểm tra dữ liệu trả về từ API
// //         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
// //         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
// //         setUser(data.user); // userDTO
// //         setStatus(data.status); // status đã chuyển thành chuỗi rồi
// //         setAddress(data.address); // Địa chỉ
        
// //         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
// //         if (data.user.hasReviewed) {
// //           setAlreadyReviewed(true);
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
// //       });
// //   }, [id]);

// //   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó

  
// //   const handleReviewSubmit = () => {
// //     if (alreadyReviewed) {
// //       setMessage('Bạn đã đánh giá rồi!');
// //       return; // Dừng lại nếu đã đánh giá
// //     }
  
// //     if (rating < 1 || rating > 5) {
// //       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
// //       return;
// //     }
  
// //     const reviewData = {
// //       donhangId: id,
// //       taikhoanId: Number(userId), // Chuyển đổi thành số
// //       danhgia: review,
// //       sao: rating,
// //     };
  
// //     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     })
// //       .then(response => {
// //         setMessage('Đánh giá thành công!');
// //         setReview(''); // Reset nội dung đánh giá
// //         setRating(0); // Reset số sao
  
// //         // Lưu đánh giá vào localStorage
// //         const newReview = {
// //           userName: user.fullname,
// //           danhgia: review,
// //           sao: rating,
// //         };
  
// //         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
// //         storedReviews.push(newReview);
// //         localStorage.setItem("reviews", JSON.stringify(storedReviews));
// //       })
// //       .catch(error => {
// //         console.log('Review data:', reviewData);
// //         setMessage('Bạn đã đánh giá đơn hàng này!');
// //         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
// //       });
// //   };
  

// //   if (!user || orderDetails.length === 0) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

// //       {/* Hiển thị thông tin khách hàng */}
// //       <div className="card">
// //         <div className="card-body">
// //           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
// //           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
// //           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
// //           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
// //           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
// //           {/* Kiểm tra nếu có ngày đặt */}
// //           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
// //         </div>
// //       </div>

// //       <h3 className="mt-4">Sản Phẩm</h3>
// //       <table className="table table-bordered">
// //         <thead>
// //           <tr>
// //             <th>Ảnh Sản Phẩm</th>
// //             <th>Tên Sản Phẩm</th>
// //             <th>Giá</th>
// //             <th>Số Lượng</th>
// //             <th>Tổng</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orderDetails.map((detail, index) => (
// //             <tr key={index}>
// //               <td>
// //                 {detail.productImage ? (
// //                   <img
// //                     src={`http://localhost:8080/uploads/${detail.productImage}`}
// //                     width="80"
// //                     height="80"
// //                     alt={detail.productName}
// //                   />
// //                 ) : (
// //                   <span>Không có ảnh</span>
// //                 )}
// //               </td>
// //               <td>{detail.productName}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
// //               <td>{detail.quantity}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
// //             </tr>
// //           ))}
// //           <tr>
// //             <td colSpan="4"><strong>Tổng tiền:</strong></td>
// //             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
// //           </tr>
// //         </tbody>
// //       </table>

// //       {/* Phần đánh giá sản phẩm */}
// //       <div className="review-section mt-5">
// //         <h4>Đánh Giá Đơn Hàng</h4>
// //         {message && <p className="message">{message}</p>}
// //         <div className="form-group">
// //           <label htmlFor="rating">Chọn số sao:</label>
// //           <div className="rating-stars">
// //             {[1, 2, 3, 4, 5].map((star) => (
// //               <FontAwesomeIcon
// //                 key={star}
// //                 icon={faStar}
// //                 color={star <= rating ? '#ffd700' : '#ccc'}
// //                 onClick={() => setRating(star)}
// //                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="review">Nội dung đánh giá:</label>
// //           <textarea
// //             id="review"
// //             className="form-control"
// //             rows="4"
// //             value={review}
// //             onChange={(e) => setReview(e.target.value)}
// //             placeholder="Viết đánh giá của bạn"
// //           />
// //         </div>
// //         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
// //       </div>

// //       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
// //     </div>
// //   );
// // };

// // export default OrderDetail;




// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// // import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// // const OrderDetail = () => {
// //   const { id } = useParams();
// //   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
// //   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
// //   const [user, setUser] = useState(null); // Thông tin người dùng
// //   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
// //   const [address, setAddress] = useState(''); // Địa chỉ
// //   const [rating, setRating] = useState(0); // Số sao
// //   const [review, setReview] = useState(''); // Nội dung đánh giá
// //   const [message, setMessage] = useState(''); // Thông báo lỗi/success
// //   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

// //   useEffect(() => {
// //     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
// //       .then(response => {
// //         const data = response.data;
// //         console.log(data);  // Kiểm tra dữ liệu trả về từ API
// //         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
// //         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
// //         setUser(data.user); // userDTO
// //         setStatus(data.status); // status đã chuyển thành chuỗi rồi
// //         setAddress(data.address); // Địa chỉ
        
// //         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
// //         if (data.user.hasReviewed) {
// //           setAlreadyReviewed(true);
// //         }
// //       })
// //       .catch(error => {
// //         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
// //         setMessage('Đã xảy ra lỗi khi lấy thông tin đơn hàng!');
// //       });
// //   }, [id]);

  
// //   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó

// //   const handleReviewSubmit = () => {
// //     if (alreadyReviewed) {
// //       setMessage('Bạn đã đánh giá rồi!');
// //       return; // Dừng lại nếu đã đánh giá
// //     }
  
// //     if (rating < 1 || rating > 5) {
// //       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
// //       return;
// //     }
  
// //     if (!review.trim()) {
// //       setMessage('Vui lòng viết nội dung đánh giá.');
// //       return;
// //     }

// //     const reviewData = {
// //       donhangId: id,
// //       taikhoanId: Number(userId), // Chuyển đổi thành số
// //       danhgia: review,
// //       sao: rating,
// //     };
  
// //     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     })
// //       .then(response => {
// //         setMessage('Đánh giá thành công!');
// //         setReview(''); // Reset nội dung đánh giá
// //         setRating(0); // Reset số sao
  
// //         // Lưu đánh giá vào localStorage
// //         const newReview = {
// //           userName: user.fullname,
// //           danhgia: review,
// //           sao: rating,
// //         };
  
// //         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
// //         storedReviews.push(newReview);
// //         localStorage.setItem("reviews", JSON.stringify(storedReviews));
// //       })
// //       .catch(error => {
// //         console.log('Review data:', reviewData);
// //         setMessage('đơn hàng này bạn đánh giá!');
// //         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
// //       });
// //   };
  

// //   if (!user || orderDetails.length === 0) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

// //       {/* Hiển thị thông tin khách hàng */}
// //       <div className="card">
// //         <div className="card-body">
// //           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
// //           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
// //           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
// //           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
// //           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
// //           {/* Kiểm tra nếu có ngày đặt */}
// //           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
// //         </div>
// //       </div>

// //       <h3 className="mt-4">Sản Phẩm</h3>
// //       <table className="table table-bordered">
// //         <thead>
// //           <tr>
// //             <th>Ảnh Sản Phẩm</th>
// //             <th>Tên Sản Phẩm</th>
// //             <th>Giá</th>
// //             <th>Số Lượng</th>
// //             <th>Tổng</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orderDetails.map((detail, index) => (
// //             <tr key={index}>
// //               <td>
// //                 {detail.productImage ? (
// //                   <img
// //                     src={`http://localhost:8080/uploads/${detail.productImage}`}
// //                     width="80"
// //                     height="80"
// //                     alt={detail.productName}
// //                   />
// //                 ) : (
// //                   <span>Không có ảnh</span>
// //                 )}
// //               </td>
// //               <td>{detail.productName}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
// //               <td>{detail.quantity}</td>
// //               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
// //             </tr>
// //           ))}
// //           <tr>
// //             <td colSpan="4"><strong>Tổng tiền:</strong></td>
// //             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
// //           </tr>
// //         </tbody>
// //       </table>

// //       {/* Phần đánh giá sản phẩm */}
// //       <div className="review-section mt-5">
// //         <h4>Đánh Giá Đơn Hàng</h4>
// //         {message && <p className="message">{message}</p>}
// //         <div className="form-group">
// //           <label htmlFor="rating">Chọn số sao:</label>
// //           <div className="rating-stars">
// //             {[1, 2, 3, 4, 5].map((star) => (
// //               <FontAwesomeIcon
// //                 key={star}
// //                 icon={faStar}
// //                 color={star <= rating ? '#ffd700' : '#ccc'}
// //                 onClick={() => setRating(star)}
// //                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="review">Nội dung đánh giá:</label>
// //           <textarea
// //             id="review"
// //             className="form-control"
// //             rows="4"
// //             value={review}
// //             onChange={(e) => setReview(e.target.value)}
// //             placeholder="Viết đánh giá của bạn"
// //           />
// //         </div>
// //         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
// //       </div>

// //       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
// //     </div>
// //   );
// // };

// // export default OrderDetail;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
//   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
//   const [user, setUser] = useState(null); // Thông tin người dùng
//   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
//   const [address, setAddress] = useState(''); // Địa chỉ
//   const [rating, setRating] = useState(0); // Số sao
//   const [review, setReview] = useState(''); // Nội dung đánh giá
//   const [message, setMessage] = useState(''); // Thông báo lỗi/success
//   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
//       .then(response => {
//         const data = response.data;
//         console.log(data);  // Kiểm tra dữ liệu trả về từ API
//         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
//         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
//         setUser(data.user); // userDTO
//         setStatus(data.status); // status đã chuyển thành chuỗi rồi
//         setAddress(data.address); // Địa chỉ
        
//         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
//         if (data.user.hasReviewed) {
//           setAlreadyReviewed(true);
//         }
//       })
//       .catch(error => {
//         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
//       });
//   }, [id]);

//   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó
//   const handleReviewSubmit = () => {
//     if (alreadyReviewed) {
//       setMessage('Bạn đã đánh giá rồi!');
//       return; // Dừng lại nếu đã đánh giá
//     }
  
//     if (rating < 1 || rating > 5) {
//       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
//       return;
//     }
  
//     const reviewData = {
//       donhangId: id,
//       taikhoanId: Number(userId), // Chuyển đổi thành số
//       danhgia: review,
//       sao: rating,
//     };
  
//     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setMessage('Đánh giá thành công!');
//         setReview(''); // Reset nội dung đánh giá
//         setRating(0); // Reset số sao
  
//         // Lưu đánh giá vào localStorage
//         const newReview = {
//           userName: user.fullname,
//           danhgia: review,
//           sao: rating,
//         };
  
//         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
//         storedReviews.push(newReview);
//         localStorage.setItem("reviews", JSON.stringify(storedReviews));
//       })
//       .catch(error => {
//         console.log('Review data:', reviewData);
//         setMessage('Bạn đã đánh giá đơn hàng này!');
//         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
//       });
//   };
  

//   if (!user || orderDetails.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

//       {/* Hiển thị thông tin khách hàng */}
//       <div className="card">
//         <div className="card-body">
//           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
//           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
//           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
//           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
//           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
//           {/* Kiểm tra nếu có ngày đặt */}
//           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
//         </div>
//       </div>

//       <h3 className="mt-4">Sản Phẩm</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Ảnh Sản Phẩm</th>
//             <th>Tên Sản Phẩm</th>
//             <th>Giá</th>
//             <th>Số Lượng</th>
//             <th>Tổng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>
//                 {detail.productImage ? (
//                   <img
//                     src={`http://localhost:8080/uploads/${detail.productImage}`}
//                     width="80"
//                     height="80"
//                     alt={detail.productName}
//                   />
//                 ) : (
//                   <span>Không có ảnh</span>
//                 )}
//               </td>
//               <td>{detail.productName}</td>
//               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
//               <td>{detail.quantity}</td>
//               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4"><strong>Tổng tiền:</strong></td>
//             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Phần đánh giá sản phẩm */}
//       <div className="review-section mt-5">
//         <h4>Đánh Giá Đơn Hàng</h4>
//         {message && <p className="message">{message}</p>}
//         <div className="form-group">
//           <label htmlFor="rating">Chọn số sao:</label>
//           <div className="rating-stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FontAwesomeIcon
//                 key={star}
//                 icon={faStar}
//                 color={star <= rating ? '#ffd700' : '#ccc'}
//                 onClick={() => setRating(star)}
//                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="review">Nội dung đánh giá:</label>
//           <textarea
//             id="review"
//             className="form-control"
//             rows="4"
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Viết đánh giá của bạn"
//           />
//         </div>
//         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
//       </div>

//       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
//     </div>
//   );
// };

// export default OrderDetail;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons'; // Icon sao
// import '../../App.css';  // Đường dẫn từ src/pages/user đến src/app.css

// const OrderDetail = () => {
//   const { id } = useParams();
//   const [orderDetails, setOrderDetails] = useState([]); // Danh sách chi tiết sản phẩm
//   const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền
//   const [user, setUser] = useState(null); // Thông tin người dùng
//   const [status, setStatus] = useState(''); // Trạng thái đơn hàng
//   const [address, setAddress] = useState(''); // Địa chỉ
//   const [rating, setRating] = useState(0); // Số sao
//   const [review, setReview] = useState(''); // Nội dung đánh giá
//   const [message, setMessage] = useState(''); // Thông báo lỗi/success
//   const [alreadyReviewed, setAlreadyReviewed] = useState(false); // Kiểm tra xem đã đánh giá chưa

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
//       .then(response => {
//         const data = response.data;
//         console.log(data);  // Kiểm tra dữ liệu trả về từ API
//         setOrderDetails(data.orderDetails.orderDetails); // danh sách sản phẩm
//         setTotalPrice(data.orderDetails.totalPrice); // tổng tiền
//         setUser(data.user); // userDTO
//         setStatus(data.status); // status đã chuyển thành chuỗi rồi
//         setAddress(data.address); // Địa chỉ
        
//         // Kiểm tra nếu người dùng đã đánh giá đơn hàng
//         if (data.user.hasReviewed) {
//           setAlreadyReviewed(true);
//         }
//       })
//       .catch(error => {
//         console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
//       });
//   }, [id]);

//   const userId = localStorage.getItem("userId"); // Hoặc sessionStorage nếu bạn dùng cái đó
  
//   // Hàm gửi đánh giá
//   const handleReviewSubmit = () => {
//     if (alreadyReviewed) {
//       setMessage('Bạn đã đánh giá rồi!');
//       return; // Dừng lại nếu đã đánh giá
//     }
  
//     if (rating < 1 || rating > 5) {
//       setMessage('Số sao phải nằm trong khoảng từ 1 đến 5');
//       return;
//     }
  
//     const reviewData = {
//       donhangId: id,
//       taikhoanId: Number(userId), // Chuyển đổi thành số
//       danhgia: review,
//       sao: rating,
//     };
  
//     axios.post('http://localhost:8080/api/danhgia/submit', reviewData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setMessage('Đánh giá thành công!');
//         setReview(''); // Reset nội dung đánh giá
//         setRating(0); // Reset số sao
  
//         // Lưu đánh giá vào localStorage
//         const newReview = {
//           userName: user.fullname,
//           danhgia: review,
//           sao: rating,
//         };
  
//         let storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
//         storedReviews.push(newReview);
//         localStorage.setItem("reviews", JSON.stringify(storedReviews));
//       })
//       .catch(error => {
//         console.log('Review data:', reviewData);
//         setMessage('Có lỗi xảy ra khi gửi đánh giá!');
//         console.error('Lỗi chi tiết:', error.response.data);  // Log chi tiết lỗi từ response
//       });
//   };

//   // Nếu chưa có thông tin đơn hàng hoặc người dùng, hiển thị loading
//   if (!user || orderDetails.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

//       {/* Hiển thị thông tin khách hàng */}
//       <div className="card">
//         <div className="card-body">
//           <p><strong>Khách Hàng:</strong> {user.fullname || 'Thông tin không có'}</p>
//           <p><strong>Gmail:</strong> {user.email || 'Thông tin không có'}</p>
//           <p><strong>SĐT:</strong> {user.phoneNumber || 'Thông tin không có'}</p>
//           <p><strong>Địa Chỉ:</strong> {address || 'Thông tin không có'}</p>
//           <p><strong>Trạng Thái:</strong> {status || 'Không xác định'}</p>
//           {/* Kiểm tra nếu có ngày đặt */}
//           {user.orderDate && <p><strong>Ngày Đặt:</strong> {new Date(user.orderDate).toLocaleDateString()}</p>}
//         </div>
//       </div>

//       <h3 className="mt-4">Sản Phẩm</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Ảnh Sản Phẩm</th>
//             <th>Tên Sản Phẩm</th>
//             <th>Giá</th>
//             <th>Số Lượng</th>
//             <th>Tổng</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.map((detail, index) => (
//             <tr key={index}>
//               <td>
//                 {detail.productImage ? (
//                   <img
//                     src={`http://localhost:8080/uploads/${detail.productImage}`}
//                     width="80"
//                     height="80"
//                     alt={detail.productName}
//                   />
//                 ) : (
//                   <span>Không có ảnh</span>
//                 )}
//               </td>
//               <td>{detail.productName}</td>
//               <td>{new Intl.NumberFormat().format(detail.price)} VNĐ</td>
//               <td>{detail.quantity}</td>
//               <td>{new Intl.NumberFormat().format(detail.price * detail.quantity)} VNĐ</td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4"><strong>Tổng tiền:</strong></td>
//             <td>{new Intl.NumberFormat().format(totalPrice)} VNĐ</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Phần đánh giá sản phẩm */}
//       <div className="review-section mt-5">
//         <h4>Đánh Giá Đơn Hàng</h4>
//         {message && <p className="message">{message}</p>}
//         <div className="form-group">
//           <label htmlFor="rating">Chọn số sao:</label>
//           <div className="rating-stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FontAwesomeIcon
//                 key={star}
//                 icon={faStar}
//                 color={star <= rating ? '#ffd700' : '#ccc'}
//                 onClick={() => setRating(star)}
//                 style={{ cursor: 'pointer', fontSize: '24px', marginRight: '5px' }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="review">Nội dung đánh giá:</label>
//           <textarea
//             id="review"
//             className="form-control"
//             rows="4"
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Viết đánh giá của bạn"
//           />
//         </div>
//         <button className="btn btn-primary mt-3" onClick={handleReviewSubmit} disabled={alreadyReviewed}>Gửi Đánh Giá</button>
//       </div>

//       <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
//     </div>
//   );
// };

// export default OrderDetail;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');
  const [productReviews, setProductReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [orderDate, setOrderDate] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
      .then(response => {
        const data = response.data;
        setOrderDetails(data.orderDetails.orderDetails);
        setTotalPrice(data.orderDetails.totalPrice);
        setOrderDate(data.orderDetails.orderDate);
        setUser(data.user);
        setStatus(data.status);
        setAddress(data.address);

        const initialReviews = data.orderDetails.orderDetails.map(item => ({
          productId: item.productId,
          rating: 0,
          review: '',
          submitted: false,
        }));
        setProductReviews(initialReviews);
      })
      .catch(error => {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      });
  }, [id]);

  const handleRatingChange = (index, rating) => {
    const updated = [...productReviews];
    updated[index].rating = rating;
    setProductReviews(updated);
  };
  
  const handleReviewChange = (index, value) => {
    const updated = [...productReviews];
    updated[index].review = value;
    setProductReviews(updated);
  };
  
  const handleSubmitReview = (index) => {
    const { productId, rating, review } = productReviews[index];
  
    // Kiểm tra xem productId có hợp lệ không
    if (!productId) {
      setMessage('Sản phẩm không hợp lệ');
      console.error('Product ID is invalid:', productId); // Log giá trị của productId
      return;
    }
  
    // Kiểm tra rating hợp lệ (từ 1 đến 5)
    if (rating < 1 || rating > 5) {
      setMessage('Số sao phải từ 1 đến 5');
      return;
    }
  
    // Kiểm tra xem review có được nhập hay không
    if (!review || review.trim() === '') {
      setMessage('Vui lòng nhập đánh giá');
      return;
    }
  
    // Đảm bảo các ID không bị null hoặc undefined
   const reviewData = {
  donHangId: Number(id),
  taiKhoanId: Number(userId),
  sanPhamId: productId,
  sao: rating,
  danhgia: review
};

  
    // In ra để debug
    console.log('Review data:', reviewData);
  
    // Gửi yêu cầu đánh giá
    axios.post('http://localhost:8080/api/danhgia/submit', reviewData)
      .then(() => {
        const updated = [...productReviews];
        updated[index].submitted = true;  // Đánh dấu đã gửi thành công
        setProductReviews(updated);
        setMessage('Đánh giá thành công!');
      })
      .catch(error => {
        setMessage('bạn đã đánh giá sản phẩm này rồi!');
        console.error(error.response?.data || error);
      });
  };
  

  if (!user || orderDetails.length === 0) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chi Tiết Đơn Hàng</h2>

      <div className="card">
        <div className="card-body">
          <p><strong>Khách Hàng:</strong> {user.fullname}</p>
          <p><strong>Gmail:</strong> {user.email}</p>
          <p><strong>SĐT:</strong> {user.phoneNumber}</p>
          <p><strong>Địa Chỉ:</strong> {address}</p>
          <p><strong>Trạng Thái:</strong> {status}</p>
          {orderDate && (
            <p><strong>Ngày Đặt:</strong> {new Date(orderDate).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <h3 className="mt-4">Sản Phẩm</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Tổng</th>
            <th>Đánh Giá</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((detail, index) => (
            <tr key={index}>
              <td>
                {detail.productImage ? (
                  <img src={`http://localhost:8080/uploads/${detail.productImage}`} alt={detail.productName} width="80" height="80" />
                ) : 'Không có ảnh'}
              </td>
              <td>{detail.productName}</td>
              <td>{detail.price.toLocaleString()} VNĐ</td>
              <td>{detail.quantity}</td>
              <td>{(detail.price * detail.quantity).toLocaleString()} VNĐ</td>
              <td>
                {productReviews[index]?.submitted ? (
                  <span className="text-success">Đã đánh giá</span>
                ) : (
                  <div>
                    <div className="mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon
                          key={star}
                          icon={faStar}
                          color={star <= productReviews[index].rating ? '#ffd700' : '#ccc'}
                          onClick={() => handleRatingChange(index, star)}
                          style={{ cursor: 'pointer', fontSize: '20px' }}
                        />
                      ))}
                    </div>
                    <textarea
                      rows="2"
                      className="form-control mb-2"
                      placeholder="Nội dung đánh giá..."
                      value={productReviews[index].review}
                      onChange={(e) => handleReviewChange(index, e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleSubmitReview(index)}
                    >
                      Gửi
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4"><strong>Tổng tiền:</strong></td>
            <td colSpan="2">{totalPrice.toLocaleString()} VNĐ</td>
          </tr>
        </tbody>
      </table>

      {message && <div className="alert alert-info mt-3">{message}</div>}
      <a href="/donHangND" className="btn btn-secondary mt-3">Quay Lại</a>
    </div>
  );
};

export default OrderDetail;
