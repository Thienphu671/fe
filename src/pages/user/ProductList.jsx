"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../../api/sanPhamND"
import { addFavorite, getFavorites, removeFavorite } from "../../api/yeuthich"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons"

const ITEMS_PER_PAGE = 12

const SanPham = () => {
  const [allProducts, setAllProducts] = useState([]) // dữ liệu gốc
  const [products, setProducts] = useState([])        // dữ liệu sau tìm kiếm
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  // State cho tìm kiếm theo tên
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate()

  // Load dữ liệu sản phẩm + yêu thích
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy tất cả sản phẩm (lấy nhiều để lọc client-side)
        const res = await getProducts("", null, "asc", 0, 300)
        const productList = res.products || []
        setAllProducts(productList)
        setProducts(productList)

        // Lấy danh sách yêu thích
        const favRes = await getFavorites()
        const favList = favRes.data || favRes || []
        const favIds = {}
        favList.forEach(f => favIds[f.product?.id || f.id] = true)
        setFavorites(favIds)
      } catch (err) {
        console.warn("Lỗi tải dữ liệu", err)
        toast.error("Không thể tải sản phẩm")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Xử lý tìm kiếm theo tên khi searchTerm thay đổi
  useEffect(() => {
    let filtered = allProducts

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      filtered = filtered.filter(p =>
        p.ten.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(term)
      )
    }

    setProducts(filtered)
    setCurrentPage(1) // reset về trang 1 khi tìm kiếm
  }, [searchTerm, allProducts])

  const handleToggleWishlist = async (e, id) => {
    e.stopPropagation()
    const isFav = !!favorites[id]

    try {
      if (isFav) {
        await removeFavorite(id)
        setFavorites(prev => {
          const n = { ...prev }
          delete n[id]
          return n
        })
        toast.success("Đã xóa khỏi yêu thích!")
      } else {
        await addFavorite(id)
        setFavorites(prev => ({ ...prev, [id]: true }))
        toast.success("Đã thêm vào yêu thích!")
      }
    } catch {
      toast.error("Có lỗi xảy ra!")
    }
  }

  // Hover effect CSS
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0; padding:0; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .product-card:hover { transform: translateY(-16px); box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
      .product-card:hover .product-image { transform: scale(1.1); }
      .product-card:hover .product-overlay { background: rgba(0,0,0,0.55); }
      .product-card:hover .detail-btn { opacity: 1 !important; }
      .fav-btn:hover, .fav-btn.favorited { background:#d4a574 !important; color:white !important; border-color:#d4a574 !important; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Phân trang
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push("...")
      if (totalPages > 1) pages.push(totalPages)
    }
    return pages
  }

  const changePage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const styles = {
    root: { margin:0, padding:0, backgroundColor:"#f5f1ed", minHeight:"100vh" },
    header: { padding:"10px 20px 40px", textAlign:"center" },
    title: { fontFamily:"'Georgia', serif", fontSize:"52px", fontWeight:300, color:"#2d2d2d", margin:"0 0 20px 0" },
    underline: { height:"5px", width:"90px", backgroundColor:"#d4a574", margin:"0 auto 40px" },

    // Chỉ còn thanh tìm kiếm
    filterBar: { 
      display: "flex", 
      justifyContent: "center", 
      marginBottom: "50px",
      padding: "0 20px"
    },
    searchBox: { 
      position: "relative", 
      maxWidth: "500px", 
      width: "100%"
    },
    searchInput: { 
      width: "100%", 
      padding: "16px 60px 16px 24px", 
      borderRadius: "12px", 
      border: "2px solid #ddd", 
      fontSize: "18px",
      outline: "none",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
    },
    searchIcon: { 
      position: "absolute", 
      right: "20px", 
      top: "50%", 
      transform: "translateY(-50%)", 
      color: "#999",
      fontSize: "20px"
    },

    grid: {
      display:"grid",
      gridTemplateColumns:"repeat(4, 1fr)",
      gap:"40px",
      padding:"0 40px 10px",
      maxWidth:"100%",
      margin:"0 auto"
    },

    card: { background:"#fff", borderRadius:"20px", overflow:"hidden", boxShadow:"0 10px 30px rgba(0,0,0,0.08)", transition:"all 0.4s ease", cursor:"pointer" },
    imgBox: { position:"relative", overflow:"hidden", aspectRatio:"1" },
    img: { width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s ease-out" },
    overlay: { position:"absolute", inset:0, background:"rgba(0,0,0,0)", display:"flex", alignItems:"center", justifyContent:"center", transition:"0.4s" },
    detailBtn: { opacity:0, padding:"14px 36px", background:"#fff", color:"#2d2d2d", border:"none", borderRadius:"8px", fontWeight:600, fontSize:"15px", cursor:"pointer", transition:"opacity 0.4s ease" },

    info: { padding:"32px 24px", textAlign:"center" },
    name: { fontFamily:"'Georgia', serif", fontSize:"22px", fontWeight:300, color:"#2d2d2d", marginBottom:"12px" },
    price: { fontSize:"24px", fontWeight:600, color:"#d4a574", marginBottom:"30px" },
    actions: { display:"flex", justifyContent:"center" },

    favBtn: {
      padding:"16px 40px",
      background:"transparent",
      border:"2px solid #2d2d2d",
      color:"#2d2d2d",
      borderRadius:"12px",
      fontWeight:600,
      fontSize:"15px",
      minWidth:"220px",
      transition:"all 0.3s",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      gap:"10px"
    },

    loading: { textAlign:"center", padding:"150px 0", fontSize:"28px", color:"#888" },
    resultInfo: { textAlign:"center", color:"#666", margin:"20px 0 40px", fontSize:"17px", fontWeight:"500" }
  }

  const gridStyle = {
    ...styles.grid,
    gridTemplateColumns:
      typeof window !== "undefined" && window.innerWidth < 1400
        ? window.innerWidth < 900 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
        : "repeat(4, 1fr)",
    padding: typeof window !== "undefined" && window.innerWidth < 768 ? "0 20px 100px" : "0 40px 120px"
  }

  if (loading) return <div style={styles.loading}>Đang tải sản phẩm...</div>

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sản Phẩm</h1>
        <div style={styles.underline}></div>
      </div>

      {/* Chỉ còn thanh tìm kiếm */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        </div>
      </div>

      {/* Thông báo kết quả tìm kiếm */}
      <p style={styles.resultInfo}>
        Hiển thị <strong>{products.length}</strong> sản phẩm
        {searchTerm && ` cho từ khóa "${searchTerm}"`}
      </p>

      {/* Grid sản phẩm */}
      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "100px 20px", color: "#888", fontSize: "20px" }}>
          Không tìm thấy sản phẩm nào phù hợp.
        </div>
      ) : (
        <div style={gridStyle}>
          {currentProducts.map(product => {
            const isFav = !!favorites[product.id]
            return (
              <div
                key={product.id}
                className="product-card"
                style={styles.card}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div style={styles.imgBox}>
                  <img
                    src={`http://localhost:8080${product.hinh}`}
                    alt={product.ten}
                    style={styles.img}
                    className="product-image"
                    onError={e => e.target.src = "https://via.placeholder.com/400x400/f5f1ed/999?text=No+Image"}
                  />
                  <div style={styles.overlay} className="product-overlay">
                    <button
                      style={styles.detailBtn}
                      className="detail-btn"
                      onClick={e => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
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
                        ...styles.favBtn,
                        background: isFav ? "#d4a574" : "transparent",
                        color: isFav ? "white" : "#2d2d2d",
                        borderColor: isFav ? "#d4a574" : "#2d2d2d"
                      }}
                      className={`fav-btn ${isFav ? "favorited" : ""}`}
                      onClick={e => handleToggleWishlist(e, product.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      {isFav ? " Đã yêu thích" : " Yêu Thích"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <>
          <p style={{ textAlign:"center", color:"#666", margin:"0 0 30px", fontSize:"16px" }}>
            Trang <strong>{currentPage}</strong> / {totalPages} ({products.length} sản phẩm)
          </p>

          <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"12px",
            margin:"0 0 140px",
            flexWrap:"wrap",
            padding:"0 20px"
          }}>
            <button onClick={() => changePage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
              style={{ minWidth:"50px", height:"50px", borderRadius:"50%", border:"none", background: currentPage === 1 ? "#eee" : "#fff", color: currentPage === 1 ? "#aaa" : "#555", fontSize:"18px", fontWeight:600, boxShadow:"0 6px 20px rgba(0,0,0,0.1)", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
              ←
            </button>

            {getVisiblePages().map((page, idx) =>
              page === "..." ? (
                <span key={idx} style={{ color:"#999", fontSize:"22px", padding:"0 8px" }}>...</span>
              ) : (
                <button key={page} onClick={() => changePage(page)}
                  style={{ width:"50px", height:"50px", borderRadius:"50%", border:"none", background: currentPage === page ? "#d4a574" : "#fff", color: currentPage === page ? "#fff" : "#555", fontWeight:600, fontSize:"16px", boxShadow:"0 6px 20px rgba(0,0,0,0.1)", cursor:"pointer", transition:"all 0.3s" }}>
                  {page}
                </button>
              )
            )}

            <button onClick={() => changePage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
              style={{ minWidth:"50px", height:"50px", borderRadius:"50%", border:"none", background: currentPage === totalPages ? "#eee" : "#fff", color: currentPage === totalPages ? "#aaa" : "#555", fontSize:"18px", fontWeight:600, boxShadow:"0 6px 20px rgba(0,0,0,0.1)", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
              →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SanPham