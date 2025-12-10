import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/danhgia/all")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.error("Lỗi khi lấy đánh giá:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Danh Sách Đánh Giá</h2>

      <div className="reviews">
        {reviews.length > 0 ? (
          <ul className="list-group">
            {reviews.map((review, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex align-items-center">
                  {/* Hiển thị ảnh sản phẩm */}
                  {review.sanPham && review.sanPham.hinhAnh && (
                    <img
                      src={`http://localhost:8080${review.sanPham.hinhAnh}`}
                      alt={review.sanPham.ten}
                      className="img-thumbnail me-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-product.png"; // fallback ảnh mặc định
                      }}
                    />
                  )}
                  <div>
                    <strong>
                      {review.tenNguoiDung && review.tenNguoiDung.trim() !== ""
                        ? review.tenNguoiDung
                        : `Người dùng #${review.taiKhoanId}`}
                    </strong>
                    <span className="ms-2">
                      {[...Array(review.sao)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className="text-warning me-1"
                        />
                      ))}
                    </span>
                  </div>
                </div>

                <div>
                  <small>{new Date(review.ngayDanhgia).toLocaleDateString()}</small>
                </div>

                <div>
                  <p>{review.danhgia}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
