// src/pages/user/ProductList.jsx (hoặc bất kỳ đường dẫn nào bạn đang dùng)
"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../../api/sanPhamND"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts("", null, "asc", 0, 100)
        setProducts(response.products || [])
        setLoading(false)
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleProductClick = (id) => {
    navigate(`/product/${id}`)
  }

  // XÓA HẾT KHOẢNG TRẮNG THỪA + ĐỒNG BỘ VỚI TRANG CHỦ
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0; padding:0; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .product-card:hover { transform: translateY(-16px); box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important; }
      .product-card:hover .product-image { transform: scale(1.1); }
      .product-card:hover .product-overlay { background: rgba(0,0,0,0.55) !important; }
      .product-card:hover .detail-btn { opacity: 1 !important; }
      .add-btn:hover { background:#000 !important; color:white !important; border-color:#000 !important; }
      .fav-btn:hover { background:#ff6b9d !important; color:white !important; border-color:#ff6b9d !important; }
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

    // TIÊU ĐỀ ĐẸP NHƯ TRANG CHỦ
    header: {
      width: "100%",
      padding: "100px 5% 80px",
      textAlign: "center",
      background: "linear-gradient(to bottom, #f5f1ed 0%, #f5f1ed 60%, rgba(196, 186, 175, 0.05) 100%)"
    },
    title: {
      fontFamily: "'Georgia', serif",
      fontSize: "52px",
      fontWeight: 300,
      color: "#2d2d2d",
      margin: "0 0 20px 0"
    },
    underline: {
      height: "5px",
      width: "90px",
      backgroundColor: "#d4a574",
      margin: "0 auto"
    },

    // DANH SÁCH SẢN PHẨM FULL MÀN HÌNH
    productSection: {
      width: "100%",
      padding: "0 5% 120px",
      backgroundColor: "#f5f1ed"
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
      gap: "50px",
      maxWidth: "1600px",
      margin: "0 auto"
    },

    // CARD SIÊU ĐẸP NHƯ TRANG CHỦ
    productCard: {
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      transition: "all 0.4s ease",
      cursor: "pointer"
    },
    productImageContainer: {
      position: "relative",
      overflow: "hidden",
      aspectRatio: "1"
    },
    productImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s ease-out"
    },
    productOverlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.4s ease"
    },
    detailButton: {
      opacity: 0,
      padding: "14px 36px",
      background: "#fff",
      color: "#2d2d2d",
      border: "none",
      borderRadius: "8px",
      fontWeight: 600,
      fontSize: "15px",
      cursor: "pointer",
      transition: "all 0.4s ease"
    },
    productInfo: {
      padding: "32px 24px",
      textAlign: "center"
    },
    productTitle: {
      fontFamily: "'Georgia', serif",
      fontSize: "22px",
      fontWeight: 300,
      color: "#2d2d2d",
      marginBottom: "12px",
      transition: "color 0.3s"
    },
    productPrice: {
      fontSize: "22px",
      fontWeight: 600,
      color: "#d4a574",
      marginBottom: "20px"
    },
    productActions: {
      display: "flex",
      gap: "16px",
      justifyContent: "center"
    },
    addBtn: {
      flex: 1,
      padding: "14px",
      backgroundColor: "transparent",
      border: "2px solid #2d2d2d",
      color: "#2d2d2d",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s"
    },
    favBtn: {
      padding: "14px 18px",
      backgroundColor: "transparent",
      border: "2px solid #2d2d2d",
      color: "#2d2d2d",
      borderRadius: "8px",
      fontSize: "20px",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    loading: {
      textAlign: "center",
      padding: "150px 0",
      fontSize: "28px",
      color: "#888"
    }
  }

  if (loading) {
    return <div style={styles.loading}>Đang tải sản phẩm...</div>
  }

  return (
    <div style={styles.root}>
      {/* TIÊU ĐỀ ĐẸP NHƯ TRANG CHỦ */}
      <section style={styles.header}>
        <h1 style={styles.title}>Tất Cả Sản Phẩm</h1>
        <div style={styles.underline}></div>
      </section>

      {/* DANH SÁCH SẢN PHẨM – FULL MÀN HÌNH */}
      <section style={styles.productSection}>
        <div style={styles.productGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={styles.productCard}
              onClick={() => handleProductClick(product.id)}
            >
              <div style={styles.productImageContainer}>
                <img
                  src={`http://localhost:8080${product.hinh}`}
                  alt={product.ten}
                  style={styles.productImage}
                  className="product-image"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image")}
                />
                <div style={styles.productOverlay} className="product-overlay">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleProductClick(product.id) }}
                    style={styles.detailButton}
                    className="detail-btn"
                  >
                    Xem Chi Tiết
                  </button>
                </div>
              </div>

              <div style={styles.productInfo}>
                <h3 style={styles.productTitle}>{product.ten}</h3>
                <p style={styles.productPrice}>
                  {Number(product.gia).toLocaleString("vi-VN")} đ
                </p>
                <div style={styles.productActions}>
                  <button style={styles.addBtn} className="add-btn">
                    Thêm vào giỏ
                  </button>
                  <button style={styles.favBtn} className="fav-btn">
                    Yêu Thích
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductList