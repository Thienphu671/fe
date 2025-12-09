

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Lấy token từ localStorage
const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
    }
    return token;
};

// Tạo một instance axios chung cho tất cả các API
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Thêm token vào headers mặc định
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Hàm để lấy danh sách sản phẩm
export const getProducts = async (keyword = "", category = null, sizeFilter = null, sort = "", page = 0, size = 9) => {
    try {
        const response = await api.get("/sanPhamND", {
            params: {
                keyword,
                category,
                sizeFilter,
                sort,
                page,
                size
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Có lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm lấy thông tin sản phẩm theo ID
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/sanPhamND/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Lỗi: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Có lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm để tải danh sách sản phẩm
export const loadProducts = async () => {
    const page = 0; // Trang đầu tiên
    const size = 9; // Số lượng sản phẩm mỗi trang
    const keyword = ""; // Tìm kiếm theo từ khóa
    const category = null; // Loại sản phẩm
    const sort = "asc"; // Sắp xếp theo giá tăng dần

    try {
        // Gọi API để lấy danh sách sản phẩm
        const data = await getProducts(keyword, category, size, sort, page, size); // Điều chỉnh tham số size tại đây

        // Kiểm tra xem có sản phẩm trả về không
        if (!data || !data.products || data.products.length === 0) {
            console.error("Không có sản phẩm để hiển thị.");
            return;
        }

        // Thêm URL hình ảnh đầy đủ vào danh sách sản phẩm
        const products = data.products.map(product => ({
            ...product,
            hinh: `http://localhost:8080${product.hinh}`
        }));

        console.log("Sản phẩm trang 1:", products);
        console.log("Tổng số trang:", data.totalPages);
        console.log("Tổng số sản phẩm:", data.totalItems);
    } catch (error) {
        console.error("Không thể tải sản phẩm", error);
    }
};




// Hàm lấy sản phẩm theo ID
export const loadProductById = async (productId) => {
    try {
        const product = await getProductById(productId);
        if (!product) {
            console.error("Không tìm thấy sản phẩm với ID:", productId);
            return;
        }

        const productWithImageUrl = {
            ...product,
            hinh: `http://localhost:8080${product.hinh}`
        };

        console.log("Sản phẩm với URL hình ảnh đầy đủ:", productWithImageUrl);
    } catch (error) {
        console.error("Không thể tải sản phẩm theo ID", error);
    }
};

// Hàm để lấy 8 sản phẩm mới nhất có status = 0
export const getTop8NewestProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sanPhamND/top8`);
        if (response.status === 200) {
            return response.data.map(product => ({
                ...product,
                hinh: `http://localhost:8080${product.hinh}`
            }));
        } else {
            throw new Error(`Lỗi: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Lỗi khi lấy top 8 sản phẩm mới nhất:", error);
        throw error;
    }
};

export const getNewestProducts = async () => {
    try {
        const response = await api.get("/sanPhamND/moiNhat"); // gọi đúng endpoint
        if (response.status === 200) {
            return response.data.map(product => ({
                ...product,
                hinh: `http://localhost:8080${product.hinh}`
            }));
        } else {
            throw new Error(`Lỗi: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm mới nhất:", error);
        throw error;
    }
};