"use client"

import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProductById } from "../../api/sanPhamND"
import { themVaoGiohang } from "../../api/giohang"
import { addFavorite, getFavorites, removeFavorite } from "../../api/yeuthich" // Thêm getFavorites + removeFavorite
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const token = localStorage.getItem("token")

const getProductReviews = async (productId) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/danhgia/sanpham/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Lỗi tải đánh giá:", error)
    return []
  }
}

const ProductDetailForm = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  const imageUrl = product.hinh ? `http://localhost:8080${product.hinh}` : "https://via.placeholder.com/800"

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodRes, reviewRes] = await Promise.all([
          getProductById(id),
          getProductReviews(id),
        ])
        setProduct(prodRes)
        setReviews(reviewRes)

        // Kiểm tra trạng thái yêu thích từ backend
        try {
          const favResponse = await getFavorites()
          const favList = favResponse.data || favResponse || []
          const isFav = favList.some(fav => 
            (fav.product?.id && fav.product.id === Number(id)) || 
            (fav.id && fav.id === Number(id))
          )
          setIsFavorited(isFav)
        } catch (favErr) {
          console.warn("Không thể kiểm tra yêu thích", favErr)
        }

        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    if (id) loadData()
  }, [id])

  const handleAddToCart = async () => {
    try {
      await themVaoGiohang(product.id, quantity)
      toast.success("Đã thêm vào giỏ hàng!", { autoClose: 2000 })
    } catch (err) {
      toast.error("Không thể thêm vào giỏ (hết hàng hoặc chưa đăng nhập)")
    }
  }

  const handleToggleWishlist = async () => {
    if (isFavorited) {
      // Đã yêu thích → XÓA
      try {
        await removeFavorite(product.id)
        setIsFavorited(false)
        toast.success("Đã xóa khỏi yêu thích!", {
          icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#ff6b9d" }} />,
        })
      } catch (err) {
        toast.error("Không thể xóa khỏi yêu thích!")
      }
    } else {
      // Chưa yêu thích → THÊM
      try {
        await addFavorite(product.id)
        setIsFavorited(true)
        toast.success("Đã thêm vào yêu thích!", {
          icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#ff6b9d" }} />,
        })
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message || ""
        if (
          errorMsg.toLowerCase().includes("đã tồn tại") ||
          errorMsg.toLowerCase().includes("yêu thích") ||
          errorMsg.toLowerCase().includes("already") ||
          errorMsg.toLowerCase().includes("duplicate")
        ) {
          setIsFavorited(true)
          toast.error("Sản phẩm đã được yêu thích rồi!", {
            icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#d4a574" }} />,
          })
        } else if (errorMsg.toLowerCase().includes("đăng nhập") || errorMsg.toLowerCase().includes("unauthorized")) {
          toast.error("Vui lòng đăng nhập để thêm yêu thích")
        } else {
          toast.error("Không thể thêm vào yêu thích lúc này!")
        }
      }
    }
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      html, body, #root { margin:0; padding:0; width:100%; background:#f5f1ed; overflow-x:hidden; }
      .btn-add-cart { background:#000 !important; color:white !important; box-shadow:0 8px 20px rgba(0,0,0,0.15); transition:all 0.4s ease; }
      .btn-add-cart:hover { background:#111 !important; transform:translateY(-6px); box-shadow:0 16px 32px rgba(0,0,0,0.3); }
      .btn-wishlist { background:linear-gradient(135deg,#ff6b9d,#ff8fb3) !important; color:white !important; box-shadow:0 8px 20px rgba(255,107,157,0.3); transition:all 0.4s ease; }
      .btn-wishlist:hover { background:linear-gradient(135deg,#ff4f8a,#ff6b9d) !important; transform:translateY(-6px); box-shadow:0 16px 32px rgba(255,107,157,0.5); }
      .btn-wishlist.favorited { background:linear-gradient(135deg,#d4a574,#e6c9a8) !important; opacity:0.95; }
      .btn-wishlist.favorited:hover { background:linear-gradient(135deg,#c49a6c,#d4a574) !important; }
      .product-image:hover { transform:scale(1.05); }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [isFavorited])

  const styles = {
    root: { margin:0, padding:0, backgroundColor:"#f5f1ed", width:"100%", minHeight:"100vh", overflowX:"hidden" },
    heroSection: { width:"100%", padding:"100px 5% 80px", background:"linear-gradient(to bottom, #f5f1ed 0%, #f5f1ed 60%, rgba(196,186,175,0.05) 100%)" },
    content: { maxWidth:"1600px", margin:"0 auto", padding:"0 5%" },
    breadcrumb: { marginBottom:"32px", fontSize:"15px", color:"#888" },
    grid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start" },
    imageWrapper: { borderRadius:"24px", overflow:"hidden", boxShadow:"0 15px 40px rgba(0,0,0,0.12)", background:"#fff" },
    image: { width:"100%", height:"auto", display:"block", transition:"transform 0.8s ease" },
    infoSection: { padding:"40px 0" },
    name: { fontFamily:"'Georgia', serif", fontSize:"48px", fontWeight:300, color:"#2d2d2d", margin:"0 0 20px 0", lineHeight:1.2 },
    price: { fontSize:"36px", fontWeight:600, color:"#d4a574", margin:"0 0 32px 0" },
    meta: { marginBottom:"32px", lineHeight:2, color:"#555", fontSize:"17px" },
    description: { fontSize:"18px", lineHeight:1.8, color:"#444", margin:"40px 0", background:"rgba(255,255,255,0.6)", padding:"32px", borderRadius:"16px" },
    quantityBox: { display:"flex", alignItems:"center", gap:"20px", margin:"40px 0" },
    quantityInput: { width:"100px", padding:"14px", fontSize:"18px", textAlign:"center", border:"2px solid #ddd", borderRadius:"12px" },
    buttonGroup: { display:"flex", gap:"24px", flexWrap:"wrap" },
    btnAddCart: { padding:"18px 52px", backgroundColor:"#000000", color:"#ffffff", border:"none", borderRadius:"50px", fontSize:"16px", fontWeight:600, letterSpacing:"1.5px", cursor:"pointer", boxShadow:"0 8px 20px rgba(0,0,0,0.15)", display:"inline-block" },
    btnWishlist: { padding:"18px 52px", background:"linear-gradient(135deg,#ff6b9d,#ff8fb3)", color:"#ffffff", border:"none", borderRadius:"50px", fontSize:"16px", fontWeight:600, letterSpacing:"1.5px", cursor:"pointer", boxShadow:"0 8px 20px rgba(255,107,157,0.3)", display:"inline-flex", alignItems:"center", gap:"12px" },
    reviewsSection: { marginTop:"120px", padding:"80px 5%", backgroundColor:"rgba(255,255,255,0.6)", borderRadius:"24px" },
    reviewsTitle: { fontFamily:"'Georgia', serif", fontSize:"44px", fontWeight:300, textAlign:"center", marginBottom:"60px", color:"#2d2d2d" },
    reviewCard: { background:"#fff", padding:"32px", borderRadius:"20px", marginBottom:"24px", boxShadow:"0 10px 30px rgba(0,0,0,0.08)" },
    reviewerName: { fontSize:"18px", fontWeight:600 },
    reviewText: { fontSize:"17px", fontStyle:"italic", color:"#555", margin:"16px 0" },
    reviewDate: { color:"#999", fontSize:"15px" },
    noReviews: { textAlign:"center", padding:"80px 0", fontSize:"22px", color:"#888" },
  }

  if (loading) return <div style={{textAlign:"center", padding:"150px 0", fontSize:"28px", color:"#888"}}>Đang tải chi tiết sản phẩm...</div>

  return (
    <div style={styles.root}>
      <section style={styles.heroSection}>
        <div style={styles.content}>
          <div style={styles.breadcrumb}>
            <Link to="/" style={{color:"#888", textDecoration:"none"}}>Trang chủ</Link> → 
            <Link to="/sanPham" style={{color:"#888", textDecoration:"none", margin:"0 8px"}}>Sản phẩm</Link> → 
            <span style={{color:"#d4a574", fontWeight:600}}>{product.ten}</span>
          </div>

          <div style={styles.grid}>
            <div style={styles.imageWrapper}>
              <img src={imageUrl} alt={product.ten} style={styles.image} className="product-image" />
            </div>

            <div style={styles.infoSection}>
              <h1 style={styles.name}>{product.ten}</h1>
              <p style={styles.price}>{Number(product.gia).toLocaleString("vi-VN")} đ</p>

              <div style={styles.meta}>
                <p><strong>Danh mục:</strong> {product.danhMuc || "Chưa phân loại"}</p>
                <p><strong>Kích thước:</strong> {product.kichthuoc || "Free size"}</p>
                <p><strong>Kho:</strong> {product.soluong > 0 ? `${product.soluong} sản phẩm` : <span style={{color:"#e74c3c"}}>Hết hàng</span>}</p>
              </div>

              <div style={styles.description}>
                {product.mota || "Sản phẩm chất lượng cao với thiết kế tinh tế, mang đến sự thoải mái và phong cách tối ưu cho bạn."}
              </div>

              <div style={styles.quantityBox}>
                <strong>Số lượng:</strong>
                <input
                  type="number"
                  min="1"
                  max={product.soluong || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  style={styles.quantityInput}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.btnAddCart} className="btn-add-cart" onClick={handleAddToCart}>
                  Thêm vào Giỏ Hàng
                </button>
                <button 
                  style={styles.btnWishlist} 
                  className={`btn-wishlist ${isFavorited ? 'favorited' : ''}`}
                  onClick={handleToggleWishlist}
                >
                  <FontAwesomeIcon icon={faHeart} /> {isFavorited ? "Đã Yêu Thích" : "Yêu Thích"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.reviewsSection}>
        <h2 style={styles.reviewsTitle}>Đánh Giá Từ Khách Hàng</h2>
        {reviews.length === 0 ? (
          <p style={styles.noReviews}>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} style={styles.reviewCard}>
              <div style={{display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px"}}>
                <strong style={styles.reviewerName}>{r.tenNguoiDung || "Khách hàng"}</strong>
                <div>
                  {[...Array(5)].map((_, idx) => (
                    <FontAwesomeIcon
                      key={idx}
                      icon={faStar}
                      color={idx < r.sao ? "#ffc107" : "#e0e0e0"}
                      style={{fontSize:"18px"}}
                    />
                  ))}
                </div>
              </div>
              <p style={styles.reviewText}>"{r.danhgia}"</p>
              <p style={styles.reviewDate}>
                {new Date(r.ngayDanhgia).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default ProductDetailForm