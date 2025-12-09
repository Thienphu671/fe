import React, { useEffect, useState } from "react";
import { createCategory, fetchCategoryById, updateCategory } from "../../api/danhmuc";
import { useNavigate, useParams } from "react-router-dom";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function CategoryForm() {
  const [ten, setTen] = useState("");
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchCategoryById(id, authHeaders()).then((res) => {
        const category = res.data.category;
        setTen(category.ten);
        setStatus(category.status);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ten, status };

    try {
      if (isEdit) {
        await updateCategory(id, data, authHeaders());
      } else {
        await createCategory(data, authHeaders());
      }
      navigate("/categories");
    } catch (error) {
      alert("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? "Sửa" : "Thêm"} Danh Mục</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={0}>Còn bán</option>
            <option value={1}>Ngưng bán</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {isEdit ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/categories")}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;
  