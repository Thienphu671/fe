// src/pages/user/OrderList.jsx
"use client"

/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      setLoading(false)
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      console.error("Không tìm thấy token!")
      setLoading(false)
      return
    }

    axios.get(`http://localhost:8080/api/donHangND/list?userId=${storedUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    })
      .then(res => {
        const data = res.data || []
        setOrders(data)
        setFilteredOrders(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Lỗi tải đơn hàng:", err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter(order => {
        if (activeFilter === "pending") return order.status === 0
        if (activeFilter === "confirmed") return order.status === 1
        if (activeFilter === "cancelled") return order.status === 2
        return true
      }))
    }
  }, [activeFilter, orders])

  const cancelOrder = (id) => {
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return
    axios.post(`http://localhost:8080/api/donHangND/cancel/${id}`)
      .then(() => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 2 } : o))
      })
      .catch(err => alert("Hủy thất bại: " + (err.response?.data || err.message)))
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 0: return { text: "Chờ xác nhận", color: "#f39c12", bg: "#fff3cd" }
      case 1: return { text: "Đã xác nhận", color: "#27ae60", bg: "#d5f5e3" }
      case 2: return { text: "Đã hủy", color: "#e74c3c", bg: "#fadbd8" }
      default: return { text: "Không xác định", color: "#7f8c8d", bg: "#ecf0f1" }
    }
  }

  // === XÓA HẾT KHOẢNG TRẮNG – DÍNH SÁT NAV BAR NHƯ TRANG SẢN PHẨM ===
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0 !important; padding:0 !important; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .order-card:hover { transform: translateY(-16px) !important; box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const styles = {
    root: {
      margin: 0,
      padding: 0,
      backgroundColor: "#f5f1ed",
      width: "100%",
      minHeight: "100vh",
      overflowX: "hidden"
    },

    // HEADER SIÊU GỌN – DÍNH SÁT LÊN TRÊN
    header: {
      width: "100%",
      padding: "10px 5% 40px",   // chỉ để lại 120px để dưới navbar, tiêu đề sát lên
      textAlign: "center",
      background: "linear-gradient(to bottom, #f5f1ed 0%, #f5f1ed 60%, rgba(196,186,175,0.05) 100%)"
    },
    title: {
      fontFamily: "'Georgia', serif",
      fontSize: "52px",
      fontWeight: 300,
      color: "#2d2d2d",
      margin: "0 0 15px 0"   // giảm margin dưới
    },
    underline: {
      height: "5px",
      width: "90px",
      backgroundColor: "#d4a574",
      margin: "0 auto 25px"   // giảm khoảng cách
    },

    // BỘ LỌC DÍNH SÁT TIÊU ĐỀ
    filterBar: {
      display: "flex",
      justifyContent: "center",
      gap: "18px",
      margin: "0 auto 50px",
      flexWrap: "wrap",
      maxWidth: "1000px"
    },
    filterBtn: (isActive) => ({
      padding: "11px 28px",
      background: isActive ? "#2d2d2d" : "transparent",
      color: isActive ? "#fff" : "#2d2d2d",
      border: "2px solid #2d2d2d",
      borderRadius: "50px",
      fontWeight: 600,
      fontSize: "15.5px",
      cursor: "pointer",
      transition: "all 0.3s",
      minWidth: "150px"
    }),

    content: {
      width: "100%",
      padding: "0 5% 120px",
      backgroundColor: "#f5f1ed"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
      gap: "50px",
      maxWidth: "1600px",
      margin: "0 auto"
    },

    card: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      transition: "all 0.4s ease"
    },

    cardHeader: { padding: "28px 32px 20px", borderBottom: "1px solid #eee" },
    orderId: { fontSize: "18px", color: "#7f8c8d", marginBottom: "8px" },
    orderDate: { fontSize: "15px", color: "#95a5a6" },

    cardBody: { padding: "24px 32px" },

    statusBadge: {
      display: "inline-block",
      padding: "8px 20px",
      borderRadius: "50px",
      fontWeight: 600,
      fontSize: "15px",
      marginBottom: "20px"
    },

    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "12px",
      fontSize: "16px"
    },
    label: { color: "#7f8c8d" },
    value: { color: "#2d2d2d", fontWeight: 500 },

    totalPrice: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#d4a574",
      textAlign: "right",
      margin: "20px 0 10px"
    },

    actions: {
      padding: "20px 32px",
      background: "#f8f9fa",
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end"
    },
    btnView: {
      padding: "12px 28px",
      background: "#2d2d2d",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: 600,
      cursor: "pointer"
    },
    btnCancel: {
      padding: "12px 28px",
      background: "transparent",
      color: "#e74c3c",
      border: "2px solid #e74c3c",
      borderRadius: "8px",
      fontWeight: 600,
      cursor: "pointer"
    },

    empty: {
      textAlign: "center",
      padding: "100px 20px",
      fontSize: "26px",
      color: "#888"
    },
    loading: {
      textAlign: "center",
      padding: "150px 0",
      fontSize: "28px",
      color: "#888"
    }
  }

  if (loading) return <div style={styles.loading}>Đang tải đơn hàng...</div>

  return (
    <div style={styles.root}>
      {/* TIÊU ĐỀ + BỘ LỌC DÍNH SÁT LÊN TRÊN */}
      <section style={styles.header}>
        <h1 style={styles.title}>Đơn Hàng Của Tôi</h1>
        <div style={styles.underline}></div>

        <div style={styles.filterBar}>
          <button style={styles.filterBtn(activeFilter === "all")} onClick={() => setActiveFilter("all")}>
            Tất cả đơn hàng
          </button>
          <button style={styles.filterBtn(activeFilter === "pending")} onClick={() => setActiveFilter("pending")}>
            Chờ xác nhận
          </button>
          <button style={styles.filterBtn(activeFilter === "confirmed")} onClick={() => setActiveFilter("confirmed")}>
            Đã xác nhận
          </button>
          <button style={styles.filterBtn(activeFilter === "cancelled")} onClick={() => setActiveFilter("cancelled")}>
            Đã hủy
          </button>
        </div>
      </section>

      {/* DANH SÁCH ĐƠN HÀNG */}
      <section style={styles.content}>
        {filteredOrders.length === 0 ? (
          <div style={styles.empty}>
            <p>Không có đơn hàng nào ở trạng thái này</p>
            <Link to="/sanPham" style={{ marginTop: "30px", padding: "16px 50px", background: "#000", color: "#fff", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredOrders.map((order) => {
              const status = getStatusInfo(order.status)
              return (
                <div
                  key={order.id}
                  className="order-card"
                  style={styles.card}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-16px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.orderId}>Đơn hàng #{order.id}</div>
                    <div style={styles.orderDate}>
                      {new Date(order.date).toLocaleDateString("vi-VN", {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </div>

                  <div style={styles.cardBody}>
                    <div style={{ ...styles.statusBadge, backgroundColor: status.bg, color: status.color }}>
                      {status.text}
                    </div>

                    <div style={styles.infoRow}>
                      <span style={styles.label}>Sản phẩm</span>
                      <span style={styles.value}>{order.soLuongSanPham || order.items?.length || 0} món</span>
                    </div>

                    <div style={styles.totalPrice}>
                      {Number(order.tongTien || 0).toLocaleString("vi-VN")} đ
                    </div>
                  </div>

                  <div style={styles.actions}>
                    <button style={styles.btnView} onClick={() => navigate(`/donHangND/detail/${order.id}`)}>
                      Xem chi tiết
                    </button>
                    {order.status === 0 && (
                      <button style={styles.btnCancel} onClick={() => cancelOrder(order.id)}>
                        Hủy đơn hàng
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}