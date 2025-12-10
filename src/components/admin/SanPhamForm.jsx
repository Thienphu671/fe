import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ React Router
import Decimal from "decimal.js"; // Import thư viện Decimal.js
import { createProduct, fetchCategories, fetchProductById, updateProduct } from '../../api/sanPhamAdmin'; // Import API functions

const SanPhamForm = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const [product, setProduct] = useState({
    ten: "",
    gia: "",
    soluong: "",
    kichthuoc: "S",
    mota: "",
    categoryId: "",  // Đảm bảo lưu id của danh mục
    hinh: "",
  });
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Lấy danh mục từ API
  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      if (res.data && Array.isArray(res.data.categories)) {
        const filteredCategories = res.data.categories.filter((category) => category.status === 0);
        setCategories(filteredCategories); 
      } else {
        console.error("Dữ liệu trả về không chứa thuộc tính 'categories' hoặc không phải mảng:", res.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Lấy sản phẩm theo ID khi sửa sản phẩm
  useEffect(() => {
    loadCategories();
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id) {
      try {
        const res = await fetchProductById(id);
        const data = res.data.product; // Truy cập đúng vào đối tượng sản phẩm
        console.log("Sản phẩm đã lấy:", data); // Kiểm tra dữ liệu trả về
        setProduct({
          id: data.id || "",
          ten: data.ten || "",
          gia: data.gia || "",
          soluong: data.soluong || "",
          kichthuoc: data.kichthuoc || "S", // Mặc định "S" nếu không có
          mota: data.mota || "",
          categoryId: data.danhMuc || "", // Sử dụng danhMuc thay vì danhMucId
          hinh: data.hinh || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
  };
  
  
  

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Xử lý đặc biệt với giá
    if (name === 'gia') {
      value = new Decimal(value).toString();  // Chuyển đổi giá trị thành Decimal
    }

    setProduct({ ...product, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.ten) newErrors.ten = "Tên sản phẩm không được để trống";
    if (!product.gia || product.gia <= 0) newErrors.gia = "Giá phải lớn hơn 0";
    if (!product.soluong || product.soluong <= 0) newErrors.soluong = "Số lượng phải lớn hơn 0";
    if (!product.mota) newErrors.mota = "Mô tả không được để trống";
    if (!product.categoryId) newErrors.category = "Vui lòng chọn danh mục";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const formData = {
      ten: product.ten,
      gia: product.gia,
      kichthuoc: product.kichthuoc,
      soluong: product.soluong,
      mota: product.mota,
      status: 0,
      categoryId: product.categoryId,
      file: file,
    };
  
    try {
      let res;
      if (id) {
        res = await updateProduct(id, formData); // Cập nhật sản phẩm nếu có ID
      } else {
        res = await createProduct(formData); // Thêm mới sản phẩm nếu không có ID
      }
  
      console.log("Response:", res);
  
      if (res.data && res.data.message === (id ? "Cập nhật sản phẩm thành công!" : "Thêm sản phẩm thành công!")) {
        setErrorMessage(""); // Xóa thông báo lỗi cũ
        navigate("/admin/sanpham"); // Điều hướng đến trang danh sách sản phẩm
      } else {
        setErrorMessage("Có lỗi xảy ra khi thêm hoặc cập nhật sản phẩm.");
      }
    } catch (err) {
      console.error("Error submitting form:", err.response ? err.response.data : err.message);
      setErrorMessage("Lỗi khi gửi yêu cầu lên server.");
    }
  };
  
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{id ? "Sửa Sản phẩm" : "Thêm Sản phẩm"}</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="id" value={product.id || ""} />

        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="ten"
            value={product.ten}
            onChange={handleChange}
          />
          {errors.ten && <div className="error-message">{errors.ten}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Hình ảnh</label>
          <input type="hidden" name="hinh" value={product.hinh || ""} />
          <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
          {errors.hinh && <div className="error-message">{errors.hinh}</div>}
          {product.hinh && (
            <div className="mt-2">
              <p>Ảnh hiện tại:</p>
              <img
                src={`/uploads/${product.hinh}`}
                alt="Hình sản phẩm"
                className="img-thumbnail"
                style={{ maxWidth: "150px" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            name="gia"
            value={product.gia}
            onChange={handleChange}
          />
          {errors.gia && <div className="error-message">{errors.gia}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            className="form-control"
            name="soluong"
            value={product.soluong}
            onChange={handleChange}
          />
          {errors.soluong && <div className="error-message">{errors.soluong}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Kích thước</label>
          <select
            name="kichthuoc"
            className="form-select"
            value={product.kichthuoc}
            onChange={handleChange}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="mota"
            value={product.mota}
            onChange={handleChange}
          />
          {errors.mota && <div className="error-message">{errors.mota}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            name="categoryId"
            className="form-select"
            value={product.categoryId}
            onChange={handleChange}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.ten}
              </option>
            ))}
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Cập nhật" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default SanPhamForm;
