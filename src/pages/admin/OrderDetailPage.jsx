import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../api/orderApi";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // URL ảnh và placeholder giống hệt giỏ hàng
  const BASE_UPLOAD_URL = "http://localhost:8080/uploads/";
  const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image";

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        const res = await fetchOrderById(id);
        if (res && res.order && res.order.orderDetails?.length > 0) {
          setOrder(res.order);
          setTotal(res.totalPrice || 0);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 1: return <span className="badge bg-success">Đã xác nhận</span>;
      case 0: return <span className="badge bg-warning text-dark">Chưa xác nhận</span>;
      case 2: return <span className="badge bg-danger">Đã hủy</span>;
      default: return <span className="badge bg-secondary">Không xác định</span>;
    }
  };

  // Style ảnh giống hệt giỏ hàng
  const imgStyle = {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  };

  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }}></div>
        <p className="mt-4 fs-4 text-muted">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (!order || !order.orderDetails || order.orderDetails.length === 0) {
    return (
      <div className="text-center py-5 my-5">
        <div className="alert alert-danger d-inline-block">Không tìm thấy đơn hàng!</div>
        <button onClick={() => window.history.back()} className="btn btn-secondary mt-3">
          ← Quay Lại
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f1ed", minHeight: "100vh", padding: "40px 20px" }}>
      <div className="container">
        {/* Tiêu đề */}
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "48px",
          fontWeight: 300,
          color: "#2d2d2d",
          textAlign: "center",
          marginBottom: "16px"
        }}>
          Chi Tiết Đơn Hàng #{order.id}
        </h1>
        <div style={{ height: "5px", width: "90px", background: "#d4a574", margin: "0 auto 50px" }}></div>

        {/* Thông tin khách hàng */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0" style={{ borderRadius: "24px", overflow: "hidden" }}>
              <div className="card-header bg-light py-4">
                <h5 className="mb-0 fw-semibold text-center">Thông Tin Đơn Hàng</h5>
              </div>
              <div className="card-body p-5">
                <div className="row g-4 text-start">
                  <div className="col-md-6"><strong>Khách hàng:</strong> {order.orderDetails[0]?.customerName || "Chưa có"}</div>
                  <div className="col-md-6"><strong>SĐT:</strong> {order.orderDetails[0]?.phoneNumber || "Chưa có"}</div>
                  <div className="col-md-6"><strong>Email:</strong> {order.orderDetails[0]?.email || "Chưa có"}</div>
                  <div className="col-md-6"><strong>Ngày đặt:</strong> {order.date || "Chưa có"}</div>
                  <div className="col-12"><strong>Địa chỉ giao hàng:</strong> <span className="text-muted">{order.orderDetails[0]?.address || "Chưa có"}</span></div>
                  <div className="col-12"><strong>Trạng thái:</strong> {getStatusBadge(order.status)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <h3 className="text-center mb-4" style={{ fontFamily: "'Georgia', serif", fontSize: "32px", color: "#2d2d2d" }}>
          Sản Phẩm Trong Đơn Hàng
        </h3>

        <div className="table-responsive">
          <table className="table table-borderless align-middle" style={{
            background: "white",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 15px 50px rgba(0,0,0,0.1)"
          }}>
            <thead style={{ background: "#faf6f2" }}>
              <tr>
                <th className="text-center py-4">Hình ảnh</th>
                <th className="py-4 ps-5 text-start">Sản phẩm</th>
                <th className="text-center py-4">Đơn giá</th>
                <th className="text-center py-4">Số lượng</th>
                <th className="text-center py-4">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map((item, index) => (
                <tr key={index} style={{ borderBottom: index < order.orderDetails.length - 1 ? "1px solid #eee" : "none" }}>
                  {/* ĐOẠN ẢNH BẠN YÊU CẦU - GIỐNG HỆT GIỎ HÀNG */}
                  <td className="text-center py-4">
                    <img
                      src={item.productImage || item.productImage
                        ? `${BASE_UPLOAD_URL}${item.productImage || item.productImage}` 
                        : PLACEHOLDER_IMAGE}
                      alt={item.productName || item.tenSanPham || item.ten || "Sản phẩm"}
                      style={imgStyle}
                      onError={(e) => {
                        e.target.onerror = null; // Tránh loop vô tận
                        e.target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </td>

                  {/* Tên sản phẩm */}
                  <td className="ps-5" style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "20px",
                    color: "#2d2d2d",
                    fontWeight: 400
                  }}>
                    {item.productName || item.tenSanPham || item.ten || "Chưa có tên"}
                  </td>

                  {/* Đơn giá */}
                  <td className="text-center" style={{
                    fontSize: "19px",
                    color: "#d4a574",
                    fontWeight: 600
                  }}>
                    {Number(item.price || item.gia || item.giaSanPham).toLocaleString("vi-VN")} đ
                  </td>

                  {/* Số lượng */}
                  <td className="text-center" style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#333"
                  }}>
                    {item.quantity || item.soluong}
                  </td>

                  {/* Thành tiền */}
                  <td className="text-center" style={{
                    fontSize: "19px",
                    color: "#e74c3c",
                    fontWeight: 600
                  }}>
                    {((item.price || item.gia || item.giaSanPham) * (item.quantity || item.soluong)).toLocaleString("vi-VN")} đ
                  </td>
                </tr>
              ))}

              {/* Dòng tổng tiền */}
              <tr style={{ background: "#fdfaf7" }}>
                <td colSpan="4" className="text-end pe-5 py-4" style={{
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#2d2d2d"
                }}>
                  TỔNG THANH TOÁN:
                </td>
                <td className="text-center py-4" style={{
                  fontSize: "38px",
                  fontWeight: 700,
                  color: "#d4a574"
                }}>
                  {total.toLocaleString("vi-VN")} đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Nút quay lại */}
        <div className="text-center mt-5">
          <button
            onClick={() => window.history.back()}
            style={{
              padding: "16px 50px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            ← Quay Lại Danh Sách Đơn Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;