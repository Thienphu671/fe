import React, { useEffect, useState } from "react";
import { createProduct, updateProduct, fetchCategories, fetchProductById } from '../../api/sanPhamAdmin'; // Import API functions

const SanPhamForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");


  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const [product, setProduct] = useState({
    ten: "",
    gia: "",
    soluong: "",
    kichthuoc: "S",
    mota: "",
    categoryId: "",
    hinh: "",
  });
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch categories from API
  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      console.log("API response:", res.data); // Kiểm tra dữ liệu trả về
      const categoriesData = Array.isArray(res.data?.categories) ? res.data.categories : [];
      setCategories(categoriesData.filter((c) => c.status === 0));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };
  
  // Fetch product data if editing an existing product
  const loadProduct = async () => {
    if (id) {
      try {
        const res = await fetchProductById(id); // Fetch product by ID
        const data = res.data;
        setProduct({
          id: data.id,
          ten: data.ten,
          gia: data.gia,
          soluong: data.soluong,
          kichthuoc: data.kichthuoc,
          mota: data.mota,
          categoryId: data.danhMucId,
          hinh: data.hinh,
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
  };

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
    if (file) formData.append("file", file);

    try {
      if (id) {
        await updateProduct(id, formData); // Update product
      } else {
        await createProduct(formData); // Create new product
      }
      window.location.href = "/admin/sanpham";
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrorMessage("Đã xảy ra lỗi!");
      }
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
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.ten}
              </option>
            ))}
          </select>
          {errors.category && <div className="error-message">{errors.category}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Lưu</button>
        <a href="/admin/sanpham" className="btn btn-secondary ms-2">Hủy</a>
      </form>
    </div>
  );
};

export default SanPhamForm;
