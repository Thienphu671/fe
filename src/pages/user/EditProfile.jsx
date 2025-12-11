// src/pages/user/ThongTinCaNhan.jsx (hoặc tên file bạn đang dùng)
"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ThongTinCaNhan = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/auth/login")
      return
    }

    axios
      .get("http://localhost:8080/api/thongtin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [navigate])

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "150px 0", fontSize: "28px", color: "#888" }}>
        Đang tải thông tin...
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div
      style={{
        backgroundImage: `url('/img/chup-anh-san-pham-phang-1596647399.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 20px 100px",
      }}
    >
      {/* Khung thông tin cá nhân – đẹp y hệt các trang khác */}
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "28px",
          padding: "50px 40px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
          textAlign: "center",
        }}
      >
        {/* Tiêu đề */}
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "48px",
            fontWeight: 300,
            color: "#2d2d2d",
            margin: "0 0 40px 0",
            letterSpacing: "1px",
          }}
        >
          Thông Tin Cá Nhân
        </h2>

        {/* Avatar */}
        <div style={{ marginBottom: "40px" }}>
          <img
            src={
              user.photo
                ? `http://localhost:8080/uploads/${user.photo}`
                : "https://via.placeholder.com/180/f5f1ed/999?text=Avatar"
            }
            alt="Avatar"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "8px solid #d4a574",
              boxShadow: "0 15px 40px rgba(212,165,116,0.4)",
            }}
          />
        </div>

        {/* Thông tin */}
        <div style={{ fontSize: "19px", lineHeight: "2.2", color: "#333" }}>
          <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#2d2d2d", fontWeight: 600 }}>Email:</strong>{" "}
            <span style={{ color: "#555" }}>{user.email}</span>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#2d2d2d", fontWeight: 600 }}>Họ tên:</strong>{" "}
            <span style={{ color: "#555" }}>{user.fullname}</span>
          </div>
          <div style={{ marginBottom: "40px" }}>
            <strong style={{ color: "#2d2d2d", fontWeight: 600 }}>Số điện thoại:</strong>{" "}
            <span style={{ color: "#555" }}>{user.phoneNumber || "Chưa cập nhật"}</span>
          </div>
        </div>

        {/* Nút chỉnh sửa */}
        <button
          onClick={() => navigate("/editProfile")} // hoặc đường dẫn trang sửa của bạn
          style={{
            padding: "18px 60px",
            background: "#d4a574",
            color: "white",
            border: "none",
            borderRadius: "50px",
            fontSize: "18px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 12px 30px rgba(212,165,116,0.4)",
            transition: "all 0.3s",
            marginBottom: "20px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#c49a6c")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#d4a574")}
        >
          Chỉnh sửa thông tin
        </button>

        <br />

        {/* Nút về trang chủ */}
        <button
          onClick={() => navigate("/trangChu/form")}
          style={{
            padding: "16px 50px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "50px",
            fontSize: "17px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(108,117,125,0.3)",
            transition: "all 0.3s",
            marginBottom: "20px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#5a6268")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#6c757d")}
        >
          Về Trang Chủ
        </button>

        <br />

        {/* Nút đăng xuất */}
        <button
          onClick={() => {
            localStorage.clear()
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            navigate("/auth/login")
          }}
          style={{
            padding: "16px 50px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "50px",
            fontSize: "17px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 10px 25px rgba(231,76,60,0.4)",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#c0392b")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#e74c3c")}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default ThongTinCaNhan