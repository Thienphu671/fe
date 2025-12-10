import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../api/orderApi"; // Đảm bảo đường dẫn đúng với nơi bạn lưu orderApi.js

export const OrderDetailPage = () => {
  const { id } = useParams();  // Lấy id từ URL params
  const [order, setOrder] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Gọi API để lấy chi tiết đơn hàng
    fetchOrderById(id).then((res) => {
      console.log("Dữ liệu trả về từ API:", res);  // Thêm log để kiểm tra dữ liệu
      if (res.order && res.order.orderDetails) {
        setOrder(res.order);  // Lưu dữ liệu đơn hàng vào state
        setTotal(res.totalPrice);  // Lưu tổng tiền vào state
      } else {
        console.error("Dữ liệu không hợp lệ hoặc không có dữ liệu từ API");
      }
    });
  }, [id]);

  // Nếu chưa tải được đơn hàng, hiển thị thông báo "Đang tải dữ liệu..."
  if (!order || !order.orderDetails) {
    return <div className="container mt-5">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Chi Tiết Đơn Hàng</h2>
      <div className="card">
        <div className="card-body">
          <p><strong>ID Đơn Hàng:</strong> {order.id}</p>
          <p><strong>Khách Hàng:</strong> {order.orderDetails[0]?.customerName}</p>
          <p><strong>Ngày Đặt:</strong> {order.date || "Chưa có thông tin"}</p>
          <p><strong>Địa Chỉ:</strong> {order.orderDetails[0]?.address}</p>
          <p><strong>Gmail:</strong> {order.orderDetails[0]?.email}</p>
          <p><strong>SĐT:</strong> {order.orderDetails[0]?.phoneNumber}</p>
          <p><strong>Trạng Thái:</strong> {order.status === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</p>
        </div>
      </div>

      <h3 className="mt-4">Sản Phẩm</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {order.orderDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.productName}</td>
              <td>{detail.price.toLocaleString()} VNĐ</td>
              <td>{detail.quantity}</td>
              <td>{(detail.price * detail.quantity).toLocaleString()} VNĐ</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4"><strong>Tổng tiền:</strong></td>
            <td>{total.toLocaleString()} VNĐ</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => window.history.back()} className="btn btn-secondary">Quay Lại</button>
    </div>
  );
};

export default OrderDetailPage;
