import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  fetchCategories,
  fetchProductById,
  updateProduct,
} from "../../api/sanPhamAdmin";

const SanPhamForm = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

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
  const [touched, setTouched] = useState({}); // Theo dõi field đã nhập chưa

  const loadCategories = async () => {
    try {
      const res = await fetchCategories();
      if (res.data && Array.isArray(res.data.categories)) {
        const filteredCategories = res.data.categories.filter(
          (category) => category.status === 0
        );
        setCategories(filteredCategories);
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", res.data);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh mục:", err);
    }
  };

  const loadProduct = async () => {
    if (!id || categories.length === 0) return;
    try {
      const res = await fetchProductById(id);
      const data = res.data.product;
      console.log("Sản phẩm đã lấy:", data);

      const matchedCategory = categories.find((cat) => cat.ten === data.danhMuc);

      setProduct({
        ten: data.ten || "",
        gia: data.gia || "",
        soluong: data.soluong || "",
        kichthuoc: data.kichthuoc || "S",
        mota: data.mota || "",
        categoryId: matchedCategory ? matchedCategory.id : "",
        hinh: data.hinh || "",
      });
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && id) {
      loadProduct();
    }
  }, [categories, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setTouched({ ...touched, [name]: true });

    // Xóa lỗi của field khi người dùng nhập lại
    if (errors[name] || errors.category) {
      setErrors({ ...errors, [name]: undefined, category: undefined });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.ten.trim()) {
      newErrors.ten = "Tên sản phẩm không được để trống";
    }

    const giaNum = parseFloat(product.gia);
    if (!product.gia || isNaN(giaNum) || giaNum <= 0) {
      newErrors.gia = "Giá phải lớn hơn 0";
    }

    const slNum = parseFloat(product.soluong);
    if (!product.soluong || isNaN(slNum) || slNum <= 0) {
      newErrors.soluong = "Số lượng phải lớn hơn 0";
    }

    if (!product.mota.trim()) {
      newErrors.mota = "Mô tả không được để trống";
    }

    if (!product.categoryId) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Đánh dấu tất cả field đã touched khi submit
    setTouched({
      ten: true,
      gia: true,
      soluong: true,
      mota: true,
      categoryId: true,
    });

    if (!validateForm()) return;

    // Giữ nguyên cách gửi như code gốc của bạn
    const formData = {
      ten: product.ten,
      gia: product.gia,
      kichthuoc: product.kichthuoc,
      soluong: product.soluong,
      mota: product.mota,
      status: 0,
      categoryId: product.categoryId,
      file: file, // null nếu không chọn ảnh mới
    };

    // Quan trọng: khi update, luôn gửi hinh cũ để backend giữ ảnh nếu không có file mới
    if (id && product.hinh) {
      formData.hinh = product.hinh;
    }

    try {
      let res;
      if (id) {
        res = await updateProduct(id, formData);
      } else {
        res = await createProduct(formData);
      }

      // Kiểm tra message thành công (giống code gốc)
      const successMsg = id
        ? "Cập nhật sản phẩm thành công!"
        : "Thêm sản phẩm thành công!";

      if (res.data && res.data.message === successMsg) {
        setErrorMessage("");
        navigate("/admin/sanpham");
      } else {
        setErrorMessage("Có lỗi xảy ra khi thêm hoặc cập nhật sản phẩm.");
      }
    } catch (err) {
      console.error("Lỗi submit:", err.response ? err.response.data : err.message);
      setErrorMessage(
        err.response?.data?.message || "Lỗi khi gửi yêu cầu lên server."
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{id ? "Sửa Sản phẩm" : "Thêm Sản phẩm"}</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="ten"
            value={product.ten}
            onChange={handleChange}
          />
          {touched.ten && errors.ten && (
            <div className="text-danger">{errors.ten}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Hình ảnh</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
          
        </div>

        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            min="1"
            step="1"
            className="form-control"
            name="gia"
            value={product.gia}
            onChange={handleChange}
          />
          {touched.gia && errors.gia && (
            <div className="text-danger">{errors.gia}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            min="1"
            step="1"
            className="form-control"
            name="soluong"
            value={product.soluong}
            onChange={handleChange}
          />
          {touched.soluong && errors.soluong && (
            <div className="text-danger">{errors.soluong}</div>
          )}
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
            rows="4"
          />
          {touched.mota && errors.mota && (
            <div className="text-danger">{errors.mota}</div>
          )}
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
          {touched.categoryId && errors.category && (
            <div className="text-danger">{errors.category}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Cập nhật" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default SanPhamForm;