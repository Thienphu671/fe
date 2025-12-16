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
          // Sắp xếp theo ID giảm dần (mới nhất trước)
          const sortedOrders = res.sort((a, b) => b.id - a.id);
          setOrders(sortedOrders);
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
    try {
      await confirmOrder(id);
      // Cập nhật lại danh sách sau khi xác nhận
      const res = await fetchAllOrders();
      if (Array.isArray(res)) {
        const sorted = res.sort((a, b) => b.id - a.id);
        setOrders(sorted);
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      // Cập nhật lại danh sách sau khi hủy
      const res = await fetchAllOrders();
      if (Array.isArray(res)) {
        const sorted = res.sort((a, b) => b.id - a.id);
        setOrders(sorted);
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === Number(filter);
  });

  // Hàm hiển thị trạng thái đẹp hơn
  const getStatusBadge = (status) => {
    switch (status) {
      case 1:
        return <span className="badge bg-success">Đã xác nhận</span>;
      case 0:
        return <span className="badge bg-warning text-dark">Chưa xác nhận</span>;
      case 2:
        return <span className="badge bg-danger">Đã hủy</span>;
      default:
        return <span className="badge bg-secondary">Không xác định</span>;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Danh Sách Đơn Hàng</h2>

      {/* Bộ lọc trạng thái */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("all")}
          >
            Tất cả
          </button>
          <button
            type="button"
            className={`btn ${filter === "0" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("0")}
          >
            Chưa xác nhận
          </button>
          <button
            type="button"
            className={`btn ${filter === "1" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("1")}
          >
            Đã xác nhận
          </button>
          <button
            type="button"
            className={`btn ${filter === "2" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("2")}
          >
            Đã hủy
          </button>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
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
                  <td><strong>#{order.id}</strong></td>
                  <td>{order.orderDetails[0]?.customerName || "Chưa có thông tin"}</td>
                  <td>{order.date || "Chưa có thông tin"}</td>
                  <td>{order.orderDetails[0]?.address || "Chưa có thông tin"}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                  <td>
                    {order.status === 0 && (
                      <div className="btn-group" role="group">
                        <button
                          onClick={() => handleConfirm(order.id)}
                          className="btn btn-success btn-sm me-2"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={() => handleCancel(order.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Hủy đơn
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  Không có đơn hàng nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;