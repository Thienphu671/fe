// src/pages/user/TrangChu.jsx
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
        const response = await getProducts("", null, "asc", 0, 12)
        setFeaturedProducts(response.products || [])
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

  // XÓA HẾT KHOẢNG TRẮNG CỦA BODY, HTML, CONTAINER
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root, .app, [data-testid="root"] {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        min-height: 100vh !important;
        background: #f5f1ed !important;
        overflow-x: hidden !important;
      }
      .container, .container-fluid, [class*="container"] {
        max-width: 100% !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      /* Nút đẹp */
      .btn-view-all {
        background: #000 !important;
        color: white !important;
        transform: translateY(0);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        transition: all 0.4s ease;
      }
      .btn-view-all:hover {
        background: #111 !important;
        transform: translateY(-6px) !important;
        box-shadow: 0 16px 32px rgba(0,0,0,0.3) !important;
      }
      .btn-favorite {
        background: linear-gradient(135deg, #ff6b9d, #ff8fb3) !important;
        color: white !important;
        transform: translateY(0);
        box-shadow: 0 8px 20px rgba(255,107,157,0.3);
        transition: all 0.4s ease;
      }
      .btn-favorite:hover {
        background: linear-gradient(135deg, #ff4f8a, #ff6b9d) !important;
        transform: translateY(-6px) !important;
        box-shadow: 0 16px 32px rgba(255,107,157,0.5) !important;
      }
      .product-card:hover { transform: translateY(-16px); box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
      .product-card:hover .product-image { transform: scale(1.1); }
      .product-card:hover .product-overlay { background: rgba(0,0,0,0.55); }
      .product-card:hover .detail-button { opacity: 1; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const styles = {
    root: {
      margin: 0,
      padding: 0,
      backgroundColor: "#f5f1ed",
      width: "100%",
      minHeight: "100vh",
      overflowX: "hidden"
    },
    heroSection: {
      width: "100%",
      padding: "100px 5% 10px",
      margin: 0,
      background: "linear-gradient(to bottom, #f5f1ed 0%, #f5f1ed 60%, rgba(196, 186, 175, 0.05) 100%)",
      textAlign: "center"
    },
    heroContent: {
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 5%"
    },
    heroTitle: {
      fontFamily: "'Georgia', serif",
      fontSize: "56px",
      fontWeight: 300,
      margin: "0 0 28px 0",
      color: "#2d2d2d",
      lineHeight: 1.2
    },
    heroSubtitle: {
      fontSize: "20px",
      color: "#555",
      maxWidth: "800px",
      margin: "0 auto 48px",
      fontWeight: 300,
      lineHeight: 1.7
    },
    buttonContainer: {
      display: "flex",
      gap: "28px",
      justifyContent: "center",
      flexWrap: "wrap"
    },

    // NÚT ĐEN
    primaryButton: {
      padding: "18px 52px",
      backgroundColor: "#000000",
      color: "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "1.5px",
      cursor: "pointer",
      transition: "all 0.4s ease",
      textDecoration: "none",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      display: "inline-block"
    },

    // NÚT HỒNG
    favoriteButton: {
      padding: "18px 52px",
      background: "linear-gradient(135deg, #ff6b9d, #ff8fb3)",
      color: "#ffffff",
      border: "none",
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "1.5px",
      cursor: "pointer",
      transition: "all 0.4s ease",
      textDecoration: "none",
      boxShadow: "0 8px 20px rgba(255, 107, 157, 0.3)",
      display: "inline-block"
    },

    productSection: { width: "100%", padding: "140px 0", margin: 0, backgroundColor: "#f5f1ed" },
    productContainer: { width: "100%", maxWidth: "1600px", margin: "0 auto", padding: "0 5%" },
    sectionTitle: { fontFamily: "'Georgia', serif", fontSize: "44px", fontWeight: 300, color: "#2d2d2d", textAlign: "center", marginBottom: "16px" },
    sectionUnderline: { height: "5px", width: "90px", backgroundColor: "#d4a574", margin: "0 auto 60px" },
    productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "50px", padding: "0 5%" },
    productCard: { background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", transition: "all 0.4s" },
    productImageContainer: { position: "relative", overflow: "hidden", aspectRatio: "1" },
    productImage: { width: "100%", height: "100%", objectFit: "cover", transition: "0.6s" },
    productOverlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.4s" },
    detailButton: { opacity: 0, padding: "14px 36px", background: "#fff", color: "#2d2d2d", border: "none", borderRadius: "8px", fontWeight: 600, transition: "0.4s" },
    productInfo: { padding: "32px 24px", textAlign: "center" },
    productTitle: { fontFamily: "'Georgia', serif", fontSize: "22px", fontWeight: 300, marginBottom: "12px" },
    productPrice: { fontSize: "22px", fontWeight: 600, color: "#d4a574" },
  }

  return (
    <div style={styles.root}>
      {/* HERO - FULL MÀN HÌNH */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Khám Phá Thời Trang Tinh Tế</h1>
          <p style={styles.heroSubtitle}>
            Bộ sưu tập độc quyền được tuyển chọn cẩn thận để phản ánh cá tính và phong cách của bạn
          </p>
          <div style={styles.buttonContainer}>
            <Link to="/sanPham" style={styles.primaryButton} className="btn-view-all">
              Xem Tất Cả Sản Phẩm
            </Link>
            <Link to="/favorites" style={styles.favoriteButton} className="btn-favorite">
              Yêu Thích
            </Link>
          </div>
        </div>
      </section>

      {/* SẢN PHẨM NỔI BẬT - FULL MÀN HÌNH */}
      <section style={styles.productSection}>
        <div style={styles.productContainer}>
          <h2 style={styles.sectionTitle}>Sản Phẩm Nổi Bật</h2>
          <div style={styles.sectionUnderline}></div>

          {loading ? (
            <div style={{textAlign:"center", padding:"140px 0", fontSize:"26px", color:"#888"}}>Đang tải sản phẩm...</div>
          ) : (
            <div style={styles.productGrid}>
              {featuredProducts.map(product => (
                <div key={product.id} className="product-card" style={styles.productCard} onClick={() => handleProductClick(product.id)}>
                  <div style={styles.productImageContainer}>
                    <img 
                      src={`http://localhost:8080${product.hinh}`} 
                      alt={product.ten} 
                      style={styles.productImage} 
                      className="product-image"
                      onError={(e) => e.target.src = "https://via.placeholder.com/400"}
                    />
                    <div style={styles.productOverlay} className="product-overlay">
                      <button onClick={(e) => { e.stopPropagation(); handleProductClick(product.id) }} style={styles.detailButton} className="detail-button">
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                  <div style={styles.productInfo}>
                    <h3 style={styles.productTitle}>{product.ten}</h3>
                    <p style={styles.productPrice}>{Number(product.gia).toLocaleString("vi-VN")} đ</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default TrangChu