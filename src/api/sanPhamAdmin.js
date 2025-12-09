import axios from "axios";

const API_BASE_PRODUCT = "http://localhost:8080/api/admin/sanpham";
const API_BASE_CATEGORY = "http://localhost:8080/api/admin/categories";

// 🟢 Lấy tất cả sản phẩm với tìm kiếm
export const fetchProducts = (keyword = "") =>
  axios.get(`${API_BASE_PRODUCT}/search?name=${keyword}`);


// 🟢 Lấy sản phẩm theo ID
export const fetchProductById = (id) =>
  axios.get(`${API_BASE_PRODUCT}/${id}`);

// 🟢 Thêm mới sản phẩm
export const createProduct = (data) => {
  const formData = new FormData();
  formData.append("ten", data.ten);
  formData.append("gia", data.gia);
  formData.append("kichthuoc", data.kichthuoc);
  formData.append("soluong", data.soluong);
  formData.append("mota", data.mota);
  formData.append("status", data.status);
  formData.append("categoryId", data.categoryId);
  if (data.file) {
    formData.append("file", data.file);
  }
  return axios.post(`${API_BASE_PRODUCT}`, formData);
};

// 🟢 Cập nhật sản phẩm
export const updateProduct = (id, data) => {
  const formData = new FormData();
  formData.append("ten", data.ten);
  formData.append("gia", data.gia);
  formData.append("kichthuoc", data.kichthuoc);
  formData.append("soluong", data.soluong);
  formData.append("mota", data.mota);
  formData.append("status", data.status);
  formData.append("categoryId", data.categoryId);
  if (data.file) {
    formData.append("file", data.file);
  }
  return axios.put(`${API_BASE_PRODUCT}/${id}`, formData);
};


// 🟢 Lấy tất cả danh mục
export const fetchCategories = (keyword = "") =>
  axios.get(`${API_BASE_CATEGORY}?keyword=${keyword}`);

// 🟢 Chuyển trạng thái sản phẩm (Còn hàng/Ngừng bán)
export const toggleProductStatus = (id) => {
  return axios.post(`${API_BASE_PRODUCT}/toggle-status/${id}`);
};
