import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchUsers,
  deleteUser,
  toggleUserActivation,
  toggleUserAdmin,
} from "../../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const loadUsers = () => {
    fetchUsers(fullname, email)
      .then((res) => {
        console.log("📦 Dữ liệu người dùng:", res.data);
        setUsers(res.data || []);
      })
      .catch((err) =>
        console.error("❌ Lỗi khi lấy danh sách người dùng:", err.response?.data || err.message)
      );
  };

  useEffect(() => {
    loadUsers();
  }, [fullname, email]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      deleteUser(id)
        .then(() => loadUsers())
        .catch((err) =>
          console.error("❌ Lỗi khi xóa người dùng:", err.response?.data || err.message)
        );
    }
  };

  const handleToggleActive = (id) => {
    toggleUserActivation(id)
      .then((res) => {
        console.log("✅ Đã bật/tắt trạng thái:", res.data);
        loadUsers();
      })
      .catch((err) => {
        console.error("❌ Lỗi khi cập nhật trạng thái:", err.response?.data || err.message);
        alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
      });
  };

  const handleToggleAdmin = (id) => {
    toggleUserAdmin(id)
      .then((res) => {
        console.log("✅ Đã thay đổi quyền:", res.data);
        loadUsers();
      })
      .catch((err) =>
        console.error("❌ Lỗi khi cập nhật quyền:", err.response?.data || err.message)
      );
  };

  return (
    <div className="container mt-4">
      <h2>Danh sách người dùng</h2>

      <div className="d-flex justify-content-between mb-3">
        <form onSubmit={(e) => e.preventDefault()} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo họ tên"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <Link to="/dangKy" className="btn btn-success">
          Thêm người dùng
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Quyền</th>
            <th>Trạng thái</th>
            {/* <th>Hành động</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* <td>{user.id}</td> */}
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button
                  className={`btn btn-sm ${user.admin ? "btn-success" : "btn-secondary"}`}
                //   onClick={() => handleToggleAdmin(user.id)}
                >
                  {user.admin ? "Admin" : "User"}
                </button>
              </td>
              <td>
                <button
                  className={`btn btn-sm ${user.activated ? "btn-success" : "btn-danger"}`}
                  onClick={() => handleToggleActive(user.id)}
                >
                  {user.activated ? "Đang hoạt động" : "Bị khóa"}
                </button>
              </td>
              {/* <td>
                <Link to={`/users/edit/${user.id}`} className="btn btn-warning btn-sm me-2">
                  Sửa
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                  Xóa
                </button>
              </td> */}
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
