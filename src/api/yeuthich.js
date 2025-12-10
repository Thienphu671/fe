// src/api/favoriteApi.js
import axios from "axios";

// Địa chỉ backend
const API_BASE = "http://localhost:8080/api/favorites";

// Hàm tự động thêm token vào headers
const authHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ===== API Yêu Thích =====

// Lấy danh sách sản phẩm yêu thích
export const getFavorites = () =>
  axios.get(`${API_BASE}`, authHeaders())
    .catch((error) => {
      console.error("Lỗi khi lấy danh sách yêu thích: ", error);
      throw error;
    });

// Thêm sản phẩm vào yêu thích
export const addFavorite = (productId) =>
  axios.post(`${API_BASE}/add/${productId}`, null, authHeaders())
    .catch((error) => {
      console.error("Lỗi khi thêm sản phẩm vào yêu thích: ", error);
      throw error;
    });

// Xoá sản phẩm khỏi yêu thích
export const removeFavorite = (productId) =>
  axios.delete(`${API_BASE}/remove/${productId}`, authHeaders())
    .catch((error) => {
      console.error("Lỗi khi xoá sản phẩm khỏi yêu thích: ", error);
      throw error;
    });
