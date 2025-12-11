"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../../api/sanPhamND"
import { addFavorite, getFavorites, removeFavorite } from "../../api/yeuthich" // Thêm removeFavorite
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const ITEMS_PER_PAGE = 8 // 4 cột × 2 hàng

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodResponse = await getProducts("", null, "asc", 0, 100)
        const prods = prodResponse.products || []
        setProducts(prods)

        let favoriteProductIds = {}
        try {
          const favResponse = await getFavorites()
          const favList = favResponse.data || favResponse || []
          favList.forEach(fav => {
            if (fav.product?.id) favoriteProductIds[fav.product.id] = true
            else if (fav.id) favoriteProductIds[fav.id] = true
          })
        } catch (err) {
          console.warn("Không lấy được yêu thích", err)
        }

        setFavorites(favoriteProductIds)
        setLoading(false)
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleProductClick = (id) => {
    navigate(`/product/${id}`)
  }

  const handleToggleWishlist = async (e, productId, productName) => {
    e.stopPropagation()

    const isCurrentlyFavorited = !!favorites[productId]

    if (isCurrentlyFavorited) {
      // Đang yêu thích → XÓA
      try {
        await removeFavorite(productId)
        setFavorites(prev => {
          const newFav = { ...prev }
          delete newFav[productId]
          return newFav
        })
        toast.success("Đã xóa khỏi yêu thích!", {
          icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#ff6b9d" }} />,
        })
      } catch (err) {
        toast.error("Không thể xóa khỏi yêu thích!")
      }
    } else {
      // Chưa yêu thích → THÊM
      try {
        await addFavorite(productId)
        setFavorites(prev => ({ ...prev, [productId]: true }))
        toast.success("Đã thêm vào yêu thích!", {
          icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#ff6b9d" }} />,
        })
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || ""
        if (errorMsg.toLowerCase().includes("đã tồn tại") || errorMsg.toLowerCase().includes("yêu thích") || errorMsg.toLowerCase().includes("already") || errorMsg.toLowerCase().includes("duplicate")) {
          setFavorites(prev => ({ ...prev, [productId]: true }))
          toast.info("Sản phẩm đã được yêu thích rồi!", {
            icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#d4a574" }} />,
          })
        } else if (errorMsg.toLowerCase().includes("đăng nhập") || errorMsg.toLowerCase().includes("unauthorized")) {
          toast.error("Vui lòng đăng nhập để thêm yêu thích")
        } else {
          toast.error("Không thể thêm vào yêu thích!")
        }
      }
    }
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .product-list-root { background:#f5f1ed; min-height:100vh; padding-bottom:140px; }
      .product-list-container { max-width:1600px; margin:0 auto; padding:0 5%; }
      .product-list-title { font-family:'Georgia', serif; font-size:52px; font-weight:300; color:#2d2d2d; text-align:center; margin:100px 0 80px; }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 60px;
      }
      @media (max-width: 1400px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
      @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr; } }

      .product-card { 
        border-radius:24px; overflow:hidden; background:#fff; 
        box-shadow:0 10px 30px rgba(0,0,0,0.08); transition:all 0.5s ease; position:relative; cursor:pointer;
      }
      .product-card:hover { transform:translateY(-12px); box-shadow:0 20px 50px rgba(0,0,0,0.15); }

      .product-image-wrapper { position: relative; overflow:hidden; height:320px; }
      .product-img { width:100%; height:100%; object-fit:cover; transition:transform 0.8s ease; display:block; }
      .product-card:hover .product-img { transform:scale(1.08); }

      .product-overlay {
        position: absolute; inset:0; background:rgba(0,0,0,0); 
        display:flex; align-items:center; justify-content:center; transition:background 0.4s ease;
      }
      .product-card:hover .product-overlay { background:rgba(0,0,0,0.55); }

      .detail-btn {
        opacity:0; padding:14px 36px; background:#fff; color:#2d2d2d; border:none; border-radius:8px;
        font-weight:600; font-size:15px; cursor:pointer; transition:all 0.4s ease;
      }
      .product-card:hover .detail-btn { opacity:1; }

      .product-info { padding:36px; display:flex; flex-direction:column; }
      .product-name { font-family:'Georgia', serif; font-size:32px; font-weight:300; color:#2d2d2d; margin:0 0 16px 0; flex-grow:1; }
      .product-price { font-size:28px; color:#d4a574; font-weight:600; margin:0 0 32px 0; }

      .product-buttons { display:flex; gap:20px; margin-top:auto; }
      .btn-add-cart, .btn-wishlist {
        flex:1; padding:18px 20px; border:none; border-radius:50px; font-weight:600; 
        letter-spacing:1.5px; transition:all 0.4s ease; cursor:pointer;
        display:flex; align-items:center; justify-content:center; gap:10px; font-size:16px;
      }
      .btn-add-cart { background:#000; color:#fff; }
      .btn-add-cart:hover { background:#111; transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,0.2); }
      .btn-wishlist { background:linear-gradient(135deg,#ff6b9d,#ff8fb3); color:#fff; }
      .btn-wishlist:hover { background:linear-gradient(135deg,#ff4f8a,#ff6b9d); transform:translateY(-4px); box-shadow:0 12px 30px rgba(255,107,157,0.4); }
      .btn-wishlist.favorited { background:linear-gradient(135deg,#d4a574,#e6c9a8); }
      .btn-wishlist.favorited:hover { background:linear-gradient(135deg,#c49a6c,#d4a574); }

      .pagination { display:flex; justify-content:center; align-items:center; gap:16px; margin-top:100px; flex-wrap:wrap; }
      .page-btn { width:56px; height:56px; border-radius:50%; border:none; background:#fff; color:#555; font-size:18px; font-weight:600; box-shadow:0 6px 20px rgba(0,0,0,0.1); transition:all 0.3s ease; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      .page-btn:hover { background:#d4a574; color:#fff; transform:translateY(-4px); }
      .page-btn.active { background:#d4a574; color:#fff; box-shadow:0 10px 30px rgba(212,165,116,0.4); }
      .page-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
      .page-dots { color:#aaa; font-size:24px; padding:0 8px; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [favorites])

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div style={{ background: "#f5f1ed", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: "32px", color: "#888", marginBottom: "20px" }}>Đang tải sản phẩm...</div>
      </div>
    )
  }

  return (
    <div className="product-list-root">
      <div className="product-list-container">
        <h1 className="product-list-title">Tất Cả Sản Phẩm</h1>

        <div className="product-grid">
          {currentProducts.map((product) => {
            const isFavorited = !!favorites[product.id]

            return (
              <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
                <div className="product-image-wrapper">
                  <img
                    src={`http://localhost:8080${product.hinh}`}
                    alt={product.ten}
                    className="product-img"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/800?text=Ảnh+lỗi")}
                  />
                  <div className="product-overlay">
                    <button 
                      className="detail-btn"
                      onClick={(e) => { e.stopPropagation(); handleProductClick(product.id) }}
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.ten}</h3>
                  <p className="product-price">
                    {Number(product.gia).toLocaleString("vi-VN")} đ
                  </p>

                  <div className="product-buttons">
                    <button 
                      className="btn-add-cart" 
                      onClick={(e) => { e.stopPropagation(); /* TODO: thêm giỏ hàng */ }}
                    >
                      Thêm vào Giỏ Hàng
                    </button>
                    <button
                      className={`btn-wishlist ${isFavorited ? "favorited" : ""}`}
                      onClick={(e) => handleToggleWishlist(e, product.id, product.ten)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      {isFavorited ? "Đã Yêu Thích" : "Yêu Thích"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>«</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (totalPages > 7) {
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button key={page} className={`page-btn ${currentPage === page ? "active" : ""}`} onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="page-dots">...</span>
                }
                return null
              }
              return (
                <button key={page} className={`page-btn ${currentPage === page ? "active" : ""}`} onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              )
            })}
            <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList