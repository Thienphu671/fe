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
              {favorites.map((favorite) => {
                const { id, likedDate, product } = favorite;
                const image = product?.hinh || "/uploads/default.jpg";
                const name = product?.ten || "Không có tên";
                const size = product?.kichthuoc || "Không có thông tin";
                const price = product?.gia ? product.gia.toLocaleString() : "Chưa có giá";
                const date = likedDate ? new Date(likedDate).toLocaleDateString() : "Không rõ";

                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      <img
                        src={image}
                        alt={name}
                        width="80"
                        height="80"
                        className="rounded shadow-sm object-fit-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/uploads/default.jpg";
                        }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{size}</td>
                    <td>{price} VND</td>
                    <td>{date}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveFavorite(product.id)}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                );
              })}
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
