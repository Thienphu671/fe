

import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/sanPhamND";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sizeFilter, setSizeFilter] = useState("");
  const [sort, setSort] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 9;

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/categories");
      if (response.data && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API lấy danh mục:", error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const category = selectedCategory;
      const response = await getProducts(searchKeyword, category, sizeFilter, sort);
      const products = response.products || [];
      setAllProducts(products);
      setCurrentPage(0);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchKeyword, selectedCategory, sizeFilter, sort]);

  useEffect(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    setVisibleProducts(allProducts.slice(start, end));
  }, [allProducts, currentPage]);

  const totalPages = Math.ceil(allProducts.length / pageSize);
  const totalPagesArray = [...Array(totalPages).keys()];

  const handleSearch = () => {
    fetchProducts();
  };

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
  };

  const handleSortChange = (value) => {
    setSort((prev) => (prev === value ? "" : value));
  };

  const handleProductDetailClick = (id) => {
    navigate(`/product/${id}`);
  };

  const toggleShowCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2 className="section-title text-center mb-4">Danh Sách Sản Phẩm</h2>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 rounded">
            <div className="mb-4">
              <h6 className="fw-bold border-bottom pb-2">Danh mục</h6>
              {categories
                .slice(0, showAllCategories ? categories.length : 3)
                .map((cat) => (
                  <div className="form-check" key={cat.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={() => handleCategoryChange(cat.id)}
                    />
                    <label className="form-check-label ms-1">{cat.ten}</label>
                  </div>
                ))}
              <button className="btn btn-sm btn-link mt-2 px-0" onClick={toggleShowCategories}>
                {showAllCategories ? "Ẩn danh mục" : "Hiển thị tất cả"}
              </button>
            </div>
            <div>
              <h6 className="fw-bold border-bottom pb-2">Sắp xếp theo giá</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={sort === "asc"}
                  onChange={() => handleSortChange("asc")}
                />
                <label className="form-check-label ms-1">Giá tăng dần</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={sort === "desc"}
                  onChange={() => handleSortChange("desc")}
                />
                <label className="form-check-label ms-1">Giá giảm dần</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {visibleProducts.map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100">
                  <img
                    src={`http://localhost:8080${product.hinh}`}
                    className="card-img-top"
                    height="180"
                    alt={product.ten}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.ten}</h5>
                    <p className="card-text text-danger fw-bold">{product.gia} ₫</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleProductDetailClick(product.id)}
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-secondary me-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Trang Trước
            </button>
            {totalPagesArray.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn btn${currentPage === pageNumber ? " btn-primary" : " btn-outline-primary"} me-2`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber + 1}
              </button>
            ))}
            <button
              className="btn btn-secondary ms-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Trang Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
