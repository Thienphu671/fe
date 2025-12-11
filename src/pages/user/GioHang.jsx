import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGiohang,
  capNhatSoLuong,
  xoaSanphamTrongGiohang,
} from "../../api/giohang";

const GioHang = () => {
  const navigate = useNavigate();
  const [giohang, setGiohang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]); // Mảng các id giỏ hàng được chọn

  useEffect(() => {
    fetchGiohang();
  }, []);

  const fetchGiohang = async () => {
    try {
      const response = await getGiohang();
      const data = response.data || [];
      setGiohang(data);
      setSelectedIds([]); // Reset khi tải lại
    } catch (error) {
      console.error("Lỗi tải giỏ hàng:", error);
      alert("Không thể tải giỏ hàng!");
    } finally {
      setLoading(false);
    }
  };

  // Chọn/bỏ chọn 1 sản phẩm
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Chọn/bỏ tất cả
  const toggleSelectAll = () => {
    if (selectedIds.length === giohang.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(giohang.map((item) => item.id));
    }
  };

  // Cập nhật số lượng
  const handleCapNhatSoLuong = async (giohangId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Số lượng phải ≥ 1");
      return;
    }

    try {
      await capNhatSoLuong(giohangId, newQuantity);
      setGiohang((prev) =>
        prev.map((item) =>
          item.id === giohangId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      alert("Cập nhật số lượng thất bại!");
      fetchGiohang();
    }
  };

  // Xóa sản phẩm
  const handleXoa = async (sanphamId, giohangId) => {
    if (!window.confirm("Xóa sản phẩm này khỏi giỏ hàng?")) return;

    try {
      await xoaSanphamTrongGiohang(sanphamId);
      setGiohang((prev) => prev.filter((item) => item.id !== giohangId));
      setSelectedIds((prev) => prev.filter((id) => id !== giohangId));
    } catch (error) {
      alert("Xóa thất bại!");
    }
  };

  // Tính tổng tiền các sản phẩm được chọn
  const tongTienChon = giohang
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => {
      const price = Number(item.totalPrice) || 0;
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);

  // Chuyển sang trang thanh toán
  const handleThanhToan = () => {
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm!");
      return;
    }

    const selectedItems = giohang.filter((item) => selectedIds.includes(item.id));

    navigate("/thanhtoan", {
      state: {
        selectedItems,    // Danh sách sản phẩm để hiển thị
        selectedIds,      // IDs để gửi lên backend
        tongTien: tongTienChon
      },
    });
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3">Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (giohang.length === 0) {
    return (
      <div className="container text-center py-5">
        <h3>Giỏ hàng trống</h3>
        <a href="/" className="btn btn-primary mt-3">
          Tiếp tục mua sắm
        </a>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 fw-bold">Giỏ hàng của bạn</h2>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th width="50">
                <input
                  type="checkbox"
                  checked={selectedIds.length === giohang.length && giohang.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {giohang.map((item) => {
              const price = Number(item.totalPrice) || 0;
              const qty = Number(item.quantity) || 1;
              const thanhTien = price * qty;
              const isChecked = selectedIds.includes(item.id);

              return (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: isChecked ? "#f0fff0" : "transparent",
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={
                        item.product?.hinh
                          ? `http://localhost:8080/uploads/${item.product.hinh}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.product?.ten || "Sản phẩm"}
                      width="80"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  </td>
                  <td>
                    <strong>{item.product?.ten || "Không tên"}</strong>
                  </td>
                  <td>{price.toLocaleString("vi-VN")}₫</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="form-control form-control-sm"
                      style={{ width: "80px" }}
                      value={qty}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        handleCapNhatSoLuong(item.id, val);
                      }}
                    />
                  </td>
                  <td className="fw-bold text-danger">
                    {thanhTien.toLocaleString("vi-VN")}₫
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleXoa(item.product.id, item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tổng thanh toán */}
      <div className="border-top pt-4">
        <div className="row justify-content-end">
          <div className="col-lg-5 col-md-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center py-3 border-top">
                  <h4 className="mb-0">Tổng thanh toán:</h4>
                  <h3 className="text-danger fw-bold mb-0">
                    {tongTienChon.toLocaleString("vi-VN")}₫
                  </h3>
                </div>

                <button
                  className="btn btn-success btn-lg w-100"
                  disabled={selectedIds.length === 0}
                  onClick={handleThanhToan}
                >
                  {selectedIds.length > 0
                    ? `Thanh toán (${selectedIds.length} sản phẩm)`
                    : "Chọn sản phẩm để thanh toán"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GioHang;