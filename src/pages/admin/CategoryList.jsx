import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // Trạng thái lọc

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Hàm lấy dữ liệu danh mục từ API
  const fetchData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token không tồn tại.");
      return;
    }

    axios
      .get("http://localhost:8080/api/admin/categories", {
        params: { keyword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy danh mục:", error.response ? error.response.data : error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

  const toggleStatus = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token không tồn tại.");
      return;
    }
  
    axios
      .put(`http://localhost:8080/api/admin/categories/toggle-status/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Cập nhật trực tiếp trạng thái trong mảng categories
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === id ? { ...category, status: category.status === 0 ? 1 : 0 } : category
          )
        );
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error.response ? error.response.data : error.message);
      });
  };

  // Lọc danh mục theo trạng thái
  const filteredCategories = categories.filter((category) => {
    if (filterStatus === "all") return true;
    return category.status === Number(filterStatus); // Lọc theo trạng thái
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h2>Danh sách danh mục</h2>
      <div className="d-flex justify-content-between mb-3">
        {/* Navbar lọc trạng thái */}
        <div className="btn-group">
          <button className={`btn btn-${filterStatus === "all" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("all")}>Tất cả</button>
          <button className={`btn btn-${filterStatus === "0" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("0")}>Còn bán</button>
          <button className={`btn btn-${filterStatus === "1" ? "primary" : "secondary"}`} onClick={() => setFilterStatus("1")}>Ngưng bán</button>
        </div>

        <Link to="/categories/add" className="btn btn-success">
          Thêm danh mục
        </Link>
      </div>

      <form method="get" className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            className="form-control"
            placeholder="Nhập từ khóa..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </form>

      {!filteredCategories.length ? (
        <p>Không có danh mục nào.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Hành động</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.ten}</td>
                  <td>
                    <Link to={`/categories/edit/${category.id}`} className="btn btn-warning btn-sm">
                      Sửa
                    </Link>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${category.status === 0 ? "btn-success" : "btn-danger"}`}
                      onClick={() => toggleStatus(category.id)}
                    >
                      {category.status === 0 ? "Còn bán" : "Ngưng bán"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
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

export default CategoryList;
