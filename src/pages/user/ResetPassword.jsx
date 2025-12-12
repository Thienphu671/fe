"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Lấy token từ URL
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get("token")

  // RESET SÁT NAVBAR NHƯ CÁC TRANG KHÁC
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root, .resetpass-page {
        margin: 0 !important;
        padding: 0 !important;
        background: #f5f1ed !important;
        min-height: 100vh !important;
        overflow-x: hidden !important;
      }
      .resetpass-container {
        max-width: 100% !important;
        padding: 0 20px !important;
        margin: 0 auto !important;
      }
      .resetpass-header {
        padding: 30px 0 50px !important;
        text-align: center;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!")
      return
    }

    if (!token) {
      setError("Link đặt lại mật khẩu không hợp lệ!")
      return
    }

    setIsLoading(true)

    try {
      const res = await axios.post(
        "http://localhost:8080/api/quenmatkhau/reset-password",
        { password, token },
        { headers: { "Content-Type": "application/json" } }
      )

      setMessage(res.data.message || "Đặt lại mật khẩu thành công!")
      setTimeout(() => navigate("/auth/login"), 3000)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Đặt lại mật khẩu thất bại. Link có thể đã hết hạn!"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="resetpass-page" style={{ background: "#f5f1ed", minHeight: "100vh" }}>
      <div className="resetpass-container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
        {/* Tiêu đề giống hệt các trang khác */}
        <div className="resetpass-header">
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "52px",
            fontWeight: 300,
            color: "#2d2d2d",
            margin: "0 0 20px 0"
          }}>
            Đặt Lại Mật Khẩu
          </h1>
          <div style={{ height: "5px", width: "90px", background: "#d4a574", margin: "0 auto" }}></div>
        </div>

        {/* Form đặt lại mật khẩu – siêu đẹp */}
        <div style={{
          maxWidth: "560px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
          padding: "70px 60px",
          textAlign: "center"
        }}>
          {/* Thông báo thành công */}
          {message && (
            <div style={{
              background: "#d4edda",
              color: "#155724",
              padding: "18px 24px",
              borderRadius: "16px",
              marginBottom: "30px",
              fontSize: "18px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px"
            }}>
              <FontAwesomeIcon icon={faCheckCircle} />
              {message}
              <br />
              <small style={{ marginTop: "8px", display: "block", fontWeight: 400 }}>
                Đang chuyển về trang đăng nhập...
              </small>
            </div>
          )}

          {/* Lỗi */}
          {error && (
            <div style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "18px 24px",
              borderRadius: "16px",
              marginBottom: "30px",
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

          {/* Form */}
          {!message && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "40px" }}>
                <label style={{
                  display: "block",
                  marginBottom: "14px",
                  fontSize: "19px",
                  color: "#2d2d2d",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  justifyContent: "center"
                }}>
                  <FontAwesomeIcon icon={faKey} style={{ color: "#d4a574" }} />
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  required
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    border: "2px solid #ddd",
                    borderRadius: "18px",
                    fontSize: "18px",
                    outline: "none",
                    transition: "all 0.3s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#d4a574"}
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                />
              </div>

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
                    Đặt Lại Mật Khẩu
                  </>
                )}
              </button>

              <div style={{ marginTop: "30px", color: "#888", fontSize: "16px" }}>
                <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
              </div>
            </form>
          )}

          {/* Footer nhỏ */}
          <div style={{ marginTop: "60px", color: "#888", fontSize: "15px", fontStyle: "italic" }}>
            Shop Thời Trang – Nơi phong cách gặp gỡ sự tinh tế
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword