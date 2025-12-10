import React, { useState, useEffect } from "react";
import { getProductById } from "../../api/sanPhamND"; // Import hàm getProductById
import { useParams } from "react-router-dom"; // Import useParams để lấy id từ URL

const ProductDetailForm = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Hàm load sản phẩm từ API
  const loadProductById = async (id) => {
    try {
      const response = await getProductById(id);
      console.log(response); 
      setProductDetails(response);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (id) {
      loadProductById(id); // Gọi hàm load sản phẩm khi id thay đổi
    }
  }, [id]); // Khi id thay đổi, gọi lại hàm load sản phẩm

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

  const handleAddToWishlist = () => {
    console.log("Sản phẩm đã được thêm vào yêu thích", productDetails);
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
            <button type="submit" className="btn btn-success">
              Thêm vào giỏ hàng
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
    </div>
  );
};

export default ProductDetailForm;
