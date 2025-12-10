import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

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
      .put(`http://localhost:8080/api/categories/toggle-status/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Danh sách danh mục</h2>
      <div className="d-flex justify-content-between mb-3">
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
        <Link to="/categories/add" className="btn btn-success">
          Thêm danh mục
        </Link>
      </div>

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
          {categories.map((category) => (
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
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Không có danh mục nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
