"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faKey, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const ChangePassword = () => {
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const token = localStorage.getItem("token")

  // RESET SÁT NAVBAR NHƯ CÁC TRANG KHÁC
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root, .changepass-page {
        margin: 0 !important;
        padding: 0 !important;
        background: #f5f1ed !important;
        min-height: 100vh !important;
        overflow-x: hidden !important;
      }
      .changepass-container {
        max-width: 100% !important;
        padding: 0 20px !important;
        margin: 0 auto !important;
      }
      .changepass-header {
        padding: 30px 0 50px !important;
        text-align: center;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!")
      setMessage("")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await axios.post(
        "http://localhost:8080/api/doiMatKhau/submit",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.message === "Đổi mật khẩu thành công!") {
        setMessage("Đổi mật khẩu thành công!")
        setError("")
        setTimeout(() => navigate("/thongtin"), 2000)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại!")
      setMessage("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="changepass-page" style={{ background: "#f5f1ed", minHeight: "100vh" }}>
      <div className="changepass-container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
        {/* Tiêu đề giống hệt các trang khác */}
        <div className="changepass-header">
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "52px",
            fontWeight: 300,
            color: "#2d2d2d",
            margin: "0 0 20px 0"
          }}>
            Đổi Mật Khẩu
          </h1>
          <div style={{ height: "5px", width: "90px", background: "#d4a574", margin: "0 auto" }}></div>
        </div>

        {/* Form đổi mật khẩu – siêu đẹp */}
        <div style={{
          maxWidth: "560px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
          padding: "60px 50px"
        }}>
          <form onSubmit={handleSubmit}>
            {/* Thông báo thành công */}
            {message && (
              <div style={{
                background: "#d4edda",
                color: "#155724",
                padding: "16px 20px",
                borderRadius: "16px",
                marginBottom: "30px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}>
                <FontAwesomeIcon icon={faCheckCircle} />
                {message}
              </div>
            )}

            {/* Lỗi */}
            {error && (
              <div style={{
                background: "#f8d7da",
                color: "#721c24",
                padding: "16px 20px",
                borderRadius: "16px",
                marginBottom: "30px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}>
                <FontAwesomeIcon icon={faExclamationCircle} />
                {error}
              </div>
            )}

            {/* Mật khẩu cũ */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "18px",
                color: "#2d2d2d",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <FontAwesomeIcon icon={faLock} style={{ color: "#d4a574" }} />
                Mật khẩu cũ
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                required
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  border: "2px solid #ddd",
                  borderRadius: "16px",
                  fontSize: "17px",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#d4a574"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
            </div>

            {/* Mật khẩu mới */}
            <div style={{ marginBottom: "40px" }}>
              <label style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "18px",
                color: "#2d2d2d",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <FontAwesomeIcon icon={faKey} style={{ color: "#d4a574" }} />
                Mật khẩu mới
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                required
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  border: "2px solid #ddd",
                  borderRadius: "16px",
                  fontSize: "17px",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#d4a574"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
            </div>

            {/* Nút xác nhận */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "22px",
                background: isLoading ? "#c49564" : "#d4a574",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "20px",
                fontWeight: 600,
                cursor: isLoading ? "not-allowed" : "pointer",
                boxShadow: "0 16px 45px rgba(212,165,116,0.5)",
                transition: "all 0.4s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px"
              }}
            >
              {isLoading ? (
                <>Đang xử lý...</>
              ) : (
                <>
                  Xác Nhận Đổi Mật Khẩu
                </>
              )}
            </button>

            {/* Nút quay lại */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "18px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "50px",
                fontSize: "18px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#5a6268"}
              onMouseOut={(e) => e.currentTarget.style.background = "#6c757d"}
            >
              Quay Lại
            </button>
          </form>

          {/* Footer nhỏ */}
          <div style={{ marginTop: "50px", textAlign: "center", color: "#888", fontSize: "15px" }}>
            <p>Shop Thời Trang – Bảo mật thông tin là ưu tiên hàng đầu</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword