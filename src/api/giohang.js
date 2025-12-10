import axios from "axios";

// Địa chỉ backend cho giỏ hàng
const API_BASE = "http://localhost:8080/api/user/giohang";

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

// ===== API Giỏ Hàng =====

// Lấy giỏ hàng của người dùng
export const getGiohang = () =>
  axios.get(`${API_BASE}`, authHeaders())
    .catch((error) => {
      console.error("Lỗi khi lấy giỏ hàng: ", error);
      throw error;
    });

// Thêm sản phẩm vào giỏ hàng
export const themVaoGiohang = (sanphamId, soLuong) =>
  axios.post(
    `${API_BASE}/them`,
    null,
    {
      ...authHeaders(),
      params: { sanphamId, soLuong },
    }
  ).catch((error) => {
    console.error("Lỗi khi thêm vào giỏ hàng: ", error);
    throw error;
  });

// Cập nhật số lượng sản phẩm trong giỏ
export const capNhatSoLuong = (giohangId, soLuong) =>
  axios.post(
    `${API_BASE}/capnhat`,
    null,
    {
      ...authHeaders(),
      params: { giohangId, soLuong },
    }
  ).catch((error) => {
    console.error("Lỗi khi cập nhật số lượng: ", error);
    throw error;
  });

  export const xoaSanphamTrongGiohang = (sanphamId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }
  
    return axios.delete(`${API_BASE}/xoa/${sanphamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error("Lỗi khi xoá sản phẩm khỏi giỏ hàng: ", error.response || error);
      throw error;
    });
  };
  

// Lấy toàn bộ giỏ hàng (nếu khác với getGiohang)
export const getAllGiohang = () =>
  axios.get(`${API_BASE}/all`, authHeaders())
    .catch((error) => {
      console.error("Lỗi khi lấy toàn bộ giỏ hàng: ", error);
      throw error;
    });
