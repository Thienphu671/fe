import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite as removeFavoriteAPI } from "../../api/yeuthich";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách yêu thích:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await removeFavoriteAPI(productId);
      const updatedFavorites = favorites.filter(
        (fav) => fav.product.id !== productId
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi yêu thích:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p className="text-center mt-4">Đang tải dữ liệu...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Danh sách sản phẩm yêu thích</h2>

      {favorites.length === 0 ? (
        <div className="alert alert-info text-center">
          Không có sản phẩm yêu thích nào.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead>
              <tr className="bg-light text-dark">
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Kích thước</th>
                <th>Giá</th>
                <th>Ngày thích</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((favorite) => (
                <tr key={favorite.id}>
                  <td>{favorite.id}</td>
                  <td>
                    <img
                      src={
                        favorite.product?.Hinh
                          ? `http://localhost:8080/uploads/${favorite.product?.hinh}`  // Thêm localhost vào đường dẫn
                          : "/uploads/default.jpg" // Hình mặc định nếu không có ảnh
                      }
                      alt={favorite.product?.ten || "Ảnh sản phẩm không có tên"}
                      width="80"
                      className="img-thumbnail"
                    />
                  </td>

                  <td>{favorite.product?.ten || "Chưa có tên sản phẩm"}</td>
                  <td>{favorite.product?.kichthuoc || "Chưa có kích thước"}</td>
                  <td>
                    {favorite.product?.gia?.toLocaleString() || "Chưa có giá"} VND
                  </td>
                  <td>
                    {favorite.likedDate
                      ? new Date(favorite.likedDate).toLocaleDateString()
                      : "Chưa có ngày thích"}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveFavorite(favorite.product.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/sanPham")}
        >
          Quay lại trang Sản Phẩm
        </button>
      </div>
    </div>
  );
};

export default Favorites;