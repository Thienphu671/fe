// src/pages/auth/LoginPage.jsx (hoặc đường dẫn bạn đang dùng)
"use client"

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const response = await axios.post('http://localhost:8080/auth/api/login', {
        email,
        password
      })

      const { token, user, isAdmin } = response.data

      if (!token || !user) throw new Error('Đăng nhập thất bại')

      // Lưu thông tin
      document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userId', user.id)
      localStorage.setItem('userName', user.fullname)
      localStorage.setItem('isAdmin', isAdmin)

      window.dispatchEvent(new Event("userNameUpdated"))

      // Chuyển hướng
      if (isAdmin) {
        navigate('/admin/AdminNavbar')
      } else {
        navigate('/trangChu/form')
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 
        error.message || 
        'Email hoặc mật khẩu không đúng!'
      )
    }
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
        padding: "20px",
      }}
    >
      {/* Khung đăng nhập đẹp lung linh */}
      <div
        className="p-5 rounded shadow-2xl"
        style={{
          maxWidth: "460px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* Tiêu đề */}
        <h2
          className="mb-5 text-center"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "48px",
            fontWeight: 300,
            color: "#2d2d2d",
            letterSpacing: "1px",
          }}
        >
          Chào Mừng Trở Lại
        </h2>

        {/* Thông báo lỗi */}
        {errorMessage && (
          <div
            className="alert alert-danger mb-4 text-center py-3 rounded"
            style={{
              background: "#fadbd8",
              color: "#e74c3c",
              border: "none",
              fontWeight: 600,
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Nhập email của bạn"
              required
              style={{
                borderRadius: "16px",
                padding: "16px 20px",
                fontSize: "17px",
                border: "2px solid #eee",
                transition: "all 0.3s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#d4a574"}
              onBlur={(e) => e.target.style.borderColor = "#eee"}
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Nhập mật khẩu"
              required
              style={{
                borderRadius: "16px",
                padding: "16px 20px",
                fontSize: "17px",
                border: "2px solid #eee",
                transition: "all 0.3s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#d4a574"}
              onBlur={(e) => e.target.style.borderColor = "#eee"}
            />
          </div>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            className="w-100 mb-4"
            style={{
              padding: "18px",
              background: "#d4a574",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontSize: "20px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 12px 30px rgba(212,165,116,0.4)",
              transition: "all 0.3s",
              letterSpacing: "1px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#c49a6c")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#d4a574")}
          >
            Đăng Nhập
          </button>

          {/* Liên kết đăng ký */}
          <div className="text-center">
            <span style={{ color: "#555", fontSize: "16px" }}>
              Chưa có tài khoản?{" "}
            </span>
            <button
              type="button"
              onClick={() => navigate('/Dangky')}
              style={{
                color: "#d4a574",
                fontWeight: 600,
                background: "none",
                border: "none",
                textDecoration: "underline",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#b58556")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#d4a574")}
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage