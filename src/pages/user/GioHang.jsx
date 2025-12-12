"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGiohang,
  capNhatSoLuong,
  xoaSanphamTrongGiohang,
} from "../../api/giohang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const GioHang = () => {
  const navigate = useNavigate();
  const [giohang, setGiohang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchGiohang();
  }, []);

  const fetchGiohang = async () => {
    try {
      const response = await getGiohang();
      const data = response.data || [];
      setGiohang(data);
      setSelectedIds([]);
    } catch (error) {
      console.error("Lỗi tải giỏ hàng:", error);
      alert("Không thể tải giỏ hàng! Vui lòng đăng nhập lại.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === giohang.length && giohang.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(giohang.map((item) => item.id));
    }
  };

  const handleCapNhatSoLuong = async (giohangId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await capNhatSoLuong(giohangId, newQuantity);
      setGiohang((prev) =>
        prev.map((item) =>
          item.id === giohangId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      alert("Cập nhật thất bại!");
      fetchGiohang();
    }
  };

  const handleXoa = async (sanphamId, giohangId) => {
    if (!window.confirm("Xóa sản phẩm này khỏi giỏ hàng?")) return;
    try {
      await xoaSanphamTrongGiohang(sanphamId);
      setGiohang((prev) => prev.filter((item) => item.id !== giohangId));
      setSelectedIds((prev) => prev.filter((id) => id !== giohangId));
    } catch (error) {
      alert("Xóa thất bại!");
    }
  };

  const tongTienChon = giohang
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

  const handleThanhToan = () => {
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm!");
      return;
    }
    const selectedItems = giohang.filter((item) => selectedIds.includes(item.id));
    navigate("/thanhtoan", {
      state: { selectedItems, tongTien: tongTienChon },
    });
  };

  // FIX 100%: TÊN SẢN PHẨM KHÔNG ĐÈ LÊN HÌNH + ĐƠN GIÁ KHÔNG XUỐNG DÒNG
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      /* Reset & Layout */
      html, body, #root, .giohang-page { margin:0 !important; padding:0 !important; background:#f5f1ed !important; }
      .giohang-wrapper { max-width:100% !important; padding:0 20px !important; margin:0 auto !important; box-sizing:border-box; }
      .giohang-header { margin:30px 0 40px !important; text-align:center; }

      .content-grid {
        display: grid;
        grid-template-columns: 1fr 420px;
        gap: 40px;
        align-items: start;
      }

      .table-wrapper { 
        background:#fff; 
        border-radius:24px; 
        overflow:hidden; 
        box-shadow:0 15px 50px rgba(0,0,0,0.1);
      }

      .summary-card {
        position:sticky;
        top:20px;
        background:#fff;
        border-radius:24px;
        padding:40px;
        box-shadow:0 20px 60px rgba(0,0,0,0.12);
        height:fit-content;
      }

      /* Bảng cố định layout */
      table { 
        width:100%; 
        border-collapse:collapse; 
        table-layout:fixed; /* QUAN TRỌNG NHẤT */
      }

      /* Độ rộng từng cột */
      table th:nth-child(1), table td:nth-child(1) { width:50px; }   /* Checkbox */
      table th:nth-child(2), table td:nth-child(2) { width:110px; }  /* Hình */
      table th:nth-child(3), table td:nth-child(3) { width:auto; }  /* Tên SP - chiếm phần còn lại */
      table th:nth-child(4), table td:nth-child(4) { width:140px; }  /* Đơn giá */
      table th:nth-child(5), table td:nth-child(5) { width:110px; }  /* Số lượng */
      table th:nth-child(6), table td:nth-child(6) { width:110px; }  /* Xóa */

      /* Tên sản phẩm: không tràn, xuống dòng nếu quá dài */
      .product-name-cell {
        padding: 20px 16px 20px 30px !important;
        text-align: left;
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
      }

      /* Đơn giá & Xóa: luôn thẳng hàng, không xuống dòng */
      .price-text {
        white-space: nowrap !important;
        min-width: 110px;
        text-align: center !important;
      }

      /* Hover */
      .delete-btn:hover { background:#e74c3c !important; color:white !important; }
      .checkout-btn:hover { background:#c49564 !important; transform:translateY(-4px); }
      tr:hover { background:#fdfaf7 !important; }

      input[type=number] { -moz-appearance:textfield; }
      input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }

      @media (max-width: 992px) {
        .content-grid { grid-template-columns:1fr !important; }
        .summary-card { position:static !important; margin-top:40px; }
      }
      @media (max-width: 768px) {
        .giohang-wrapper { padding:0 12px !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const styles = {
    root: { background: "#f5f1ed", minHeight: "100vh" },
    header: { textAlign: "center", marginTop: "30px", marginBottom: "40px" },
    title: { fontFamily: "'Georgia', serif", fontSize: "48px", fontWeight: 300, color: "#2d2d2d", margin: "0 0 16px" },
    underline: { height: "5px", width: "90px", background: "#d4a574", margin: "0 auto" },

    th: { padding: "24px 20px", textAlign: "center", fontWeight: 600, color: "#555", background: "#faf6f2", fontSize: "15px" },
    td: { padding: "28px 20px", textAlign: "center", verticalAlign: "middle", borderTop: "1px solid #eee" },

    checkbox: { width: "20px", height: "20px", cursor: "pointer" },
    img: { width: "90px", height: "90px", objectFit: "cover", borderRadius: "14px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
    productName: { fontFamily: "'Georgia', serif", fontSize: "20px", color: "#2d2d2d", fontWeight: 400 },
    price: { fontSize: "19px", color: "#d4a574", fontWeight: 600 },
    quantityInput: { width: "80px", height: "48px", textAlign: "center", border: "2px solid #ddd", borderRadius: "12px", fontSize: "16px", fontWeight: 600 },
    deleteBtn: { padding: "10px 18px", background: "transparent", border: "2px solid #e74c3c", color: "#e74c3c", borderRadius: "12px", fontWeight: 600, fontSize: "14px" },

    totalLabel: { fontSize: "26px", fontWeight: 600, color: "#2d2d2d", margin: "0" },
    totalAmount: { fontSize: "38px", fontWeight: 700, color: "#d4a574", margin: "10px 0 0" },
    checkoutBtn: {
      marginTop: "30px",
      padding: "20px 50px",
      background: "#d4a574",
      color: "white",
      border: "none",
      borderRadius: "16px",
      fontSize: "19px",
      fontWeight: 600,
      width: "100%",
      cursor: "pointer",
      boxShadow: "0 12px 35px rgba(212,165,116,0.4)",
    }
  };

  if (loading) return <div style={{textAlign:"center", padding:"150px", fontSize:"28px", color:"#888"}}>Đang tải giỏ hàng...</div>;

  if (giohang.length === 0) {
    return (
      <div style={styles.root} className="giohang-page">
        <div className="giohang-wrapper" style={{marginTop:"30px", textAlign:"center", padding:"100px 20px"}}>
          <FontAwesomeIcon icon={faShoppingBag} size="5x" style={{color:"#ddd", marginBottom:"30px"}} />
          <h2 style={{fontFamily: "'Georgia', serif", fontSize:"36px", color:"#2d2d2d"}}>Giỏ hàng trống</h2>
          <p style={{fontSize:"18px", color:"#888", margin:"20px 0"}}>Hãy thêm những món đồ yêu thích vào giỏ nào!</p>
          <button style={{padding:"18px 50px", background:"#d4a574", color:"white", border:"none", borderRadius:"14px", fontSize:"18px", fontWeight:600, cursor:"pointer"}}
            onClick={() => navigate("/")}>
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root} className="giohang-page">
      <div className="giohang-wrapper">
        <div style={styles.header} className="giohang-header">
          <h1 style={styles.title}>Giỏ Hàng Của Bạn</h1>
          <div style={styles.underline}></div>
        </div>

        <div className="content-grid">
          {/* Danh sách sản phẩm */}
          <div className="table-wrapper">
            <div style={{background:"#fff", borderRadius:"24px", overflow:"hidden", boxShadow:"0 15px 50px rgba(0,0,0,0.1)"}}>
              <table>
                <thead>
                  <tr>
                    <th style={styles.th}><input type="checkbox" style={styles.checkbox} checked={selectedIds.length === giohang.length && giohang.length > 0} onChange={toggleSelectAll} /></th>
                    <th style={styles.th}>Hình ảnh</th>
                    <th style={styles.th}>Sản phẩm</th>
                    <th style={styles.th}>Đơn giá</th>
                    <th style={styles.th}>Số lượng</th>
                    <th style={styles.th}>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {giohang.map((item) => {
                    const isChecked = selectedIds.includes(item.id);
                    return (
                      <tr key={item.id} style={{background: isChecked ? "#fffaf0" : "transparent"}}>
                        <td style={styles.td}><input type="checkbox" style={styles.checkbox} checked={isChecked} onChange={() => toggleSelect(item.id)} /></td>
                        <td style={styles.td}>
                          <img
                            src={item.hinhAnh ? `http://localhost:8080/uploads/${item.hinhAnh}` : "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image"}
                            alt={item.tenSanPham}
                            style={styles.img}
                            onError={(e) => e.target.src = "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image"}
                          />
                        </td>

                        {/* TÊN SẢN PHẨM - ĐÃ FIX KHÔNG ĐÈ LÊN HÌNH */}
                        <td className="product-name-cell">
                          <div style={styles.productName}>{item.tenSanPham}</div>
                        </td>

                        {/* ĐƠN GIÁ */}
                        <td style={styles.td}>
                          <div className="price-text" style={styles.price}>
                            {Number(item.giaSanPham).toLocaleString("vi-VN")} đ
                          </div>
                        </td>

                        {/* SỐ LƯỢNG */}
                        <td style={styles.td}>
                          <input
                            type="number"
                            min="1"
                            style={styles.quantityInput}
                            value={item.quantity || 1}
                            onChange={(e) => handleCapNhatSoLuong(item.id, parseInt(e.target.value) || 1)}
                          />
                        </td>

                        {/* XÓA */}
                        <td style={styles.td}>
                          <button style={styles.deleteBtn} className="delete-btn" onClick={() => handleXoa(item.sanphamId, item.id)}>
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tổng tiền */}
          <div className="summary-card">
            <h3 style={styles.totalLabel}>
              Tổng thanh toán ({selectedIds.length} sản phẩm):
            </h3>
            <div style={styles.totalAmount}>
              {tongTienChon.toLocaleString("vi-VN")} đ
            </div>
            <button
              style={{...styles.checkoutBtn, opacity: selectedIds.length === 0 ? 0.6 : 1}}
              className="checkout-btn"
              disabled={selectedIds.length === 0}
              onClick={handleThanhToan}
            >
              Tiến Hành Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GioHang;