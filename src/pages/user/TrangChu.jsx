import React, { useEffect, useState } from "react";
import { getTop8NewestProducts } from "../../api/sanPhamND"; // Cập nhật đúng đường dẫn file API nếu khác
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng

const TrangChu = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Khởi tạo navigate

  // Lấy top 8 sản phẩm khi component được mount
  useEffect(() => {
    const loadTop8 = async () => {
      try {
        const data = await getTop8NewestProducts(); // Gọi API để lấy top 8 sản phẩm
        setProducts(data); // Lưu danh sách sản phẩm vào state
      } catch (error) {
        console.error("Lỗi khi tải top 8 sản phẩm:", error);
      }
    };
    loadTop8();
  }, []); // Chỉ chạy một lần khi component mount

  const handleProductDetailClick = (id) => {
    // Điều hướng đến trang chi tiết sản phẩm và truyền ID sản phẩm
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Chào mừng đến với Shop Thời Trang</h1>
      <p className="text-center">Khám phá các sản phẩm thời trang mới nhất của chúng tôi!</p>

      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={product.hinh} // Sử dụng ảnh sản phẩm từ API
                alt={product.ten}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.ten}</h5>
                <p className="card-text text-danger fw-bold">{product.gia} ₫</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleProductDetailClick(product.id)} // Điều hướng đến chi tiết sản phẩm
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default TrangChu;
