import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct, toggleProductStatus } from '../../api/sanPhamAdmin';
import { fetchCategories } from '../../api/danhmuc';
import dayjs from "dayjs"; // Import dayjs

const SanPhamList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const fetchData = async (searchKeyword = "") => {
    try {
      const res = await fetchProducts(searchKeyword);
      const productsFromServer = res.data.products;
  
      const updateStatusPromises = productsFromServer.map((product) => {
        if (product.soluong === 0 && product.status !== 1) {
          return toggleProductStatus(product.id, 1); // Hết hàng
        } else if (product.soluong > 0 && product.status === 1) {
          return toggleProductStatus(product.id, 0); // Tự trở lại Còn hàng nếu có hàng lại
        }
        return null;
      }).filter(Boolean);
  
      await Promise.all(updateStatusPromises);
      const updatedRes = await fetchProducts(searchKeyword);
      setProducts(updatedRes.data.products || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Lỗi khi load sản phẩm:", err);
    }
  };
  
  

  const fetchCategoriesData = async () => {
    try {
      const res = await fetchCategories();
      if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories);
      } else {
        console.error("Dữ liệu danh mục không hợp lệ:", res.data);
      }
    } catch (err) {
      console.error("Lỗi khi load danh mục:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(keyword);
  };

  const toggleStatus = async (id, currentStatus) => {
    if (window.confirm("Bạn có chắc muốn thay đổi trạng thái sản phẩm này?")) {
      try {
        let newStatus;
        if (currentStatus === 0) {
          newStatus = 2; // Đổi từ Còn hàng -> Ngừng bán
        } else if (currentStatus === 2) {
          newStatus = 0; // Đổi từ Ngừng bán -> Còn hàng
        } else {
          // Nếu đang ở trạng thái Hết hàng (1), không cho đổi bằng tay
          alert("Sản phẩm đang ở trạng thái Hết hàng (tự động). Vui lòng cập nhật lại số lượng để thay đổi trạng thái.");
          return;
        }
  
        await toggleProductStatus(id, newStatus);
        fetchData(); // Cập nhật lại danh sách sản phẩm
      } catch (error) {
        console.error("Lỗi khi thay đổi trạng thái sản phẩm:", error);
      }
    }
  };
  

  const formatDate = (dateString) => {
    return dateString ? dayjs(dateString).format("DD/MM/YYYY HH:mm") : "";
  };

  useEffect(() => {
    fetchData();
    fetchCategoriesData();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (filterStatus === "all") return true;
    return product.status === Number(filterStatus);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý Sản phẩm</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Tìm kiếm</button>
        </div>
      </form>

      <div className="btn-group mb-3">
        <button className={`btn btn-${filterStatus === "all" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("all")}>Tất cả</button>
        <button className={`btn btn-${filterStatus === "0" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("0")}>Còn hàng</button>
        <button className={`btn btn-${filterStatus === "1" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("1")}>Hết hàng</button>
        <button className={`btn btn-${filterStatus === "2" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("2")}>Ngừng bán</button>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <a href="/admin/sanpham/form" className="btn btn-success ml-auto">Thêm sản phẩm</a>
      </div>

      {!filteredProducts.length ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <>
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
              {currentProducts.map((product) => (
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
                  <td>{formatDate(product.ngayTao)}</td>
                  <td>{product.mota}</td>
                  <td>
                    <a href={`/admin/sanpham/form?id=${product.id}`} className="btn btn-warning btn-sm">
                      Sửa
                    </a>
                  </td>
                  <td>
                  <button
  className={`btn btn-sm ${
    product.status === 0
      ? 'btn-success'
      : product.status === 2
      ? 'btn-danger'
      : 'btn-secondary'
  }`}
  onClick={() => toggleStatus(product.id, product.status)}
>
  {product.status === 0
    ? 'Còn hàng'
    : product.status === 2
    ? 'Ngừng bán'
    : 'Hết hàng'}
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SanPhamList;
