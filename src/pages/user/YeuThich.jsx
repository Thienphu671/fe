import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite as removeFavoriteAPI } from "../../api/yeuthich";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error);
      toast.error("Không thể tải danh sách yêu thích!", { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId, productName = "sản phẩm") => {
   
   

    setRemovingId(productId);

    try {
      await removeFavoriteAPI(productId);
      setFavorites(favorites.filter((fav) => fav.product.id !== productId));
      
      // Thông báo success giống hệt ProductDetailForm
      toast.success(`Đã xóa "${productName}" khỏi danh sách yêu thích!`, {
        icon: <FontAwesomeIcon icon={faHeart} style={{ color: "#ff6b9d" }} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      
      // Thông báo error giống kiểu chung
      toast.error("Xóa thất bại! Vui lòng thử lại.", { autoClose: 5000 });
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // CSS động giống trang chi tiết sản phẩm
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .favorites-root { background:#f5f1ed; min-height:100vh; padding-bottom:120px; }
      .favorites-container { max-width:1600px; margin:0 auto; padding:0 5%; }
      .favorites-title { font-family:'Georgia', serif; font-size:52px; font-weight:300; color:#2d2d2d; text-align:center; margin:100px 0 80px; }
      .favorite-card { 
        border-radius:24px; overflow:hidden; background:#fff; 
        box-shadow:0 10px 30px rgba(0,0,0,0.08); transition:all 0.5s ease;
      }
      .favorite-card:hover { transform:translateY(-12px); box-shadow:0 20px 50px rgba(0,0,0,0.15); }
      .favorite-img { height:320px; object-fit:cover; transition:transform 0.8s ease; }
      .favorite-card:hover .favorite-img { transform:scale(1.08); }
      .btn-view-detail {
        padding:16px 40px; background:#000; color:#fff; border:none; border-radius:50px;
        font-weight:600; letter-spacing:1.5px; transition:all 0.4s ease;
      }
      .btn-view-detail:hover { background:#111; transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,0.2); }
      .btn-remove-fav {
        padding:16px 40px; background:linear-gradient(135deg,#ff6b9d,#ff8fb3); color:#fff; border:none; border-radius:50px;
        font-weight:600; letter-spacing:1.5px; transition:all 0.4s ease;
      }
      .btn-remove-fav:hover { background:linear-gradient(135deg,#ff4f8a,#ff6b9d); transform:translateY(-4px); box-shadow:0 12px 30px rgba(255,107,157,0.4); }
      .empty-state { background:rgba(255,255,255,0.6); border-radius:24px; padding:100px 40px; text-align:center; }
      .btn-continue-shopping {
        padding:18px 60px; background:#d4a574; color:#fff; border:none; border-radius:50px;
        font-size:18px; font-weight:600; letter-spacing:2px; margin-top:40px;
        transition:all 0.4s ease;
      }
      .btn-continue-shopping:hover { background:#c49a6c; transform:translateY(-6px); box-shadow:0 16px 40px rgba(212,165,116,0.4); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (loading) {
    return (
      <div style={{ background: "#f5f1ed", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: "32px", color: "#888", marginBottom: "20px" }}>Đang tải danh sách yêu thích...</div>
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-root">
      <div className="favorites-container">
        <h1 className="favorites-title">Sản Phẩm Yêu Thích</h1>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ margin: "0 auto 30px" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <p style={{ fontSize: "26px", color: "#888", marginBottom: "20px" }}>
              Bạn chưa có sản phẩm yêu thích nào.
            </p>
            <p style={{ fontSize: "18px", color: "#aaa", marginBottom: "40px" }}>
              Hãy khám phá và thêm những món đồ bạn yêu thích ngay hôm nay!
            </p>
            <button className="btn-continue-shopping" onClick={() => navigate("/sanPham")}>
              Khám Phá Ngay
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "60px" }}>
            {favorites.map((favorite) => {
              const product = favorite.product;
              const imageUrl = product?.hinh
                ? `http://localhost:8080/uploads/${product.hinh}`
                : "https://via.placeholder.com/800";

              return (
                <div key={favorite.id} className="favorite-card">
                  <img
                    src={imageUrl}
                    alt={product?.ten || "Sản phẩm"}
                    className="favorite-img"
                    style={{ width: "100%", display: "block" }}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/800?text=Ảnh+lỗi")}
                  />

                  <div style={{ padding: "36px" }}>
                    <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "32px", fontWeight: 300, color: "#2d2d2d", margin: "0 0 16px 0" }}>
                      {product?.ten || "Không có tên"}
                    </h3>

                    <div style={{ marginBottom: "24px", color: "#555", fontSize: "17px", lineHeight: "1.8" }}>
                      <p><strong>Kích thước:</strong> {product?.kichthuoc || "Free size"}</p>
                      <p><strong>Giá:</strong> <span style={{ fontSize: "28px", color: "#d4a574", fontWeight: 600 }}>
                        {product?.gia?.toLocaleString("vi-VN") || "0"} đ
                      </span></p>
                      <p style={{ fontSize: "15px", color: "#999" }}>
                        Thêm vào: {favorite.likedDate ? new Date(favorite.likedDate).toLocaleDateString("vi-VN") : "N/A"}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "20px", marginTop: "32px" }}>
                      <button
                        className="btn-remove-fav"
                        onClick={() => handleRemoveFavorite(product.id, product?.ten || "sản phẩm")}
                        disabled={removingId === product.id}
                        style={{ opacity: removingId === product.id ? 0.7 : 1 }}
                      >
                        {removingId === product.id ? "Đang xóa..." : "Xóa khỏi Yêu Thích"}
                      </button>

                      <button
                        className="btn-view-detail"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        Xem Chi Tiết
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {favorites.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <button className="btn-continue-shopping" onClick={() => navigate("/sanPham")}>
              ← Tiếp Tục Mua Sắm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;