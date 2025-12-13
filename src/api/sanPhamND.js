import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Hàm để lấy danh sách sản phẩm với các tham số phân trang, tìm kiếm, và sắp xếp
export const getProducts = async (keyword = "", category = null, sort = "", page = 0, size = 8) => {
    try {
        const token = localStorage.getItem("token");  // Lấy token từ localStorage

        // Kiểm tra nếu không có token
        if (!token) {
            throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
        }

        const response = await axios.get(`${API_BASE_URL}/sanPhamND`, {
            params: {
                keyword: keyword,
                category: category,
                sort: sort,
                page: page,
                size: size,
            },
            headers: {
                "Authorization": `Bearer ${token}`, // Thêm token vào header
            },
        });

        if (response.status === 200) {
            return response.data;  // Dữ liệu trả về từ API
        } else {
            throw new Error(`Lỗi: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Có lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm để lấy thông tin sản phẩm theo ID
export const getProductById = async (id) => {
    try {
        const token = localStorage.getItem("token");  // Lấy token từ localStorage

        if (!token) {
            throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
        }

        const response = await axios.get(`${API_BASE_URL}/sanPhamND/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`, // Thêm token vào header
            },
        });

        if (response.status === 200) {
            console.log("Sản phẩm nhận được: ", response.data);  // In ra thông tin sản phẩm
            return response.data;  // Dữ liệu trả về từ API
        } else {
            throw new Error(`Lỗi: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Có lỗi khi gọi API:", error);
        throw error;
    }
};

// === THÊM MỚI: LẤY DANH SÁCH DANH MỤC ===
export const getCategories = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
        }

        const response = await axios.get(`${API_BASE_URL}/danhMuc`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            // Giả sử backend trả về { categories: [...] } hoặc trực tiếp là mảng
            const categories = response.data.categories || response.data;
            console.log("Danh mục nhận được:", categories);
            return { categories }; // Trả về định dạng giống fetchCategories ở admin
        } else {
            throw new Error(`Lỗi khi lấy danh mục: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Có lỗi khi lấy danh mục:", error);
        throw error;
    }
};

// Hàm để tải danh sách sản phẩm
export const loadProducts = async () => {
    const page = 0; // Trang đầu tiên
    const size = 8; // Số sản phẩm mỗi trang
    const keyword = ""; // Tìm kiếm sản phẩm theo từ khóa (nếu có)
    const category = null; // Lọc sản phẩm theo danh mục (nếu có)
    const sort = "asc"; // Sắp xếp sản phẩm theo giá (asc/desc)

    try {
        const data = await getProducts(keyword, category, sort, page, size);

        // Kiểm tra xem có dữ liệu sản phẩm hay không
        if (!data || !data.products || data.products.length === 0) {
            console.error("Không có sản phẩm để hiển thị.");
            return;
        }

        // Xử lý dữ liệu và hiển thị sản phẩm
        const products = data.products.map(product => {
            // Chỉnh sửa trường hinh để trả về URL đầy đủ
            const productWithImageUrl = {
                ...product,
                hinh: `http://localhost:8080${product.hinh}` // Thêm URL đầy đủ vào trường hinh
            };
            return productWithImageUrl;
        });

        console.log(products); // Hiển thị dữ liệu sản phẩm
    } catch (error) {
        console.error("Không thể tải sản phẩm", error);
    }
};

// Hàm lấy sản phẩm theo ID
export const loadProductById = async (productId) => {
    try {
        console.log("Gọi sản phẩm theo ID:", productId);  // Kiểm tra ID gọi API
        const product = await getProductById(productId);

        if (!product) {
            console.error("Không tìm thấy sản phẩm với ID:", productId);
            return;
        }

        // Chỉnh sửa trường hinh để trả về URL đầy đủ
        const productWithImageUrl = {
            ...product,
            hinh: `http://localhost:8080${product.hinh}` // Thêm URL đầy đủ vào trường hinh
        };

        console.log("Sản phẩm với URL hình ảnh đầy đủ:", productWithImageUrl); // Hiển thị thông tin sản phẩm
    } catch (error) {
        console.error("Không thể tải sản phẩm theo ID", error);
    }
};

// Ví dụ gọi hàm lấy sản phẩm theo ID từ một ID động, có thể lấy từ URL hoặc sự kiện của người dùng
const handleProductDetailClick = (productId) => {
    console.log("Nhấn vào sản phẩm ID:", productId);  // In ra ID sản phẩm khi người dùng nhấn
    loadProductById(productId);
};

// Giả sử có 1 button trên UI mà người dùng click để lấy sản phẩm theo ID
handleProductDetailClick(33);  // Thử gọi với ID là 33