import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/sanPhamND"; // Import getProducts từ api.js
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Khởi tạo navigate

  // Lấy danh sách sản phẩm khi component được mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getProducts("", null, "asc", 0, 8); // Gọi API để lấy danh sách sản phẩm
        setProducts(response.products); // Lưu danh sách sản phẩm vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm", error);
      }
    };
    fetchAllProducts();
  }, []); // UseEffect chỉ chạy một lần khi component mount

  const handleProductDetailClick = (id) => {
    // Điều hướng đến trang chi tiết sản phẩm và truyền ID sản phẩm
    navigate(`/product/${id}`);
  };

  return (
    <div className="container">
      <h2 className="section-title text-center">Danh Sách Sản Phẩm</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100">
              <img
                src={`http://localhost:8080${product.hinh}`}
                className="card-img-top"
                height="55%"
                alt={product.ten}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.ten}</h5>
                <p className="card-text text-danger fw-bold">{product.gia} ₫</p>
                <button
                  className="btn btn-primary btn-detail"
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

export default ProductList;
