// src/pages/user/OrderList.jsx
"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function OrderList() {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")

    if (!userId || !token) {
      setLoading(false)
      return
    }

    axios
      .get(`http://localhost:8080/api/donHangND/list?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data || []
        setOrders(data)
        setFilteredOrders(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Lỗi tải đơn hàng:", err)
        setLoading(false)
      })
  }, [])

  // Lọc đơn hàng
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(
        orders.filter((order) => {
          if (activeFilter === "pending") return order.status === 0
          if (activeFilter === "confirmed") return order.status === 1
          if (activeFilter === "cancelled") return order.status === 2
          return true
        })
      )
    }
  }, [activeFilter, orders])

  const cancelOrder = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return

    axios
      .post(`http://localhost:8080/api/donHangND/cancel/${id}`)
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: 2 } : o))
        )
      })
      .catch((err) =>
        alert("Hủy thất bại: " + (err.response?.data || err.message))
      )
  }

  const getStatusInfo = (status) => {
    switch (status) {
      case 0: return { text: "Chờ xác nhận", color: "#f39c12" }
      case 1: return { text: "Đã xác nhận", color: "#27ae60" }
      case 2: return { text: "Đã hủy", color: "#e74c3c" }
      default: return { text: "Không xác định", color: "#7f8c8d" }
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Hover giống trang sản phẩm
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0; padding:0; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .order-card:hover { transform: translateY(-16px); box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const styles = {
    root: { margin: 0, padding: 0, background: "#f5f1ed", minHeight: "100vh" },

    header: { padding: "10px 20px 60px", textAlign: "center" },
    title: { fontFamily: "'Georgia', serif", fontSize: "52px", fontWeight: 300, color: "#2d2d2d", margin: "0 0 20px 0" },
    underline: { height: "5px", width: "90px", backgroundColor: "#d4a574", margin: "0 auto 40px" },

    filterBar: {
      display: "flex",
      justifyContent: "center",
      gap: "18px",
      margin: "0 auto 60px",
      flexWrap: "wrap",
      maxWidth: "1000px",
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
      minWidth: "150px",
    }),

    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 40px 120px",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    },

    card: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      transition: "all 0.4s ease",
    },

    cardHeader: {
      padding: "32px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    headerLeft: { display: "flex", flexDirection: "column", gap: "8px" },
    orderId: { fontSize: "24px", fontWeight: 600, color: "#2d2d" },
    orderTime: { fontSize: "16px", color: "#7f8c8d" },

    statusBadge: (color) => ({
      padding: "10px 24px",
      borderRadius: "50px",
      fontWeight: 600,
      fontSize: "15px",
      color: "white",
      backgroundColor: color,
    }),

    cardBody: {
      padding: "0 40px 32px",
    },

    totalPrice: {
      textAlign: "right",
      fontSize: "28px",
      fontWeight: 600,
      color: "#d4a574",
      margin: "20px 0 30px",
    },

    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
    },

    btnView: {
      padding: "14px 32px",
      background: "#2d2d2d",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: "15px",
    },

    btnCancel: {
      padding: "14px 32px",
      background: "transparent",
      color: "#e74c3c",
      border: "2px solid #e74c3c",
      borderRadius: "8px",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: "15px",
    },

    empty: { textAlign: "center", padding: "140px 20px", color: "#888", fontSize: "28px" },
    loading: { textAlign: "center", padding: "180px 0", fontSize: "28px", color: "#888" },
  }

  if (loading) return <div style={styles.loading}>Đang tải đơn hàng...</div>

  if (orders.length === 0) {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <h1 style={styles.title}>Đơn Hàng Của Tôi</h1>
          <div style={styles.underline}></div>

          <div style={styles.filterBar}>
            <button style={styles.filterBtn(activeFilter === "all")} onClick={() => setActiveFilter("all")}>Tất cả</button>
            <button style={styles.filterBtn(activeFilter === "pending")} onClick={() => setActiveFilter("pending")}>Chờ xác nhận</button>
            <button style={styles.filterBtn(activeFilter === "confirmed")} onClick={() => setActiveFilter("confirmed")}>Đã xác nhận</button>
            <button style={styles.filterBtn(activeFilter === "cancelled")} onClick={() => setActiveFilter("cancelled")}>Đã hủy</button>
          </div>
        </div>

        <div style={styles.empty}>
          <p>Bạn chưa có đơn hàng nào</p>
          <button
            style={{ marginTop: "40px", padding: "18px 70px", background: "#d4a574", color: "#fff", border: "none", borderRadius: "50px", fontSize: "18px", fontWeight: 600, cursor: "pointer" }}
            onClick={() => navigate("/sanPham")}
          >
            Khám Phá Sản Phẩm
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.root}>
      <div style={styles.header}>
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
      </div>

      <div style={styles.container}>
        {filteredOrders.map((order) => {
          const status = getStatusInfo(order.status)

          return (
            <div key={order.id} className="order-card" style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.headerLeft}>
                  <div style={styles.orderId}>Đơn hàng #{order.id}</div>
                  <div style={styles.orderTime}>lúc {formatDateTime(order.date || order.ngayDatHang)}</div>
                </div>

                <span style={styles.statusBadge(status.color)}>{status.text}</span>
              </div>

              <div style={styles.cardBody}>
               

                <div style={styles.actions}>
                  <button
                    style={styles.btnView}
                    onClick={() => navigate(`/donHangND/detail/${order.id}`)}
                  >
                    Xem chi tiết
                  </button>

                  {order.status === 0 && (
                    <button style={styles.btnCancel} onClick={() => cancelOrder(order.id)}>
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}