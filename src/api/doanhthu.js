import axios from "axios";

const API_BASE = "http://localhost:8080/api/admin/revenue";

// 🔐 Hàm tự động thêm token vào headers
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// === Doanh thu ===
export const fetchRevenueYears = () =>
  axios.get(`${API_BASE}/thongke`, authHeaders());

export const fetchRevenueMonths = (year) =>
  axios.get(`${API_BASE}/months/${year}`, authHeaders());

export const fetchRevenueDays = (year, month) =>
  axios.get(`${API_BASE}/days/${year}/${month}`, authHeaders());

export const fetchTotalRevenue = (year, month, day) => {
  let url = `${API_BASE}/total/${year}`;
  if (month) url += `/${month}`;
  if (day) url += `/${day}`;
  return axios.get(url, authHeaders());
};

export const fetchRevenueChart = (year, month, day) => {
  let url = `${API_BASE}/chart/${year}`;
  if (month) url += `/${month}`;
  if (day) url += `/${day}`;
  return axios.get(url, authHeaders());
};

// === Sản phẩm yêu thích ===
export const fetchFavoriteProducts = () =>
  axios.get(`${API_BASE}/sanphamyeuthich/data`, authHeaders());

export const fetchFavoriteProductsByYear = (year) =>
  axios.get(`${API_BASE}/most-favorite/${year}`, authHeaders());

export const fetchFavoriteProductsByMonth = (year, month) =>
  axios.get(`${API_BASE}/most-favorite/${year}/${month}`, authHeaders());

export const fetchFavoriteProductsByDay = (year, month, day) =>
  axios.get(`${API_BASE}/most-favorite/${year}/${month}/${day}`, authHeaders());

export const fetchFavoriteMonthsByYear = (year) =>
  axios.get(`${API_BASE}/most-favorite/available-months/${year}`, authHeaders());

export const fetchFavoriteDaysByMonth = (year, month) =>
  axios.get(`${API_BASE}/most-favorite/available-days/${year}/${month}`, authHeaders());

export const fetchFavoriteYear = () =>
  axios.get(`${API_BASE}/most-favorite/available-years`, authHeaders());

export const fetchFavoriteChart = (year, month, day) => {
  let url = `${API_BASE}/most-favorite/${year}`;
  if (month) url += `/${month}`;
  if (day) url += `/${day}`;
  return axios.get(url, authHeaders());
};

// === Sản phẩm bán chạy ===
export const fetchBestSellingProducts = () =>
  axios.get(`${API_BASE}/sanphambanchay/data`, authHeaders());

export const fetchBestSellingProductsByYear = (year) =>
  axios.get(`${API_BASE}/best-selling/${year}`, authHeaders());

export const fetchBestSellingProductsByMonth = (year, month) =>
  axios.get(`${API_BASE}/best-selling/${year}/${month}`, authHeaders());

export const fetchBestSellingProductsByDay = (year, month, day) =>
  axios.get(`${API_BASE}/best-selling/${year}/${month}/${day}`, authHeaders());

export const fetchBestSellingMonthsByYear = (year) =>
  axios.get(`${API_BASE}/best-selling/available-months/${year}`, authHeaders());

export const fetchBestSellingDaysByMonth = (year, month) =>
  axios.get(`${API_BASE}/best-selling/available-days/${year}/${month}`, authHeaders());

export const fetchBestSellingYear = () =>
  axios.get(`${API_BASE}/best-selling/available-years`, authHeaders());

export const fetchBestSellingChart = (year, month, day) => {
  let url = `${API_BASE}/best-selling/${year}`;
  if (month) url += `/${month}`;
  if (day) url += `/${day}`;
  return axios.get(url, authHeaders());
};
