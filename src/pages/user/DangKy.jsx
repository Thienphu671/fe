// src/pages/auth/Register.jsx (hoặc đường dẫn bạn đang dùng)
"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    photoFile: null,
  })

  const [fileError, setFileError] = useState("")
  const [preview, setPreview] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const maxSize = 20 * 1024 * 1024 // 20MB

    if (file) {
      if (file.size > maxSize) {
        setFileError("Ảnh quá lớn (tối đa 20MB)")
        setPreview("")
        return
      }
      setFileError("")

      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)

      setUserData(prev => ({ ...prev, photoFile: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    const formData = new FormData()
    formData.append("email", userData.email)
    formData.append("password", userData.password)
    formData.append("fullname", userData.fullname)
    formData.append("phoneNumber", userData.phoneNumber)
    if (userData.photoFile) {
      formData.append("photoFile", userData.photoFile)
    }

    try {
      await axios.post("http://localhost:8080/auth/api/DangKy", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setSuccessMessage("Đăng ký thành công! Đang chuyển về trang đăng nhập...")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!"
      )
    }
  }

  // Chuyển hướng sau khi đăng ký thành công
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/auth/login")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, navigate])

  return (
    <div
      style={{
        backgroundImage: `url('/img/chup-anh-san-pham-phang-1596647399.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Khung đăng ký – giống hệt đăng nhập */}
      <div
        className="p-5 rounded shadow-lg"
        style={{
          maxWidth: "460px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <h2
          className="mb-5 text-center"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "42px",
            fontWeight: 300,
            color: "#2d2d2d",
          }}
        >
          Đăng Ký Tài Khoản
        </h2>

        {errorMessage && (
          <div
            className="alert alert-danger mb-4 text-center py-3 rounded"
            style={{ background: "#fadbd8", color: "#e74c3c", border: "none" }}
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            className="alert alert-success mb-4 text-center py-3 rounded"
            style={{ background: "#d5f5e3", color: "#27ae60", border: "none" }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullname"
              value={userData.fullname}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Họ và tên"
              required
              style={{
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "16px",
              }}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Email"
              required
              style={{
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "16px",
              }}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Mật khẩu"
              required
              style={{
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "16px",
              }}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              placeholder="Số điện thoại"
              required
              style={{
                borderRadius: "12px",
                padding: "14px 18px",
                fontSize: "16px",
              }}
            />
          </div>

          <div className="mb-4">
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: 600,
                color: "#2d2d2d",
              }}
            >
              Ảnh đại diện (tùy chọn)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
              style={{ padding: "10px" }}
            />
            {fileError && (
              <p style={{ color: "#e74c3c", marginTop: "8px" }}>{fileError}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  marginTop: "15px",
                  maxWidth: "120px",
                  borderRadius: "12px",
                  border: "3px solid #d4a574",
                }}
              />
            )}
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100 mb-4"
            style={{
              background: "#d4a574",
              border: "none",
              borderRadius: "50px",
              padding: "16px",
              fontSize: "18px",
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(212,165,116,0.4)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#c49a6c")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#d4a574")}
          >
            Đăng Ký
          </button>

          <div className="text-center">
            <span style={{ color: "#555" }}>Đã có tài khoản? </span>
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="btn btn-link p-0"
              style={{
                color: "#d4a574",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Đăng nhập ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register