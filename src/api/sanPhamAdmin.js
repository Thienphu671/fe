import axios from "axios";

const API_BASE_PRODUCT = "http://localhost:8080/api/admin/sanpham";
const API_BASE_CATEGORY = "http://localhost:8080/api/admin/categories";

// 🔐 Hàm thêm Authorization header
const authHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("📦 Sử dụng token:", token); // DEBUG: xem token đang dùng
  if (!token) {
    console.warn("⚠️ Không tìm thấy token trong localStorage");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🟢 Lấy tất cả sản phẩm với tìm kiếm
export const fetchProducts = (keyword = "") =>
  axios.get(`${API_BASE_PRODUCT}?keyword=${keyword}`, authHeaders());

// 🟢 Lấy sản phẩm theo ID
export const fetchProductById = (id) =>
  axios.get(`${API_BASE_PRODUCT}/${id}`, authHeaders());

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

  return axios.post(`${API_BASE_PRODUCT}`, formData, authHeaders())
    .then(response => response.data)
    .catch(error => {
      console.error("❌ Lỗi khi tạo sản phẩm:", error);
      if (error.response) {
        console.error("🧾 Response error:", error.response.data);
        throw new Error(error.response.data.message || "Đã xảy ra lỗi khi tạo sản phẩm.");
      } else if (error.request) {
        console.error("📡 Không nhận phản hồi từ server:", error.request);
        throw new Error("Không nhận phản hồi từ server.");
      } else {
        console.error("⚙️ Lỗi khi gửi request:", error.message);
        throw new Error(error.message);
      }
    });
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

  return axios.put(`${API_BASE_PRODUCT}/${id}`, formData, authHeaders())
    .then(response => response.data)
    .catch(error => {
      console.error("❌ Lỗi khi cập nhật sản phẩm:", error);
      throw error;
    });
};

// 🟢 Xóa sản phẩm
export const deleteProduct = (id) =>
  axios.delete(`${API_BASE_PRODUCT}/${id}`, authHeaders())
    .then(res => res.data)
    .catch(error => {
      console.error("❌ Lỗi khi xóa sản phẩm:", error);
      throw error;
    });

// 🟢 Lấy tất cả danh mục
export const fetchCategories = (keyword = "") =>
  axios.get(`${API_BASE_CATEGORY}?keyword=${keyword}`, authHeaders());

// 🟢 Chuyển trạng thái sản phẩm (Còn hàng / Ngừng bán)
export const toggleProductStatus = (id) =>
  axios.post(`${API_BASE_PRODUCT}/toggle-status/${id}`, null, authHeaders())
    .then(response => response.data)
    .catch(error => {
      console.error("❌ Lỗi khi chuyển trạng thái sản phẩm:", error);
      throw error;
    });
