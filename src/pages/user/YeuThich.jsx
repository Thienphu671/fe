import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite as removeFavoriteAPI } from "../../api/yeuthich";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Chỉ import toast, không import ToastContainer

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null); // Theo dõi sản phẩm đang xóa
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
    const confirmRemove = window.confirm(
      `Bạn có chắc muốn xóa "${productName}" khỏi danh sách yêu thích?`
    );
    if (!confirmRemove) return;

    setRemovingId(productId);
    toast.info("Đang xóa sản phẩm...", { autoClose: 2000 });

    try {
      await removeFavoriteAPI(productId);
      setFavorites(favorites.filter((fav) => fav.product.id !== productId));
      toast.success(`Đã xóa "${productName}" khỏi danh sách yêu thích! ❤️`, {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi yêu thích:", error);
      toast.error("Xóa thất bại! Vui lòng thử lại.", { autoClose: 5000 });
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3">Đang tải danh sách yêu thích...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        Sản phẩm yêu thích của bạn
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-5">
          <div className="alert alert-light border" role="alert">
            <i className="bi bi-heart fs-1 text-muted d-block mb-3"></i>
            <p className="mb-0">Bạn chưa có sản phẩm yêu thích nào.</p>
          </div>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/sanPham")}>
            Khám phá sản phẩm ngay
          </button>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {favorites.map((favorite) => {
              const product = favorite.product;
              const imageUrl = product?.hinh
                ? `http://localhost:8080/uploads/${product.hinh}`
                : "https://via.placeholder.com/300x300.png?text=Không+có+ảnh";

              return (
                <div key={favorite.id} className="col-12 col-sm-6 col-lg-4">
                  <div className="card h-100 shadow-sm hover-shadow transition">
                    <div className="position-relative">
                      <img
                        src={imageUrl}
                        alt={product?.ten || "Sản phẩm"}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300.png?text=Ảnh+lỗi";
                        }}
                      />
                      <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small rounded-start">
                        Yêu thích
                      </span>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">
                        {product?.ten || "Không có tên"}
                      </h5>

                      <div className="mt-auto">
                        <p className="text-muted small mb-1">
                          Kích thước: <strong>{product?.kichthuoc || "N/A"}</strong>
                        </p>
                        <p className="h5 text-danger fw-bold mb-2">
                          {product?.gia?.toLocaleString("vi-VN") || "0"} VND
                        </p>
                        <p className="text-muted small">
                          Thêm vào:{" "}
                          {favorite.likedDate
                            ? new Date(favorite.likedDate).toLocaleDateString("vi-VN")
                            : "N/A"}
                        </p>

                        <div className="d-flex gap-2 mt-3">
                          <button
                            className="btn btn-outline-danger btn-sm flex-fill position-relative"
                            onClick={() =>
                              handleRemoveFavorite(product.id, product?.ten || "sản phẩm")
                            }
                            disabled={removingId === product.id}
                          >
                            {removingId === product.id ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                ></span>
                                Đang xóa...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-trash"></i> Xóa
                              </>
                            )}
                          </button>

                          <button
                            className="btn btn-primary btn-sm flex-fill"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-outline-primary px-5"
              onClick={() => navigate("/sanPham")}
            >
              ← Tiếp tục mua sắm
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;