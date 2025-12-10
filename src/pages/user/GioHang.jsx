import React, { useEffect, useState } from "react";
import {
    getGiohang,
    capNhatSoLuong,
    xoaSanphamTrongGiohang,
} from "../../api/giohang";
import { Alert } from 'react-bootstrap'; // Import Alert component từ react-bootstrap

const Giohang = () => {
    const [giohang, setGiohang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warningMessage, setWarningMessage] = useState(""); // Thêm trạng thái thông báo lỗi

    // Gọi API khi component load
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
            fetchGiohang(); // Lấy lại giỏ hàng sau khi xóa
        } catch (error) {
            console.error("Lỗi khi xoá sản phẩm:", error);
        }
    };
    
    if (loading) return <p>Đang tải giỏ hàng...</p>;

    return (
        <div className="container mt-4">
            <h2>🛒 Giỏ hàng của bạn</h2>
            {/* Hiển thị thông báo dưới dạng alert */}
            {warningMessage && (
                <Alert variant="danger">
                    {warningMessage}
                </Alert>
            )}
            {giohang.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <table className="table table-bordered table-hover mt-3">
                    <thead className="table-secondary">
                        <tr>
                            <th>ID</th>
                            <th>TênTên Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {giohang.map((item) => {
                            console.log("Item trong giỏ:", item);
                            
                            // Tính toán tổng tiền cho sản phẩm
                            const tongTien = item.quantity * item.totalPrice;

                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
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
                                                    item.maxQuantity // Truyền số lượng tối đa từ kho
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
