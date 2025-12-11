// src/pages/user/SanPham.jsx
"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../../api/sanPhamND"
import { addFavorite, getFavorites, removeFavorite } from "../../api/yeuthich"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const ITEMS_PER_PAGE = 8

const SanPham = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts("", null, "asc", 0, 200)
        setProducts(res.products || [])

        try {
          const favRes = await getFavorites()
          const favList = favRes.data || favRes || []
          const favIds = {}
          favList.forEach(f => favIds[f.product?.id || f.id] = true)
          setFavorites(favIds)
        } catch (err) { console.warn("Lỗi lấy yêu thích", err) }

        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleToggleWishlist = async (e, id) => {
    e.stopPropagation()
    const isFav = !!favorites[id]
    try {
      if (isFav) {
        await removeFavorite(id)
        setFavorites(prev => { const n = { ...prev }; delete n[id]; return n })
        toast.success("Đã xóa khỏi yêu thích!")
      } else {
        await addFavorite(id)
        setFavorites(prev => ({ ...prev, [id]: true }))
        toast.success("Đã thêm vào yêu thích!")
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra!")
    }
  }

  // Global style + hiệu ứng hover
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0 !important; padding:0 !important; background:#f5f1ed !important; }
      .product-card:hover { transform:translateY(-16px); box-shadow:0 25px 50px rgba(0,0,0,0.15); }
      .product-card:hover .product-image { transform:scale(1.12); }
      .product-card:hover .product-overlay { background:rgba(0,0,0,0.55); }
      .product-card:hover .detail-button { opacity:1; }
      .btn-small-black, .btn-small-pink {
        padding:12px 28px !important; border-radius:50px !important; font-size:14px !important; font-weight:600 !important;
        letter-spacing:1.2px !important; box-shadow:0 6px 18px rgba(0,0,0,0.15) !important; transition:all 0.35s ease !important;
      }
      .btn-small-black { background:#000 !important; color:#fff !important; }
      .btn-small-black:hover { background:#111 !important; transform:translateY(-5px) !important; }
      .btn-small-pink { background:linear-gradient(135deg,#ff6b9d,#ff8fb3) !important; color:#fff !important; display:flex; align-items:center; gap:8px; }
      .btn-small-pink:hover { background:linear-gradient(135deg,#ff4f8a,#ff6b9d) !important; transform:translateY(-5px) !important; }
      .btn-small-pink.favorited { background:linear-gradient(135deg,#d4a574,#e6c9a8) !important; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [favorites])

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const currentProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const styles = {
    root: { backgroundColor: "#f5f1ed", minHeight: "100vh", paddingBottom: "160px" },
    container: { maxWidth: "1600px", margin: "0 auto", padding: "0 5%" },

    // Tiêu đề TO, ĐẸP, KHÔNG BỊ TÁCH DÒNG
    title: {
      fontFamily: "'Georgia', serif",
      fontSize: "68px",           // To hơn
      fontWeight: 300,
      color: "#2d2d2d",
      textAlign: "center",
      margin: "30px 0 10px 0",
      paddingTop: "20px",
      letterSpacing: "1px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    underline: { height: "6px", width: "100px", backgroundColor: "#d4a574", margin: "0 auto 60px" },

    grid: { 
      display: "grid", 
      gridTemplateColumns: "repeat(4, 1fr)", 
      gap: "50px", 
      padding: "0 5%" 
    },

    card: { 
      background: "#fff", 
      borderRadius: "28px", 
      overflow: "hidden", 
      boxShadow: "0 12px 35px rgba(0,0,0,0.1)", 
      transition: "all 0.4s ease",
      cursor: "pointer"
    },
    imageContainer: { 
      position: "relative", 
      overflow: "hidden", 
      aspectRatio: "1", 
      borderRadius: "28px 28px 0 0"
    },
    image: { 
      width: "100%", 
      height: "100%", 
      objectFit: "cover", 
      transition: "transform 0.7s ease" 
    },
    overlay: { 
      position: "absolute", 
      inset: 0, 
      background: "rgba(0,0,0,0)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      transition: "0.4s" 
    },
    detailButton: { 
      opacity: 0, 
      padding: "16px 40px", 
      background: "#fff", 
      color: "#2d2d2d", 
      border: "none", 
      borderRadius: "12px", 
      fontWeight: 600, 
      fontSize: "15px",
      transition: "0.4s" 
    },

    info: { padding: "36px 28px", textAlign: "center" },
    name: { 
      fontFamily: "'Georgia', serif", 
      fontSize: "26px", 
      fontWeight: 300, 
      marginBottom: "14px", 
      color: "#2d2d2d",
      lineHeight: "1.3"
    },
    price: { 
      fontSize: "26px", 
      fontWeight: 600, 
      color: "#d4a574", 
      margin: "0 0 32px 0" 
    },

    // Nút nhỏ gọn, đẹp hơn
    buttonContainer: { 
      display: "flex", 
      gap: "16px", 
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }

  // Responsive
  const getGridCols = () => {
    if (typeof window === "undefined") return "repeat(4, 1fr)"
    const w = window.innerWidth
    if (w <= 640) return "1fr"
    if (w <= 900) return "repeat(2, 1fr)"
    if (w <= 1300) return "repeat(3, 1fr)"
    return "repeat(4, 1fr)"
  }

  if (loading) {
    return (
      <div style={{ background: "#f5f1ed", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "36px", color: "#888" }}>Đang tải sản phẩm...</div>
      </div>
    )
  }

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <h1 style={styles.title}>Tất Cả Sản Phẩm</h1>
        <div style={styles.underline}></div>

        <div style={{ ...styles.grid, gridTemplateColumns: getGridCols() }}>
          {currentProducts.map(product => {
            const isFav = !!favorites[product.id]
            return (
              <div key={product.id} style={styles.card} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div style={styles.imageContainer}>
                  <img 
                    src={`http://localhost:8080${product.hinh}`} 
                    alt={product.ten} 
                    style={styles.image} 
                    className="product-image"
                    onError={e => e.target.src = "https://via.placeholder.com/500"}
                  />
                  <div style={styles.overlay} className="product-overlay">
                    <button style={styles.detailButton} className="detail-button" onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`) }}>
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>

                <div style={styles.info}>
                  <h3 style={styles.name}>{product.ten}</h3>
                  <p style={styles.price}>{Number(product.gia).toLocaleString("vi-VN")} đ</p>

                  <div style={styles.buttonContainer}>
                    <button className="btn-small-black" onClick={e => { e.stopPropagation(); /* TODO: giỏ hàng */ }}>
                      Thêm vào Giỏ
                    </button>
                    <button
                      className={`btn-small-pink ${isFav ? "favorited" : ""}`}
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      {isFav ? "Đã Thích" : "Yêu Thích"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Phân trang gọn đẹp */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "100px", flexWrap: "wrap" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                style={{
                  width: "50px", height: "50px", borderRadius: "50%", border: "none",
                  background: currentPage === page ? "#d4a574" : "#fff",
                  color: currentPage === page ? "#fff" : "#555",
                  fontWeight: 600, fontSize: "16px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s"
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SanPham