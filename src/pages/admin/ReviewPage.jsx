"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { getProductById } from "../../api/sanPhamND"
import { fetchUsers } from "../../api/userApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faCalendarAlt, faUser, faSearch } from "@fortawesome/free-solid-svg-icons"

const ITEMS_PER_PAGE = 6

const ReviewAdmin = () => {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // Bộ lọc
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [starFilter, setStarFilter] = useState("all") // "all", "1", "2", ..., "5"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy đánh giá
        const reviewRes = await axios.get("http://localhost:8080/api/danhgia/all")
        const rawReviews = reviewRes.data || []

        // Lấy người dùng
        const userRes = await fetchUsers("", "")
        const userList = userRes.data || []
        const userMap = {}
        userList.forEach(u => {
          userMap[u.id] = u.fullname || u.email || "Khách ẩn danh"
        })

        // Lấy sản phẩm + gắn tên khách
        const reviewsWithData = await Promise.all(
          rawReviews.map(async (review) => {
            let product = { ten: "Sản phẩm không xác định", hinh: null }
            const productId = review.sanPham?.id || review.sanPhamId || review.sanphamId

            if (productId) {
              try {
                product = await getProductById(productId)
              } catch (err) {
                product = { ten: "Sản phẩm đã xóa", hinh: null }
              }
            }

            const customerName = userMap[review.taiKhoanId] || `Khách #${review.taiKhoanId || "Ẩn danh"}`

            return {
              ...review,
              productDetail: product,
              customerName: customerName,
              dateObj: new Date(review.ngayDanhgia) // để dễ lọc
            }
          })
        )

        setReviews(reviewsWithData)
        setFilteredReviews(reviewsWithData)
        setLoading(false)
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Lọc theo ngày + sao
  useEffect(() => {
    let filtered = reviews

    // Lọc theo sao
    if (starFilter !== "all") {
      filtered = filtered.filter(r => r.sao === Number(starFilter))
    }

    // Lọc theo ngày
    if (fromDate) {
      const from = new Date(fromDate)
      filtered = filtered.filter(r => r.dateObj >= from)
    }
    if (toDate) {
      const to = new Date(toDate)
      to.setHours(23, 59, 59, 999)
      filtered = filtered.filter(r => r.dateObj <= to)
    }

    setFilteredReviews(filtered)
    setCurrentPage(1) // reset về trang 1 khi lọc
  }, [fromDate, toDate, starFilter, reviews])

  const getImageUrl = (product) => {
    if (!product || !product.hinh) return null
    return `http://localhost:8080${product.hinh}`
  }

  // Phân trang
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentReviews = filteredReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getVisiblePages = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 4) pages.push("...")
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 3) pages.push("...")
      if (totalPages > 1) pages.push(totalPages)
    }
    return pages
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .review-admin-root { background:#f5f1ed; min-height:100vh; padding:60px 5% 160px; }
      .review-admin-container { max-width:1600px; margin:0 auto; }
      .review-admin-title { font-family:'Georgia', serif; font-size:52px; font-weight:300; color:#2d2d2d; text-align:center; margin-bottom:40px; }
      
      /* BỘ LỌC */
      .filter-bar { 
        background:#fff; padding:30px; border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.08); 
        margin-bottom:60px; display:flex; flex-wrap:wrap; gap:20px; align-items:end; justify-content:center;
      }
      .filter-group { display:flex; flex-direction:column; gap:8px; }
      .filter-group label { font-weight:600; color:#333; }
      .filter-input, .filter-select { 
        padding:12px 16px; border:2px solid #ddd; border-radius:12px; font-size:16px; 
        transition:all 0.3s; min-width:200px;
      }
      .filter-input:focus, .filter-select:focus { border-color:#d4a574; outline:none; }
      .filter-btn { 
        padding:12px 32px; background:#d4a574; color:#fff; border:none; border-radius:50px; 
        font-weight:600; cursor:pointer; display:flex; align-items:center; gap:10px; transition:all 0.3s;
      }
      .filter-btn:hover { background:#c49a6c; transform:translateY(-4px); box-shadow:0 10px 20px rgba(212,165,116,0.4); }

      .reviews-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(420px,1fr)); gap:50px; }
      .review-card { background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08); transition:all 0.5s ease; }
      .review-card:hover { transform:translateY(-12px); box-shadow:0 20px 50px rgba(0,0,0,0.15); }
      .review-header { padding:32px 32px 20px; border-bottom:1px solid #eee; }
      .review-product { display:flex; align-items:center; gap:20px; margin-bottom:16px; }
      .review-product-img { width:80px; height:80px; object-fit:cover; border-radius:16px; box-shadow:0 6px 20px rgba(0,0,0,0.1); background:#f0f0f0; }
      .review-product-name { font-family:'Georgia', serif; font-size:24px; font-weight:300; color:#2d2d2d; margin:0; }
      .review-user-name { font-size:22px; font-weight:700; color:#333; display:flex; align-items:center; gap:12px; margin:16px 0 8px; }
      .review-stars { color:#ffc107; font-size:20px; margin:12px 0; }
      .review-date { color:#999; font-size:15px; display:flex; align-items:center; gap:8px; margin-top:12px; }
      .review-content-label { font-weight:600; color:#2d2d2d; margin:24px 32px 8px; font-size:16px; }
      .review-content { padding:0 32px 32px; font-size:17px; line-height:1.8; color:#444; font-style:italic; background:rgba(255,255,255,0.6); border-radius:0 0 24px 24px; }
      .no-reviews p { font-size:26px; color:#888; text-align:center; padding:120px 40px; background:rgba(255,255,255,0.6); border-radius:24px; }
      .loading { text-align:center; padding:150px 0; font-size:32px; color:#888; }
      .pagination-info { text-align:center; color:#666; margin:40px 0 20px; font-size:16px; }
      .pagination { display:flex; justify-content:center; align-items:center; gap:16px; margin:40px 0 100px; flex-wrap:wrap; }
      .page-btn { width:56px; height:56px; border-radius:50%; border:none; background:#fff; color:#555; font-size:18px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.1); transition:all 0.3s ease; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      .page-btn:hover { background:#d4a574; color:#fff; transform:translateY(-4px); }
      .page-btn.active { background:#d4a574; color:#fff; box-shadow:0 10px 30px rgba(212,165,116,0.4); }
      .page-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
      .page-dots { color:#aaa; font-size:24px; padding:0 8px; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [currentPage])

  if (loading) {
    return <div className="review-admin-root"><div className="loading">Đang tải đánh giá...</div></div>
  }

  return (
    <div className="review-admin-root">
      <div className="review-admin-container">
        <h1 className="review-admin-title">Quản Lý Đánh Giá Khách Hàng</h1>

        {/* BỘ LỌC */}
        <div className="filter-bar">
          <div className="filter-group">
            <label>Từ ngày</label>
            <input type="date" className="filter-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>Đến ngày</label>
            <input type="date" className="filter-input" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>Số sao</label>
            <select className="filter-select" value={starFilter} onChange={(e) => setStarFilter(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>
          </div>
          <button className="filter-btn" onClick={() => setCurrentPage(1)}>
            <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
          </button>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="no-reviews">
            <p>Không tìm thấy đánh giá nào phù hợp</p>
          </div>
        ) : (
          <>
            <div className="reviews-grid">
              {currentReviews.map((review, index) => {
                const product = review.productDetail
                const imageUrl = getImageUrl(product)

                return (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <div className="review-product">
                        {imageUrl ? (
                          <img src={imageUrl} alt={product?.ten} className="review-product-img" />
                        ) : (
                          <div className="review-product-img" style={{ background:"#f0f0f0", display:"flex", alignItems:"center", justifyContent:"center", color:"#aaa", fontSize:"12px" }}>
                            No Image
                          </div>
                        )}
                        <h3 className="review-product-name">
                          {product?.ten || "Sản phẩm đã xóa"}
                        </h3>
                      </div>

                      <div className="review-user-name">
                        <FontAwesomeIcon icon={faUser} style={{ color: "#d4a574" }} />
                        {review.customerName}
                      </div>

                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            color={i < (review.sao || 0) ? "#ffc107" : "#e0e0e0"}
                            style={{ marginRight: 4 }}
                          />
                        ))}
                      </div>

                      <div className="review-date">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        {new Date(review.ngayDanhgia).toLocaleDateString("vi-VN")}
                      </div>
                    </div>

                    <div>
                      <div className="review-content-label">Nội dung đánh giá:</div>
                      <div className="review-content">
                        "{review.danhgia || "Không có nội dung"}"
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pagination-info">
              Trang <strong>{currentPage}</strong> / {totalPages} ({filteredReviews.length} đánh giá hiển thị)
            </div>

            <div className="pagination">
              <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                ←
              </button>

              {getVisiblePages().map((page, idx) =>
                page === "..." ? (
                  <span key={idx} className="page-dots">...</span>
                ) : (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ReviewAdmin