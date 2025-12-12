"use client";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ThanhToan = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [sdt, setSdt] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { selectedItems = [], tongTien = 0 } = state || {};

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
        setSdt(response.data.sdt || "");
      } catch (err) {
        console.log("Không lấy được SĐT");
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diaChi.trim()) return setError("Vui lòng nhập địa chỉ giao hàng!");
    if (!sdt.trim()) return setError("Vui lòng nhập số điện thoại!");

    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/orders/create-from-cart", {
        diaChi: diaChi.trim(),
        sdt: sdt.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Shop Thời Trang");
      navigate("/donhang");
    } catch (err) {
      setError(err.response?.data || "Đặt hàng thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (selectedItems.length === 0) {
    return (
      <div style={{ background: "#f5f1ed", minHeight: "100vh", padding: "100px 20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "36px", color: "#2d2d2d" }}>Không có sản phẩm để thanh toán!</h2>
        <button onClick={() => navigate("/giohang")} style={{ marginTop: "20px", padding: "14px 40px", background: "#d4a574", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>
          Quay lại giỏ hàng
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f1ed", minHeight: "100vh", padding: "40px 0" }}>
      {/* Reset toàn bộ khoảng trắng */}
      <style jsx>{`
        html, body, #root { margin:0; padding:0; background:#f5f1ed; }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
        {/* Tiêu đề */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "48px", fontWeight: 300, color: "#2d2d2d", margin: "0 0 16px" }}>
            Xác Nhận Đơn Hàng
          </h1>
          <div style={{ height: "5px", width: "90px", background: "#d4a574", margin: "0 auto" }}></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: "50px", alignItems: "start" }}>
          {/* Danh sách sản phẩm */}
          <div style={{ background: "#fff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 15px 50px rgba(0,0,0,0.1)", padding: "30px" }}>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "26px", color: "#2d2d2d", marginBottom: "24px", textAlign: "center" }}>
              Sản phẩm của bạn ({selectedItems.length} món)
            </h3>
            <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
              {selectedItems.map((item, index) => {
                const ten = item.product?.ten || item.tenSanPham || "Sản phẩm";
                const gia = Number(item.giaSanPham || item.totalPrice);
                const sl = Number(item.quantity || 1);
                const thanhTien = gia * sl;

                return (
                  <div key={item.id || index} style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr 120px 140px",
                    gap: "20px",
                    padding: "20px 0",
                    borderBottom: index === selectedItems.length - 1 ? "none" : "1px solid #eee",
                    alignItems: "center"
                  }}>
                    <img
                      src={item.hinhAnh ? `http://localhost:8080/uploads/${item.hinhAnh}` : "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image"}
                      alt={ten}
                      style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "14px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
                    />
                    <div>
                      <div style={{ fontFamily: "'Georgia', serif", fontSize: "20px", color: "#2d2d2d", fontWeight: 400, lineHeight: "1.4" }}>
                        {ten}
                      </div>
                    </div>
                    <div style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
                      x{sl}
                    </div>
                    <div style={{ textAlign: "right", fontSize: "22px", color: "#c41f1f", fontWeight: 700 }}>
                      {thanhTien.toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tổng tiền lớn */}
            <div style={{ marginTop: "30px", padding: "24px", background: "#faf6f2", borderRadius: "16px", textAlign: "right" }}>
              <div style={{ fontSize: "28px", color: "#2d2d2d", fontWeight: 600 }}>
                Tổng thanh toán:
              </div>
              <div style={{ fontSize: "42px", color: "#d4a574", fontWeight: 700, marginTop: "8px" }}>
                {Number(tongTien).toLocaleString("vi-VN")} đ
              </div>
            </div>
          </div>

          {/* Form thanh toán */}
          <div style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            position: "sticky",
            top: "20px",
            height: "fit-content"
          }}>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "28px", color: "#2d2d2d", marginBottom: "30px", textAlign: "center" }}>
              Thông tin giao hàng
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "17px", color: "#2d2d2d", marginBottom: "10px", fontWeight: 600 }}>
                  <FontAwesomeIcon icon={faPhone} style={{ color: "#d4a574" }} />
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                  placeholder="Nhập số điện thoại nhận hàng"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #ddd",
                    borderRadius: "14px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "all 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#d4a574"}
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                  required
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "17px", color: "#2d2d2d", marginBottom: "10px", fontWeight: 600 }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#d4a574" }} />
                  Địa chỉ giao hàng
                </label>
                <textarea
                  rows="4"
                  value={diaChi}
                  onChange={(e) => setDiaChi(e.target.value)}
                  placeholder="Ví dụ: 123 Đường Láng, Phường Láng Thượng, Quận Đống Đa, Hà Nội"
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    border: "2px solid #ddd",
                    borderRadius: "14px",
                    fontSize: "16px",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#d4a574"}
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                  required
                />
              </div>

              {error && (
                <div style={{ padding: "14px", background: "#ffe6e6", color: "#c41f1f", borderRadius: "12px", marginBottom: "20px", textAlign: "center", fontWeight: 500 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "20px",
                  background: loading ? "#c49564" : "#d4a574",
                  color: "white",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "20px",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 12px 35px rgba(212,165,116,0.4)",
                  transition: "all 0.4s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px"
                }}
              >
                {loading ? (
                  <>Đang xử lý...</>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    XÁC NHẬN ĐẶT HÀNG
                  </>
                )}
              </button>
            </form>

            <div style={{ marginTop: "30px", textAlign: "center", color: "#888", fontSize: "14px" }}>
              <p>Shop Thời Trang cam kết giao hàng nhanh chóng & chính hãng 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;