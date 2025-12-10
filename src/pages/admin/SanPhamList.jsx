import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from '../../api/sanPhamAdmin';
import { fetchCategories } from '../../api/danhmuc';
import { toggleProductStatus } from '../../api/sanPhamAdmin'; // Giả sử bạn đã có hàm này để cập nhật trạng thái sản phẩm

const SanPhamList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  // Hàm lấy dữ liệu sản phẩm
  const fetchData = async (searchKeyword = "") => {
    try {
      const res = await fetchProducts(searchKeyword); // Giả sử API nhận từ khóa tìm kiếm
      console.log("Dữ liệu sản phẩm đã lấy:", res.data.products);

      // Kiểm tra và cập nhật trạng thái sản phẩm nếu số lượng = 0
      const updatedProducts = res.data.products.map((product) => {
        if (product.soluong === 0 && product.status !== 1) {
          // Nếu số lượng = 0 và trạng thái không phải "Hết hàng", gọi toggleProductStatus để thay đổi trạng thái
          toggleProductStatus(product.id, 1); // Cập nhật trạng thái thành "Hết hàng"
        }
        return product;
      });

      setProducts(updatedProducts || []);
    } catch (err) {
      console.error("Lỗi khi load sản phẩm:", err);
    }
  };

  // Hàm lấy dữ liệu danh mục
  const fetchCategoriesData = async () => {
    try {
      const res = await fetchCategories();
      if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories);  // Cập nhật state categories nếu dữ liệu hợp lệ
      } else {
        console.error("Dữ liệu danh mục không hợp lệ:", res.data);
      }
    } catch (err) {
      console.error("Lỗi khi load danh mục:", err);
    }
  };

  // Hàm tìm kiếm sản phẩm
  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(keyword); // Gọi fetchData với từ khóa tìm kiếm
  };

  // Hàm xóa sản phẩm hoặc chuyển trạng thái
  const toggleStatus = async (id, currentStatus) => {
    if (window.confirm("Bạn có chắc muốn thay đổi trạng thái sản phẩm này?")) {
      try {
        // Chuyển trạng thái từ 0 thành 2 hoặc ngược lại
        const newStatus = currentStatus === 0 ? 2 : (currentStatus === 2 ? 0 : currentStatus);
        await toggleProductStatus(id, newStatus);  // Cập nhật trạng thái sản phẩm
        fetchData(); // Tải lại dữ liệu sản phẩm sau khi thay đổi trạng thái
      } catch (err) {
        console.error("Lỗi thay đổi trạng thái:", err);
      }
    }
  };

  // Hàm tự động gọi khi trang được tải
  useEffect(() => {
    fetchData(); // Tải dữ liệu sản phẩm lúc đầu
    fetchCategoriesData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sản phẩm</h2>
      <a href="/admin/sanpham/form" className="btn btn-success mb-3">Thêm sản phẩm</a>

      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật từ khóa tìm kiếm khi người dùng gõ
          />
          <button className="btn btn-primary" type="submit">Tìm kiếm</button>
        </div>
      </form>

      {!products.length ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Hình</th>
              <th>Giá</th>
              <th>Kích thước</th>
              <th>Số lượng</th>
              <th>Danh mục</th>
              <th>Ngày tạo</th>
              <th>Mô tả</th>
              <th>Hành động</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.ten || 'Chưa có tên'}</td>
                <td>
                  {product.hinh ? (
                    <img
                      src={`http://localhost:8080/uploads/${product.hinh}`}
                      alt={product.ten}
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    <p>Không có hình ảnh</p>
                  )}
                </td>
                <td>{product.gia}</td>
                <td>{product.kichthuoc}</td>
                <td>{product.soluong}</td>
                <td>{product.danhMuc || 'Không có danh mục'}</td>
                <td>{product.createdAt}</td>
                <td>{product.mota}</td>
                <td>
                  {/* Nút sửa sản phẩm */}
                  <a href={`/admin/sanpham/form?id=${product.id}`} className="btn btn-warning btn-sm">
                    Sửa
                  </a>
                </td>

                <td>
                  {/* Nút chuyển đổi trạng thái trong cột Trạng thái */}
                  <button
                    className={`btn btn-sm ${product.status === 0 ? 'btn-success' : product.status === 2 ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => toggleStatus(product.id, product.status)}
                  >
                    {product.status === 0 ? 'Còn hàng' : product.status === 2 ? 'Ngừng bán' : 'Hết hàng'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SanPhamList;
