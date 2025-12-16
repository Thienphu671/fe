// src/pages/user/OrderDetail.jsx
"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom' // Thêm useSearchParams
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const OrderDetail = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams() // Lấy query params
  const navigate = useNavigate()
  const [orderDetails, setOrderDetails] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('')
  const [address, setAddress] = useState('')
  const [orderDate, setOrderDate] = useState(null)
  const [productReviews, setProductReviews] = useState([])
  const [message, setMessage] = useState('')

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    // Lấy ngày từ URL trước (do OrderList truyền qua)
    const dateFromUrl = searchParams.get("date")
    if (dateFromUrl) {
      setOrderDate(decodeURIComponent(dateFromUrl))
    }

    axios.get(`http://localhost:8080/api/donHangND/detail/${id}`)
      .then(res => {
        const data = res.data
        console.log("Dữ liệu chi tiết đơn hàng:", data)

        const details = data.orderDetails?.orderDetails || []

        setOrderDetails(details)
        setTotalPrice(data.orderDetails?.totalPrice || data.totalPrice || 0)

        // Nếu không có ngày từ URL, thử lấy từ API (fallback)
        if (!dateFromUrl) {
          setOrderDate(data.date || data.orderDetails?.orderDate || null)
        }

        setUser(data.user)
        setStatus(data.status || "Chưa xác định")
        setAddress(data.address || "Chưa có")

        const initialReviews = details.map(item => ({
          productId: item.productId,
          rating: 0,
          review: '',
          submitted: false,
        }))
        setProductReviews(initialReviews)
      })
      .catch(err => {
        console.error("Lỗi tải chi tiết đơn:", err)
        setMessage("Không thể tải chi tiết đơn hàng")
      })
  }, [id, searchParams])

  const handleRating = (index, rating) => {
    const updated = [...productReviews]
    updated[index].rating = rating
    setProductReviews(updated)
  }

  const handleReview = (index, value) => {
    const updated = [...productReviews]
    updated[index].review = value
    setProductReviews(updated)
  }

  const submitReview = (index) => {
    const review = productReviews[index]
    if (!review.productId || review.rating === 0 || !review.review.trim()) {
      setMessage("Vui lòng chọn sao và nhập đánh giá")
      setTimeout(() => setMessage(''), 3000)
      return
    }

    const payload = {
      donHangId: Number(id),
      taiKhoanId: Number(userId),
      sanPhamId: review.productId,
      sao: review.rating,
      danhgia: review.review.trim()
    }

    axios.post('http://localhost:8080/api/danhgia/submit', payload)
      .then(() => {
        const updated = [...productReviews]
        updated[index].submitted = true
        setProductReviews(updated)
        setMessage("Đánh giá thành công!")
        setTimeout(() => setMessage(''), 3000)
      })
      .catch(() => {
        setMessage("Bạn đã đánh giá sản phẩm này rồi!")
        setTimeout(() => setMessage(''), 4000)
      })
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0; padding:0; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .product-card:hover { transform: translateY(-16px); box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
      .product-card:hover img { transform: scale(1.1); }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const formatDateTime = (dateString) => {
    if (!dateString) return "Chưa có thông tin"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Chưa có thông tin"
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const isPaid = status === "Đã thanh toán" || status === "Đã xác nhận"

  if (!user || orderDetails.length === 0) {
    return <div style={{ textAlign:"center", padding:"150px 0", fontSize:"28px", color:"#888" }}>Đang tải...</div>
  }

  return (
    <div style={{ background:"#f5f1ed", minHeight:"100vh", paddingBottom:"120px" }}>
      <div style={{ padding:"10px 40px 60px", textAlign:"center" }}>
        <h1 style={{ fontFamily:"'Georgia', serif", fontSize:"52px", fontWeight:300, color:"#2d2d2d", margin:"0 0 20px 0" }}>
          Chi Tiết Đơn Hàng #{id}
        </h1>
        <div style={{ height:"5px", width:"90px", backgroundColor:"#d4a574", margin:"0 auto" }}></div>
      </div>

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 40px" }}>
        <div style={{
          background:"#fff",
          borderRadius:"20px",
          padding:"36px 40px",
          marginBottom:"40px",
          boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
        }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px,1fr))", gap:"20px", fontSize:"17px" }}>
            <div><strong>Khách hàng:</strong> {user.fullname}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>SĐT:</strong> {user.phoneNumber}</div>
            <div><strong>Địa chỉ:</strong> {address}</div>
            <div><strong>Ngày đặt:</strong> {formatDateTime(orderDate)}</div>
            <div>
              <strong>Trạng thái:</strong>{" "}
              <span style={{
                padding:"8px 20px",
                borderRadius:"50px",
                backgroundColor: isPaid ? "#27ae60" : status === "Đã hủy" ? "#e74c3c" : "#f39c12",
                color:"white",
                fontWeight:600,
                fontSize:"15px",
                display:"inline-block"
              }}>
                {status}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gap:"32px" }}>
          {orderDetails.map((item, idx) => {
            const review = productReviews[idx] || {}

            return (
              <div key={idx} className="product-card" style={{
                background:"#fff",
                borderRadius:"20px",
                overflow:"hidden",
                boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
                transition:"all 0.4s ease",
                display:"flex",
                gap:"30px",
                padding:"32px",
                alignItems:"center"
              }}>
                <img
src={`http://localhost:8080/uploads/${item.productImage || item.hinhAnh}`}  
                  alt={item.productName || item.tenSanPham}
                  style={{
                    width:"180px",
                    height:"180px",
                    objectFit:"cover",
                    borderRadius:"16px",
                    transition:"transform 0.6s ease-out"
                  }}
                  onError={e => e.target.src = "https://via.placeholder.com/180/f5f1ed/999?text=No+Image"}
                />

                <div style={{ flex:1 }}>
                  <h3 style={{ fontFamily:"'Georgia', serif", fontSize:"26px", fontWeight:300, color:"#2d2d2d", margin:"0 0 12px 0" }}>
                    {item.productName || item.tenSanPham}
                  </h3>
                  <p style={{ fontSize:"18px", color:"#555", margin:"8px 0" }}>
                    Giá: {Number(item.price || item.gia).toLocaleString("vi-VN")} đ
                  </p>
                  <p style={{ fontSize:"18px", color:"#555" }}>
                    Số lượng: {item.quantity || item.soLuong}
                  </p>
                  <p style={{ fontSize:"22px", fontWeight:600, color:"#d4a574", marginTop:"16px" }}>
                    Thành tiền: {(Number(item.price || item.gia) * Number(item.quantity || item.soLuong)).toLocaleString("vi-VN")} đ
                  </p>

                  {isPaid && !review.submitted && (
                    <div style={{ marginTop:"24px" }}>
                      <p style={{ margin:"0 0 12px 0", fontWeight:600, color:"#2d2d2d" }}>
                        Đánh giá sản phẩm:
                      </p>
                      <div style={{ marginBottom:"12px" }}>
                        {[1,2,3,4,5].map(star => (
                          <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            style={{ fontSize:"26px", cursor:"pointer", marginRight:"8px" }}
                            color={star <= review.rating ? "#ffd700" : "#e0e0e0"}
                            onClick={() => handleRating(idx, star)}
                          />
                        ))}
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Viết đánh giá của bạn..."
                        value={review.review || ""}
                        onChange={e => handleReview(idx, e.target.value)}
                        style={{
                          width:"100%",
                          padding:"14px",
                          borderRadius:"12px",
                          border:"2px solid #eee",
                          fontSize:"16px",
                          marginBottom:"14px"
                        }}
                      />
                      <button
                        onClick={() => submitReview(idx)}
                        style={{
                          padding:"12px 36px",
                          background:"#d4a574",
                          color:"white",
                          border:"none",
                          borderRadius:"50px",
                          fontWeight:600,
                          cursor:"pointer",
                          fontSize:"14px"
                        }}
                      >
                        Gửi đánh giá
                      </button>
                    </div>
                  )}
                  {isPaid && review.submitted && (
                    <div style={{ marginTop:"24px", color:"#27ae60", fontWeight:600, fontSize:"17px" }}>
                      Đã đánh giá sản phẩm này
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          textAlign:"right",
          fontSize:"32px",
          fontWeight:600,
          color:"#d4a574",
          margin:"60px 0 40px"
        }}>
          Tổng cộng: {Number(totalPrice).toLocaleString("vi-VN")} đ
        </div>

        <div style={{ textAlign:"center", marginBottom:"60px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding:"18px 80px",
              background:"#d4a574",
              color:"white",
              border:"none",
              borderRadius:"50px",
              fontSize:"18px",
              fontWeight:600,
              cursor:"pointer",
              boxShadow:"0 12px 30px rgba(212,165,116,0.4)"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#c49a6c"}
            onMouseOut={e => e.currentTarget.style.background = "#d4a574"}
          >
            Quay lại
          </button>
        </div>

        {message && (
          <div style={{
            position:"fixed",
            bottom:"30px",
            left:"50%",
            transform:"translateX(-50%)",
            background:message.includes("thành công") ? "#27ae60" : "#e74c3c",
            color:"white",
            padding:"16px 40px",
            borderRadius:"50px",
            fontWeight:600,
            zIndex:9999,
            boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetail