// src/pages/auth/ForgotPassword.jsx
"use client"

import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// ĐƯỜNG DẪN CHÍNH XÁC 100% CHO CẤU TRÚC HIỆN TẠI CỦA BẠN
import Navbar from "../../components/nguoidung/Navbar"
// Nếu vẫn lỗi, thử dòng này (tùy độ sâu thư mục):
// import Navbar from "../../../components/nguoidung/Navbar"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    try {
      const formData = new URLSearchParams()
      formData.append("email", email)

      const res = await axios.post('http://localhost:8080/api/quenmatkhau', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      setMessage(res.data.message || 'Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn!')
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Không tìm thấy email này. Vui lòng kiểm tra lại!'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

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
          padding: "140px 20px 60px",
        }}
      >
        <div
          className="p-5 rounded shadow-2xl"
          style={{
            maxWidth: "480px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            className="mb-5 text-center"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "46px",
              fontWeight: 300,
              color: "#2d2d2d",
              letterSpacing: "1px",
            }}
          >
            Quên Mật Khẩu?
          </h2>

          <p className="text-center mb-5" style={{ color: "#555", fontSize: "17px", lineHeight: "1.6" }}>
            Đừng lo! Chỉ cần nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu ngay.
          </p>

          {message && (
            <div
              className="alert mb-5 text-center py-4 rounded"
              style={{
                background: message.includes("gửi") ? "#d5f5e3" : "#fadbd8",
                color: message.includes("gửi") ? "#27ae60" : "#e74c3c",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control form-control-lg"
                placeholder="Nhập email của bạn"
                required
                disabled={loading}
                style={{
                  borderRadius: "16px",
                  padding: "18px 22px",
                  fontSize: "17px",
                  border: "2px solid #eee",
                  transition: "all 0.3s",
                  textAlign: "center",
                }}
                onFocus={(e) => e.target.style.borderColor = "#d4a574"}
                onBlur={(e) => e.target.style.borderColor = "#eee"}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              style={{
                width: "100%",
                padding: "18px",
                background: (!email || loading) ? "#ccc" : "#d4a574",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "19px",
                fontWeight: 600,
                cursor: (!email || loading) ? "not-allowed" : "pointer",
                boxShadow: "0 12px 30px rgba(212,165,116,0.4)",
                transition: "all 0.3s",
                letterSpacing: "1px",
              }}
              onMouseOver={(e) => {
                if (email && !loading) e.currentTarget.style.background = "#c49a6c"
              }}
              onMouseOut={(e) => {
                if (email && !loading) e.currentTarget.style.background = "#d4a574"
              }}
            >
              {loading ? "Đang gửi..." : "Gửi Link Đặt Lại Mật Khẩu"}
            </button>
          </form>

          <div className="text-center mt-5">
            <button
              onClick={() => navigate("/auth/login")}
              style={{
                color: "#d4a574",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onMouseOver={(e) => e.currentTarget.style.color = "#b58556"}
              onMouseOut={(e) => e.currentTarget.style.color = "#d4a574"}
            >
              Quay lại đăng nhập
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword