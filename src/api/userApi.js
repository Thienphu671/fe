import axios from "axios";

const API_BASE = "http://localhost:8080/api/users";

// 🔐 Hàm tự động thêm token vào headers
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// === Người dùng ===

// Lấy danh sách người dùng (có thể lọc theo fullname hoặc email)
export const fetchUsers = (fullname, email) => {
  let url = `${API_BASE}`;
  const params = new URLSearchParams();
  if (fullname) params.append("fullname", fullname);
  if (email) params.append("email", email);
  if ([...params].length > 0) url += `?${params.toString()}`;
  return axios.get(url, authHeaders());
};

// Lấy thông tin người dùng theo ID
export const fetchUserById = (id) =>
  axios.get(`${API_BASE}/${id}`, authHeaders());

// Xóa người dùng theo ID
export const deleteUser = (id) =>
  axios.delete(`${API_BASE}/${id}`, authHeaders());

// Bật/tắt trạng thái kích hoạt người dùng
export const toggleUserActivation = (id) =>
  axios.post(`${API_BASE}/toggleActive/${id}`, null, authHeaders());

// Bật/tắt quyền admin cho người dùng
export const toggleUserAdmin = (id) =>
  axios.post(`${API_BASE}/toggleAdmin/${id}`, null, authHeaders());
