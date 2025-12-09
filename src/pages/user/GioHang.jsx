import React, { useEffect, useState } from "react";
import {
    getGiohang,
    capNhatSoLuong,
    xoaSanphamTrongGiohang,
} from "../../api/giohang";
import { Alert } from 'react-bootstrap';

const Giohang = () => {
    const [giohang, setGiohang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
        fetchGiohang();
    }, []);

    const fetchGiohang = async () => {
        try {
            const response = await getGiohang();
            setGiohang(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCapNhat = async (giohangId, newQuantity, maxQuantity) => {
        if (newQuantity < 1) {
            alert("Số lượng sản phẩm không thể nhỏ hơn 1!");
            return;
        } else if (newQuantity > maxQuantity) {
            alert("Số lượng sản phẩm không đủ trong kho!");
            return;
        }

        try {
            await capNhatSoLuong(giohangId, newQuantity);
            fetchGiohang();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Số lượng sản phẩm trong kho không đủ!");
            } else {
                alert("Lỗi khi cập nhật số lượng!");
            }
            console.error("Lỗi khi cập nhật số lượng:", error);
        }
    };

    const handleXoa = async (sanphamId) => {
        try {
            await xoaSanphamTrongGiohang(sanphamId);
            fetchGiohang();
        } catch (error) {
            console.error("Lỗi khi xoá sản phẩm:", error);
        }
    };

    if (loading) return <p>Đang tải giỏ hàng...</p>;

    return (
        <div className="container mt-4">
            <h2>🛒 Giỏ hàng của bạn</h2>

            {warningMessage && (
                <Alert variant="danger">{warningMessage}</Alert>
            )}

            {giohang.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <table className="table table-bordered table-hover mt-3">
                    <thead className="table-secondary">
                        <tr>
                            <th>Hình</th>
                            <th>Tên Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {giohang.map((item) => {
                            const tongTien = item.quantity * item.totalPrice;

                            return (
                                <tr key={item.id}>
                                    <td>
                                        <img
                                            src={
                                                item.product?.hinh
                                                    ? `http://localhost:8080/uploads/${item.product.hinh}`
                                                    : "https://via.placeholder.com/60"
                                            }
                                            alt={item.product?.ten || "Sản phẩm"}
                                            width="60"
                                            height="60"
                                            style={{ objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    </td>

                                    <td>{item.product?.ten}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleCapNhat(
                                                    item.id,
                                                    parseInt(e.target.value),
                                                    item.maxQuantity
                                                )
                                            }
                                            style={{ width: "80px" }}
                                        />
                                    </td>
                                    <td>{tongTien.toLocaleString("vi-VN")}₫</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleXoa(item.productId)}
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Giohang;
