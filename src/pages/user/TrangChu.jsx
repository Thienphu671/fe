"use client"

import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProducts } from "../../api/sanPhamND"

const TrangChu = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await getProducts("", null, "asc", 0, 50)
        let products = response.products || []
        products = products
          .sort((a, b) => Number(b.gia) - Number(a.gia))
          .slice(0, 8)
        setFeaturedProducts(products)
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm nổi bật:", error)
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const handleProductClick = (id) => {
    navigate(`/product/${id}`)
  }

  // FIX 100%: ĐỒNG BỘ HOÀN TOÀN VỚI TRANG SẢN PHẨM
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root, .trangchu-page {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        background: #f5f1ed !important;
        overflow-x: hidden !important;
      }

      /* Đẩy toàn bộ nội dung lên sát navbar */
      .trangchu-page > div,
      .hero-section,
      .hero-content,
      .featured-section {
        margin-top: 0 !important;
        padding-top: 0 !important;
      }

      /* Hero sát navbar */
      .hero-section {
        padding: 20px 40px 80px !important;
        text-align: center;
      }

      /* Tiêu đề + gạch chân giống hệt trang sản phẩm */
      .hero-title {
        font-family: 'Georgia', serif !important;
        font-size: 56px !important;
        font-weight: 300 !important;
        color: #2d2d2d !important;
        margin: 0 0 20px 0 !important;
      }
      .hero-subtitle {
        font-size: 20px !important;
        color: #555 !important;
        max-width: 800px;
        margin: 0 auto 40px !important;
        font-weight: 300 !important;
        line-height: 1.7 !important;
      }

      /* Nút giống hệt trang sản phẩm */
      .btn-view-all, .btn-favorite {
        padding: 18px 52px !important;
        border-radius: 50px !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        text-decoration: none !important;
        display: inline-block !important;
        transition: all 0.4s ease !important;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15) !important;
      }
      .btn-view-all {
        background: #000 !important;
        color: white !important;
      }
      .btn-favorite {
        background: linear-gradient(135deg, #ff6b9d, #ff8fb3) !important;
        color: white !important;
        box-shadow: 0 8px 20px rgba(255,107,157,0.3) !important;
      }

      /* Sản phẩm nổi bật giống hệt trang /sanPham */
      .featured-title {
        font-family: 'Georgia', serif !important;
        font-size: 52px !important;
        font-weight: 300 !important;
        color: #2d2d2d !important;
        text-align: center !important;
        margin: 0 0 20px 0 !important;
      }
      .featured-underline {
        height: 5px !important;
        width: 90px !important;
        background: #d4a574 !important;
        margin: 0 auto 60px !important;
      }

      .featured-grid {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 40px !important;
        padding: 0 40px 120px !important;
      }

      .product-card {
        background: #fff !important;
        border-radius: 20px !important;
        overflow: hidden !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
        transition: all 0.4s ease !important;
        cursor: pointer !important;
      }
      .product-card:hover {
        transform: translateY(-16px) !important;
        box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
      }
      .product-image {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        transition: transform 0.6s ease-out !important;
      }
      .product-card:hover .product-image {
        transform: scale(1.1) !important;
      }
      .product-overlay {
        position: absolute !important;
        inset: 0 !important;
        background: rgba(0,0,0,0) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        transition: 0.4s !important;
      }
      .product-card:hover .product-overlay {
        background: rgba(0,0,0,0.55) !important;
      }
      .detail-button {
        opacity: 0 !important;
        padding: 14px 36px !important;
        background: #fff !important;
        color: #2d2d2d !important;
        border: none !important;
        border-radius: 8px !important;
        font-weight: 600 !important;
        font-size: 15px !important;
        transition: opacity 0.4s ease !important;
      }
      .product-card:hover .detail-button {
        opacity: 1 !important;
      }

      .product-info {
        padding: 32px 24px !important;
        text-align: center !important;
      }
      .product-title {
        font-family: 'Georgia', serif !important;
        font-size: 22px !important;
        font-weight: 300 !important;
        color: #2d2d2d !important;
        margin-bottom: 12px !important;
      }
      .product-price {
        font-size: 24px !important;
        font-weight: 600 !important;
        color: #d4a574 !important;
      }

      /* Responsive giống hệt trang sản phẩm */
      @media (max-width: 1400px) {
        .featured-grid { grid-template-columns: repeat(3, 1fr) !important; }
      }
      @media (max-width: 900px) {
        .featured-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 0 20px 100px !important; }
        .hero-section { padding: 20px 20px 60px !important; }
      }
      @media (max-width: 600px) {
        .featured-grid { grid-template-columns: 1fr !important; }
        .hero-title { font-size: 42px !important; }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <div className="trangchu-page">
      {/* HERO - GIỐNG HỆT TRANG SẢN PHẨM */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Khám Phá Thời Trang Tinh Tế</h1>
          <p className="hero-subtitle">
            Bộ sưu tập độc quyền được tuyển chọn cẩn thận để phản ánh cá tính và phong cách của bạn
          </p>
          <div style={{ display: "flex", gap: "28px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/sanPham" className="btn-view-all">
              Xem Tất Cả Sản Phẩm
            </Link>
            <Link to="/favorites" className="btn-favorite">
              Yêu Thích
            </Link>
          </div>
        </div>
      </section>

      {/* SẢN PHẨM NỔI BẬT - GIỐNG HỆT TRANG /sanPham */}
      <section className="featured-section">
        <h2 className="featured-title">Sản Phẩm Nổi Bật</h2>
        <div className="featured-underline"></div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0", fontSize: "26px", color: "#888" }}>
            Đang tải sản phẩm...
          </div>
        ) : (
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1" }}>
                  <img
                    src={`http://localhost:8080${product.hinh}`}
                    alt={product.ten}
                    className="product-image"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                  />
                  <div className="product-overlay">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleProductClick(product.id) }}
                      className="detail-button"
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.ten}</h3>
                  <p className="product-price">{Number(product.gia).toLocaleString("vi-VN")} đ</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default TrangChu