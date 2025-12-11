// src/pages/user/Favorites.jsx
"use client"

import React, { useEffect, useState } from "react"
import { getFavorites, removeFavorite } from "../../api/yeuthich"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getFavorites()
        const list = res.data || res || []
        setFavorites(list.filter(f => f.product))
      } catch (err) {
        toast.error("Không thể tải danh sách yêu thích")
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [])

  const handleRemove = async (e, productId, productName) => {
    e.stopPropagation()
    setRemovingId(productId)
    try {
      await removeFavorite(productId)
      setFavorites(prev => prev.filter(f => f.product.id !== productId))
      toast.success(`Đã xóa "${productName}" khỏi yêu thích!`)
    } catch {
      toast.error("Có lỗi xảy ra!")
    } finally {
      setRemovingId(null)
    }
  }

  // Hover giống hệt trang sản phẩm
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0; padding:0; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .fav-card:hover { transform: translateY(-16px); box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
      .fav-card:hover .fav-image { transform: scale(1.1); }
      .fav-card:hover .fav-overlay { background: rgba(0,0,0,0.55); }
      .fav-card:hover .detail-btn { opacity: 1; }
      .remove-btn:hover { background:#e74c3c !important; color:white !important; border-color:#e74c3c !important; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const styles = {
    root: { background: "#f5f1ed", minHeight: "100vh" },
    header: { padding: "10px 20px 80px", textAlign: "center" },
    title: { fontFamily: "'Georgia', serif", fontSize: "52px", fontWeight: 300, color: "#2d2d2d", margin: "0 0 20px 0" },
    underline: { height: "5px", width: "90px", backgroundColor: "#d4a574", margin: "0 auto 60px" },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "40px",
      padding: "0 40px 120px",
      maxWidth: "100%",
      margin: "0 auto"
    },

    card: { background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", transition: "all 0.4s ease", cursor: "pointer" },
    imgBox: { position: "relative", overflow: "hidden", aspectRatio: "1" },
    img: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease-out" },
    overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.4s" },
    detailBtn: { opacity: 0, padding: "14px 36px", background: "#fff", color: "#2d2d2d", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer", transition: "0.4s" },

    info: { padding: "32px 24px", textAlign: "center" },
    name: { fontFamily: "'Georgia', serif", fontSize: "22px", fontWeight: 300, color: "#2d2d2d", marginBottom: "12px" },
    price: { fontSize: "24px", fontWeight: 600, color: "#d4a574", marginBottom: "30px" },
    actions: { display: "flex", justifyContent: "center" },

    // Nút giống hệt nút "Yêu Thích" trong trang sản phẩm
    actionBtn: {
      padding: "16px 40px",
      background: "transparent",
      border: "2px solid #2d2d2d",
      color: "#2d2d2d",
      borderRadius: "12px",
      fontWeight: 600,
      fontSize: "15px",
      minWidth: "220px",
      transition: "all 0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px"
    },

    empty: { textAlign: "center", padding: "120px 20px", color: "#888", fontSize: "28px" },
    emptyBtn: {
      marginTop: "40px",
      padding: "18px 60px",
      background: "#d4a574",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      fontSize: "18px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.4s"
    }
  }

  const gridStyle = {
    ...styles.grid,
    gridTemplateColumns:
      typeof window !== "undefined" && window.innerWidth < 1400
        ? window.innerWidth < 900 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
        : "repeat(4, 1fr)",
    padding: typeof window !== "undefined" && window.innerWidth < 768 ? "0 20px 100px" : "0 40px 120px"
  }

  if (loading) return <div style={{ textAlign: "center", padding: "150px 0", fontSize: "28px", color: "#888" }}>
    Đang tải danh sách yêu thích...
  </div>

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sản Phẩm Yêu Thích Của Bạn</h1>
        <div style={styles.underline}></div>
      </div>

      {favorites.length === 0 ? (
        <div style={styles.empty}>
          <p>Chưa có sản phẩm nào trong danh sách yêu thích</p>
          <button
            style={styles.emptyBtn}
            onClick={() => navigate("/sanPham")}
            onMouseOver={e => e.currentTarget.style.background = "#c49a6c"}
            onMouseOut={e => e.currentTarget.style.background = "#d4a574"}
          >
            Khám Phá Sản Phẩm
          </button>
        </div>
      ) : (
        <div style={gridStyle}>
          {favorites.map(({ product }) => {
            const isRemoving = removingId === product.id

            return (
              <div
                key={product.id}
                className="fav-card"
                style={styles.card}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div style={styles.imgBox}>
                  {/* ẢNH HIỆN ĐÚNG 100% */}
                  <img
                    src={`http://localhost:8080/uploads/${product.hinh}`}
                    alt={product.ten}
                    style={styles.img}
                    className="fav-image"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image"
                    }}
                  />
                  <div style={styles.overlay} className="fav-overlay">
                    <button
                      style={styles.detailBtn}
                      className="detail-btn"
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>

                <div style={styles.info}>
                  <h3 style={styles.name}>{product.ten}</h3>
                  <p style={styles.price}>{Number(product.gia).toLocaleString("vi-VN")} đ</p>

                  <div style={styles.actions}>
                    <button
                      style={{
                        ...styles.actionBtn,
                        background: "#e74c3c",
                        color: "white",
                        borderColor: "#e74c3c",
                        opacity: isRemoving ? 0.7 : 1
                      }}
                      className="remove-btn"
                      onClick={(e) => handleRemove(e, product.id, product.ten)}
                      disabled={isRemoving}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      {isRemoving ? " Đang xóa..." : " Xóa khỏi yêu thích"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {favorites.length > 0 && (
        <div style={{ textAlign: "center", margin: "80px 0 120px" }}>
          <button
            style={styles.emptyBtn}
            onClick={() => navigate("/sanPham")}
            onMouseOver={e => e.currentTarget.style.background = "#c49a6c"}
            onMouseOut={e => e.currentTarget.style.background = "#d4a574"}
          >
            ← Tiếp Tục Mua Sắm
          </button>
        </div>
      )}
    </div>
  )
}

export default Favorites