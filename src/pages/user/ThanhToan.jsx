// src/pages/user/ThanhToan.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ThanhToan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [sdt, setSdt] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { selectedItems = [], selectedIds = [], tongTien = 0 } = state || {};

  // Lấy SĐT mặc định từ tài khoản (nếu có API /api/user/info)
  useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập lại!");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/user/giohang/user/info", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSdt(response.data.sdt || ""); // Tự động điền SĐT
    } catch (err) {
      console.log("Không lấy được SĐT, để trống");
      setSdt("");
    }
  };

  fetchUserInfo();
}, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diaChi.trim()) return setError("Vui lòng nhập địa chỉ!");
    if (!sdt.trim()) return setError("Vui lòng nhập số điện thoại!");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/orders/create-from-cart", {
        giohangIds: selectedIds,
        diaChi: diaChi.trim(),
        sdt: sdt.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm");
      navigate("/donhang"); // hoặc "/giohang" để quay lại giỏ trống
    } catch (err) {
      setError(err.response?.data || "Đặt hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (selectedItems.length === 0) {
    return <div className="container mt-5 text-center">Không có sản phẩm để thanh toán!</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Xác nhận đơn hàng</h2>

      <div className="row">
        <div className="col-lg-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>SL</th>
                <th>Giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map(item => {
                const thanhTien = (Number(item.totalPrice) || 0) * (Number(item.quantity) || 1);
                return (
                  <tr key={item.id}>
                    <td>{item.product?.product?.ten || "Sản phẩm"}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.totalPrice).toLocaleString()}₫</td>
                    <td>{thanhTien.toLocaleString()}₫</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 className="text-end text-danger">
            Tổng tiền: {tongTien.toLocaleString("vi-VN")}₫
          </h3>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5>Thông tin giao hàng</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                    placeholder="Vui lòng nhập SĐT"
                    required
                  /> 
                </div>
                <div className="mb-3">
                  <label>Địa chỉ giao hàng</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={diaChi}
                    onChange={(e) => setDiaChi(e.target.value)}
                    placeholder="Vui lòng nhập địa chỉ"
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT HÀNG"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;