import React, { useEffect, useState } from "react";
import {
  fetchAllOrders,
  confirmOrder,
  cancelOrder,
} from "../../api/orderApi";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // Trạng thái lọc đơn hàng
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetchAllOrders();
        if (Array.isArray(res)) {
          setOrders(res);
        } else {
          console.error("Dữ liệu trả về không phải là mảng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };
    getOrders();
  }, []);

  const handleConfirm = async (id) => {
    await confirmOrder(id);
    const res = await fetchAllOrders();
    if (Array.isArray(res)) {
      setOrders(res);
    }
  };

  const handleCancel = async (id) => {
    await cancelOrder(id);
    const res = await fetchAllOrders();
    if (Array.isArray(res)) {
      setOrders(res);
    }
  };

  // Hàm lọc đơn hàng theo trạng thái
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === Number(filter);
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center">Danh Sách Đơn Hàng</h2>

      {/* Navbar cho lọc trạng thái đơn hàng */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Quản Lý Đơn Hàng
          </a>
          <div className="navbar-nav">
            <button
              className={`nav-link ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Tất cả
            </button>
            <button
              className={`nav-link ${filter === "1" ? "active" : ""}`}
              onClick={() => setFilter("1")}
            >
              Đã xác nhận
            </button>
            <button
              className={`nav-link ${filter === "0" ? "active" : ""}`}
              onClick={() => setFilter("0")}
            >
              Chưa xác nhận
            </button>
            <button
              className={`nav-link ${filter === "2" ? "active" : ""}`}
              onClick={() => setFilter("2")}
            >
              Đã hủy
            </button>
          </div>
        </div>
      </nav>

      {/* Bảng danh sách đơn hàng */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách Hàng</th>
            <th>Ngày Đặt</th>
            <th>Địa Chỉ</th>
            <th>Trạng Thái</th>
            <th>Chi Tiết</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderDetails[0]?.customerName || "Chưa có thông tin"}</td>
                <td>{order.date || "Chưa có thông tin"}</td>
                <td>{order.orderDetails[0]?.address || "Chưa có thông tin"}</td>
                <td>
                  {order.status === 1 && <span className="badge bg-success">Đã xác nhận</span>}
                  {order.status === 0 && <span className="badge bg-warning">Chưa xác nhận</span>}
                  {order.status === 2 && <span className="badge bg-danger">Đã hủy</span>}
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    Xem
                  </button>
                </td>
                <td>
                  {order.status === 0 && (
                    <>
                      <button
                        onClick={() => handleConfirm(order.id)}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Xác nhận
                      </button>
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Hủy đơn
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Không có đơn hàng</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListPage;
