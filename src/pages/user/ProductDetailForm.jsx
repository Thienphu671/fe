


// // import axios from "axios";
// // import React, { useState, useEffect } from "react";
// // import { getProductById } from "../../api/sanPhamND";
// // import { useParams } from "react-router-dom";
// // import { themVaoGiohang } from "../../api/giohang";
// // import { addFavorite } from "../../api/yeuthich";
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const token = localStorage.getItem("token");

// // export const getProductReviews = async (productId) => {
// //   try {
// //     const response = await axios.get(
// //       `http://localhost:8080/api/danhgia/sanpham/${productId}`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching product reviews:", error.response ? error.response.data : error.message);
// //     throw error;
// //   }
// // };

// // const ProductDetailForm = () => {
// //   const { id } = useParams();
// //   const [productDetails, setProductDetails] = useState({});
// //   const [reviews, setReviews] = useState([]);
// //   const [quantity, setQuantity] = useState(1);
// //   const [reviewContent, setReviewContent] = useState("");
// //   const [rating, setRating] = useState(5);

// //   const loadProductById = async (id) => {
// //     try {
// //       const response = await getProductById(id);
// //       setProductDetails(response);
// //     } catch (error) {
// //       console.error("Lỗi khi tải sản phẩm:", error);
// //     }
// //   };

// //   const loadReviews = async (productId) => {
// //     try {
// //       const danhGiaList = await getProductReviews(productId);
// //       setReviews(danhGiaList);
// //     } catch (error) {
// //       console.error("Lỗi khi tải đánh giá sản phẩm:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (id) {
// //       loadProductById(id);
// //       loadReviews(id);
// //     }
// //   }, [id]);

// //   const productImageUrl = productDetails.hinh
// //     ? `http://localhost:8080${productDetails.hinh}`
// //     : "/path/to/default-image.jpg";

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Chưa có thông tin';
// //     const date = new Date(dateString);
// //     return isNaN(date) ? 'Ngày không hợp lệ' : date.toLocaleDateString();
// //   };

// //   const checkValue = (value, defaultValue) => {
// //     return value && value !== "null" && value !== "undefined" ? value : defaultValue;
// //   };

// //   const handleAddToCart = (e) => {
// //     e.preventDefault();
// //     console.log("Sản phẩm đã được thêm vào giỏ hàng", productDetails, "Số lượng:", quantity);
// //   };

// //   const handleQuantityChange = (e) => {
// //     const value = e.target.value;
// //     if (value >= 1) {
// //       setQuantity(value);
// //     }
// //   };

// //   const handleAddToWishlist = async () => {
// //     try {
// //       await addFavorite(productDetails.id);
// //       alert("Đã thêm sản phẩm vào danh sách yêu thích!");
// //     } catch (error) {
// //       alert("Vui lòng đăng nhập để thêm vào yêu thích.");
// //     }
// //   };

// //   const handleThemVaoGiohang = async (productId, quantity) => {
// //     try {
// //       await themVaoGiohang(productId, quantity);
// //       toast.success("Đã thêm sản phẩm vào giỏ hàng!");
// //     } catch (error) {
// //       console.error("Lỗi khi thêm vào giỏ hàng:", error);
// //       toast.error("Sản phẩm vượt quá số lượng cho phép!");
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h2 className="text-center mb-4">Chi Tiết Sản Phẩm</h2>
// //       <div className="row">
// //         <div className="col-md-5">
// //           <img src={productImageUrl} className="img-fluid rounded" alt={productDetails.ten} />
// //         </div>
// //         <div className="col-md-7">
// //           <h3 className="fw-bold">{checkValue(productDetails.ten, 'Không có tên sản phẩm')}</h3>
// //           <p className="text-danger fw-bold fs-4">{checkValue(productDetails.gia, 'Chưa có giá')} ₫</p>
// //           <p><strong>Danh mục:</strong> {checkValue(productDetails.danhMuc, 'Không có thông tin')}</p>
// //           <p><strong>Kích thước:</strong> {checkValue(productDetails.kichthuoc, 'Không có thông tin')}</p>
// //           <p><strong>Mô tả:</strong></p>
// //           <p>{checkValue(productDetails.mota, 'Không có mô tả sản phẩm.')}</p>
// //           <p><strong>Số lượng trong kho:</strong> {checkValue(productDetails.soluong, 'Chưa cập nhật')}</p>
// //           <p><strong>Ngày tạo:</strong> {formatDate(productDetails.ngayTao)}</p>

// //           <form onSubmit={handleAddToCart}>
// //             <div className="mb-2">
// //               <label htmlFor="soLuong" className="form-label">Số lượng</label>
// //               <input
// //                 type="number"
// //                 name="soLuong"
// //                 value={quantity}
// //                 min="1"
// //                 id="soLuong"
// //                 className="form-control"
// //                 style={{ width: "80px", display: "inline-block" }}
// //                 onChange={handleQuantityChange}
// //               />
// //             </div>
// //             <button
// //               className="btn btn-success"
// //               type="button"
// //               onClick={() => handleThemVaoGiohang(productDetails.id, quantity)}
// //             >
// //               Thêm vào Giỏ Hàng
// //             </button>
// //           </form>

// //           <a
// //             href="#"
// //             className="btn btn-outline-danger mt-2"
// //             onClick={handleAddToWishlist}
// //           >
// //             <i className="bi bi-heart"></i> Yêu thích
// //           </a>
// //         </div>
// //       </div>

// //       <div className="mt-5">
// //         <h4 className="fw-bold">Đánh giá sản phẩm</h4>
// //         <div>
// //           {reviews && reviews.length > 0 ? (
// //             reviews.map((review) => (
// //               <div key={review.id} className="border-bottom pb-3 mb-3">
// //                 <p><strong>{review.taiKhoan?.ten || 'Tên người dùng không có'}</strong> ({review.sao} sao)</p>
// //                 <p>{review.noiDung}</p>
// //                 <p><em>{formatDate(review.ngayDanhgia)}</em></p>
// //               </div>
// //             ))
// //           ) : (
// //             <p>Chưa có đánh giá cho sản phẩm này.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetailForm;


// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { getProductById } from "../../api/sanPhamND";
// import { useParams } from "react-router-dom";
// import { themVaoGiohang } from "../../api/giohang";
// import { addFavorite } from "../../api/yeuthich";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const token = localStorage.getItem("token");

// export const getProductReviews = async (productId) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/danhgia/sanpham/${productId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching product reviews:", error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// const ProductDetailForm = () => {
//   const { id } = useParams();
//   const [productDetails, setProductDetails] = useState({});
//   const [reviews, setReviews] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [reviewContent, setReviewContent] = useState("");
//   const [rating, setRating] = useState(5);

//   const loadProductById = async (id) => {
//     try {
//       const response = await getProductById(id);
//       setProductDetails(response);
//     } catch (error) {
//       console.error("Lỗi khi tải sản phẩm:", error);
//     }
//   };

//   const loadReviews = async (productId) => {
//     try {
//       const danhGiaList = await getProductReviews(productId);
//       setReviews(danhGiaList);
//     } catch (error) {
//       console.error("Lỗi khi tải đánh giá sản phẩm:", error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       loadProductById(id);
//       loadReviews(id);
//     }
//   }, [id]);

//   const productImageUrl = productDetails.hinh
//     ? `http://localhost:8080${productDetails.hinh}`
//     : "/path/to/default-image.jpg";

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Chưa có thông tin';
//     const date = new Date(dateString);
//     return isNaN(date) ? 'Ngày không hợp lệ' : date.toLocaleDateString();
//   };

//   const checkValue = (value, defaultValue) => {
//     return value && value !== "null" && value !== "undefined" ? value : defaultValue;
//   };

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     console.log("Sản phẩm đã được thêm vào giỏ hàng", productDetails, "Số lượng:", quantity);
//   };

//   const handleQuantityChange = (e) => {
//     const value = e.target.value;
//     if (value >= 1) {
//       setQuantity(value);
//     }
//   };

//   const handleAddToWishlist = async () => {
//     try {
//       await addFavorite(productDetails.id);
//       alert("Đã thêm sản phẩm vào danh sách yêu thích!");
//     } catch (error) {
//       alert("Vui lòng đăng nhập để thêm vào yêu thích.");
//     }
//   };

//   const handleThemVaoGiohang = async (productId, quantity) => {
//     try {
//       await themVaoGiohang(productId, quantity);
//       toast.success("Đã thêm sản phẩm vào giỏ hàng!");
//     } catch (error) {
//       console.error("Lỗi khi thêm vào giỏ hàng:", error);
//       toast.error("Sản phẩm vượt quá số lượng cho phép!");
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center mb-4">Chi Tiết Sản Phẩm</h2>
//       <div className="row">
//         <div className="col-md-5">
//           <img src={productImageUrl} className="img-fluid rounded" alt={productDetails.ten} />
//         </div>
//         <div className="col-md-7">
//           <h3 className="fw-bold">{checkValue(productDetails.ten, 'Không có tên sản phẩm')}</h3>
//           <p className="text-danger fw-bold fs-4">{checkValue(productDetails.gia, 'Chưa có giá')} ₫</p>
//           <p><strong>Danh mục:</strong> {checkValue(productDetails.danhMuc, 'Không có thông tin')}</p>
//           <p><strong>Kích thước:</strong> {checkValue(productDetails.kichthuoc, 'Không có thông tin')}</p>
//           <p><strong>Mô tả:</strong></p>
//           <p>{checkValue(productDetails.mota, 'Không có mô tả sản phẩm.')}</p>
//           <p><strong>Số lượng trong kho:</strong> {checkValue(productDetails.soluong, 'Chưa cập nhật')}</p>
//           <p><strong>Ngày tạo:</strong> {formatDate(productDetails.ngayTao)}</p>

//           <form onSubmit={handleAddToCart}>
//             <div className="mb-2">
//               <label htmlFor="soLuong" className="form-label">Số lượng</label>
//               <input
//                 type="number"
//                 name="soLuong"
//                 value={quantity}
//                 min="1"
//                 id="soLuong"
//                 className="form-control"
//                 style={{ width: "80px", display: "inline-block" }}
//                 onChange={handleQuantityChange}
//               />
//             </div>
//             <button
//               className="btn btn-success"
//               type="button"
//               onClick={() => handleThemVaoGiohang(productDetails.id, quantity)}
//             >
//               Thêm vào Giỏ Hàng
//             </button>
//           </form>

//           <a
//             href="#"
//             className="btn btn-outline-danger mt-2"
//             onClick={handleAddToWishlist}
//           >
//             <i className="bi bi-heart"></i> Yêu thích
//           </a>
//         </div>
//       </div>

//       <div className="mt-5">
//         <h4 className="fw-bold">Đánh giá sản phẩm</h4>
//         <div>
//           {reviews && reviews.length > 0 ? (
//             reviews.map((review) => (
//               <div key={review.id} className="border-bottom pb-3 mb-3">
//                 <p><strong>{review.taiKhoan ? review.taiKhoan.ten : 'Tên người dùng không có'}</strong> ({review.sao} sao)</p>
//                 <p>{review.noiDung}</p>
//                 <p><em>{formatDate(review.ngayDanhgia)}</em></p>
//               </div>
//             ))
//           ) : (
//             <p>Chưa có đánh giá cho sản phẩm này.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailForm;


import axios from "axios";
import React, { useState, useEffect } from "react";
import { getProductById } from "../../api/sanPhamND";
import { useParams } from "react-router-dom";
import { themVaoGiohang } from "../../api/giohang";
import { addFavorite } from "../../api/yeuthich";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const token = localStorage.getItem("token");

export const getProductReviews = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/danhgia/sanpham/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product reviews:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const ProductDetailForm = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(5);

  const loadProductById = async (id) => {
    try {
      const response = await getProductById(id);
      setProductDetails(response);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  const loadReviews = async (productId) => {
    try {
      const danhGiaList = await getProductReviews(productId);
      setReviews(danhGiaList);
    } catch (error) {
      console.error("Lỗi khi tải đánh giá sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (id) {
      loadProductById(id);
      loadReviews(id);
    }
  }, [id]);

  const productImageUrl = productDetails.hinh
    ? `http://localhost:8080${productDetails.hinh}`
    : "/path/to/default-image.jpg";

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa có thông tin';
    const date = new Date(dateString);
    return isNaN(date) ? 'Ngày không hợp lệ' : date.toLocaleDateString();
  };

  const checkValue = (value, defaultValue) => {
    return value && value !== "null" && value !== "undefined" ? value : defaultValue;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log("Sản phẩm đã được thêm vào giỏ hàng", productDetails, "Số lượng:", quantity);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addFavorite(productDetails.id);
      alert("Đã thêm sản phẩm vào danh sách yêu thích!");
    } catch (error) {
      alert("Vui lòng đăng nhập để thêm vào yêu thích.");
    }
  };

  const handleThemVaoGiohang = async (productId, quantity) => {
    try {
      await themVaoGiohang(productId, quantity);
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Sản phẩm vượt quá số lượng cho phép!");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Chi Tiết Sản Phẩm</h2>
      <div className="row">
        <div className="col-md-5">
          <img src={productImageUrl} className="img-fluid rounded" alt={productDetails.ten} />
        </div>
        <div className="col-md-7">
          <h3 className="fw-bold">{checkValue(productDetails.ten, 'Không có tên sản phẩm')}</h3>
          <p className="text-danger fw-bold fs-4">{checkValue(productDetails.gia, 'Chưa có giá')} ₫</p>
          <p><strong>Danh mục:</strong> {checkValue(productDetails.danhMuc, 'Không có thông tin')}</p>
          <p><strong>Kích thước:</strong> {checkValue(productDetails.kichthuoc, 'Không có thông tin')}</p>
          <p><strong>Mô tả:</strong></p>
          <p>{checkValue(productDetails.mota, 'Không có mô tả sản phẩm.')}</p>
          <p><strong>Số lượng trong kho:</strong> {checkValue(productDetails.soluong, 'Chưa cập nhật')}</p>
          <p><strong>Ngày tạo:</strong> {formatDate(productDetails.ngayTao)}</p>

          <form onSubmit={handleAddToCart}>
            <div className="mb-2">
              <label htmlFor="soLuong" className="form-label">Số lượng</label>
              <input
                type="number"
                name="soLuong"
                value={quantity}
                min="1"
                id="soLuong"
                className="form-control"
                style={{ width: "80px", display: "inline-block" }}
                onChange={handleQuantityChange}
              />
            </div>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => handleThemVaoGiohang(productDetails.id, quantity)}
            >
              Thêm vào Giỏ Hàng
            </button>
          </form>

          <a
            href="#"
            className="btn btn-outline-danger mt-2"
            onClick={handleAddToWishlist}
          >
            <i className="bi bi-heart"></i> Yêu thích
          </a>
        </div>
      </div>

      <div className="mt-5">
  <h4>Đánh Giá Sản Phẩm</h4>
  {reviews.length === 0 ? (
    <p>Chưa có đánh giá nào cho sản phẩm này.</p>
  ) : (
    reviews.map((review, index) => (
      <div key={index} className="border rounded p-3 mb-3">
        <p className="fw-bold mb-1">
          {review.tenNguoiDung || `Người dùng #${review.taiKhoanId}`}{" "}
          {[...Array(review.sao)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="text-warning me-1" />
          ))}
        </p>
        <p className="fst-italic mb-1">"{review.danhgia}"</p>
        <p className="text-muted">{formatDate(review.ngayDanhgia)}</p>
      </div>
    ))
  )}
</div>


    </div>
  );
};

export default ProductDetailForm;
