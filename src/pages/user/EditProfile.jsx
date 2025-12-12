"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faPhone, faEnvelope, faEdit, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

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

  // RESET MẠNH NHẤT CÓ THỂ – SÁT NAVBAR 100%
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      /* RESET TỔNG LỰC – KHÔNG CHO PHÉP BẤT KỲ KHOẢNG TRẮNG NÀO */
      html, body, #root, div, section, .profile-page, .profile-page * {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }

      body, #root, .profile-page {
        background: #f5f1ed !important;
        min-height: 100vh !important;
        width: 100% !important;
        overflow-x: hidden !important;
      }

      /* XÓA HẾT KHOẢNG TRẮNG TỪ LAYOUT CHUNG */
      .container, .container-fluid, [class*="container"], main, .App, .layout {
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100% !important;
      }

      /* ĐẨY NỘI DUNG LÊN SÁT NAVBAR */
      .profile-page > div:first-child,
      .profile-header {
        margin-top: 0 !important;
        padding-top: 30px !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  if (loading) {
    return (
      <div className="profile-page" style={{ background: "#f5f1ed", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "28px", color: "#888" }}>Đang tải thông tin...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="profile-page">
      {/* Tiêu đề sát navbar */}
      <div style={{ textAlign: "center", padding: "30px 20px 50px" }}>
        <h1 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "52px",
          fontWeight: 300,
          color: "#2d2d2d",
          margin: "0 0 20px 0"
        }}>
          Thông Tin Cá Nhân
        </h1>
        <div style={{ height: "5px", width: "90px", background: "#d4a574", margin: "0 auto" }}></div>
      </div>

      {/* Khung chính */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{
          background: "#fff",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
          padding: "70px 60px",
          textAlign: "center"
        }}>
          {/* Avatar */}
          <div style={{ marginBottom: "50px", position: "relative", display: "inline-block" }}>
            <img
              src={user.photo ? `http://localhost:8080/uploads/${user.photo}` : "https://via.placeholder.com/220/f5f1ed/999?text=AVT"}
              alt="Avatar"
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "12px solid #d4a574",
                boxShadow: "0 25px 60px rgba(212,165,116,0.5)"
              }}
            />
            <div style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              background: "#d4a574",
              color: "white",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 10px 25px rgba(212,165,116,0.6)"
            }}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>

          {/* Thông tin */}
          <div style={{ marginBottom: "60px", fontSize: "21px", lineHeight: "2.6" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", marginBottom: "28px" }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#d4a574", width: "26px" }} />
              <span style={{ color: "#2d2d2d", fontWeight: 600 }}>Email:</span>
              <span style={{ color: "#444", fontWeight: 500 }}>{user.email}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", marginBottom: "28px" }}>
              <FontAwesomeIcon icon={faUser} style={{ color: "#d4a574", width: "26px" }} />
              <span style={{ color: "#2d2d2d", fontWeight: 600 }}>Họ tên:</span>
              <span style={{ color: "#444", fontWeight: 500 }}>{user.fullname || "Chưa cập nhật"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px" }}>
              <FontAwesomeIcon icon={faPhone} style={{ color: "#d4a574", width: "26px" }} />
              <span style={{ color: "#2d2d2d", fontWeight: 600 }}>Số điện thoại:</span>
              <span style={{ color: "#444", fontWeight: 500 }}>{user.phoneNumber || "Chưa cập nhật"}</span>
            </div>
          </div>

          {/* Nút hành động */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", alignItems: "center" }}>
            <button
              onClick={() => navigate("/editProfile")}
              style={{
                width: "100%",
                maxWidth: "460px",
                padding: "20px 40px",
                background: "#d4a574",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "19px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 14px 40px rgba(212,165,116,0.5)",
                transition: "all 0.4s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#c49564"}
              onMouseOut={(e) => e.currentTarget.style.background = "#d4a574"}
            >
              <FontAwesomeIcon icon={faEdit} />
              Chỉnh sửa thông tin
            </button>

            <button
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                maxWidth: "460px",
                padding: "20px 40px",
                background: "#2d2d2d",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "19px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 14px 40px rgba(45,45,45,0.3)",
                transition: "all 0.4s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#111"}
              onMouseOut={(e) => e.currentTarget.style.background = "#2d2d2d"}
            >
              <FontAwesomeIcon icon={faHome} />
              Về Trang Chủ
            </button>

            <button
              onClick={() => {
                localStorage.clear()
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                navigate("/auth/login")
              }}
              style={{
                width: "100%",
                maxWidth: "460px",
                padding: "20px 40px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "19px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 14px 40px rgba(231,76,60,0.5)",
                transition: "all 0.4s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#c0392b"}
              onMouseOut={(e) => e.currentTarget.style.background = "#e74c3c"}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Đăng xuất
            </button>
          </div>

          <div style={{ marginTop: "60px", color: "#888", fontSize: "16px", fontStyle: "italic" }}>
            Shop Thời Trang – Nơi phong cách gặp gỡ sự tinh tế
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThongTinCaNhan