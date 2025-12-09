import React from 'react';
import { Link } from 'react-router-dom';

const MenuThongKe = () => {
    return (
        <div className="container mt-5">
            <h2>Chọn thống kê</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/thongke">Tổng quan</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/thongke/spyt">Sản phẩm yêu thích</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/thongke/spbc">Sản phẩm bán chạy</Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuThongKe;