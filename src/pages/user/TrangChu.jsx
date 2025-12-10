
import React from 'react';
import { Link } from 'react-router-dom';

const TrangChu = () => {
  return (
    <div className="container mt-5">
      <h1>Chào mừng đến với Shop Thời Trang</h1>
      <p>Khám phá các sản phẩm thời trang mới nhất của chúng tôi. Tìm kiếm, mua sắm và tận hưởng các ưu đãi đặc biệt!</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/300"
              alt="Sản phẩm 1"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Sản phẩm 1</h5>
              <p className="card-text">Mô tả sản phẩm 1.</p>
              <Link to="/sanPham" className="btn btn-primary">
                Xem Sản Phẩm
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/300"
              alt="Sản phẩm 2"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Sản phẩm 2</h5>
              <p className="card-text">Mô tả sản phẩm 2.</p>
              <Link to="/sanPham" className="btn btn-primary">
                Xem Sản Phẩm
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/300"
              alt="Sản phẩm 3"
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Sản phẩm 3</h5>
              <p className="card-text">Mô tả sản phẩm 3.</p>
              <Link to="/sanPham" className="btn btn-primary">
                Xem Sản Phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Link to="/giohang" className="btn btn-secondary">
          Xem Giỏ Hàng
        </Link>
        <Link to="/favorites" className="btn btn-danger ms-3">
          Xem Yêu Thích
        </Link>
      </div>
    </div>
  );
};

export default TrangChu;
