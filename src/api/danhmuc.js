import axios from "axios";

const API_BASE = "http://localhost:8080/api/admin/categories";

// Lấy tất cả danh mục có tìm kiếm
export const fetchCategories = (keyword = "") =>
  axios.get(`${API_BASE}?keyword=${keyword}`);

// Lấy theo ID
export const fetchCategoryById = (id) =>
  axios.get(`${API_BASE}/${id}`);

// Thêm mới danh mục (đúng endpoint /add của backend)
export const createCategory = (data) => {
  const formData = new FormData();
  formData.append("ten", data.ten);
  formData.append("status", data.status);
  return axios.post(`${API_BASE}/add`, formData);
};

// Cập nhật danh mục
export const updateCategory = (id, data) => {
  const formData = new FormData();
  formData.append("ten", data.ten);
  formData.append("status", data.status);
  return axios.put(`${API_BASE}/${id}`, formData);
};

// Xoá danh mục
export const deleteCategory = (id) =>
  axios.delete(`${API_BASE}/${id}`);

// src/api/danhmuc.js

export const toggleCategoryStatus = (id) =>
    axios.put(`${API_BASE}/toggle-status/${id}`);
  