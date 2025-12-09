import axios from "axios";

const API_BASE = "http://localhost:8080/api/orders";

// 🔐 Hàm tự động thêm token vào headers
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// === Đơn hàng ===

// Lấy danh sách tất cả đơn hàng (sắp xếp theo ngày giảm dần từ server)
export const fetchAllOrders = async () => {
  try {
    const response = await axios.get(API_BASE, authHeaders());
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Lấy chi tiết đơn hàng theo ID
export const fetchOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`, authHeaders());
    return response.data; // Trả về dữ liệu đơn hàng
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết đơn hàng với ID ${id}:`, error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Xác nhận đơn hàng
export const confirmOrder = async (id) => {
  try {
    const response = await axios.post(`${API_BASE}/confirm/${id}`, null, authHeaders());
    return response.data; // Trả về phản hồi từ API
  } catch (error) {
    console.error(`Lỗi khi xác nhận đơn hàng với ID ${id}:`, error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Hủy đơn hàng (chỉ khi chưa xác nhận)
export const cancelOrder = async (id) => {
  try {
    const response = await axios.post(`${API_BASE}/cancel/${id}`, null, authHeaders());
    return response.data; // Trả về phản hồi từ API
  } catch (error) {
    console.error(`Lỗi khi hủy đơn hàng với ID ${id}:`, error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
