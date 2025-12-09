

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // hoặc từ cookies, tuỳ cách bạn lưu
        const response = await axios.get("http://localhost:8080/api/thongtin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!user) return <div className="text-center">Đang tải...</div>;

  // Đảm bảo URL của ảnh đúng
  const avatar = user.photo ? `http://localhost:8080/uploads/${user.photo}` : '/images/default-avatar.png';

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f4f7fa' }}>
      <div className="profile-container bg-white p-4 rounded shadow text-center" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4">Thông Tin Cá Nhân</h2>

        <div className="avatar-container mb-3">
          <img src={avatar} alt="Ảnh đại diện"
               style={{
                 width: '120px',
                 height: '120px',
                 borderRadius: '50%',
                 objectFit: 'cover',
                 border: '3px solid #007bff',
                 transition: '0.3s',
                 cursor: 'pointer'  // Thêm con trỏ để tạo cảm giác có thể tương tác
               }}
               onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
               onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        <div className="info d-flex justify-content-between bg-light p-2 rounded mb-2">
          <strong>Email:</strong><span>{user.email}</span>
        </div>
        <div className="info d-flex justify-content-between bg-light p-2 rounded mb-2">
          <strong>Họ Tên:</strong><span>{user.fullname}</span>
        </div>
        <div className="info d-flex justify-content-between bg-light p-2 rounded mb-2">
          <strong>Số Điện Thoại:</strong><span>{user.phoneNumber}</span>
        </div>

        <a href="/thayDoiThongTin" className="btn btn-primary w-100 mt-3">
          <i className="fa fa-edit"></i> Chỉnh sửa thông tin
        </a>
        <a href="/trangChu/form" className="btn btn-secondary w-100 mt-2">
          <i className="fa fa-home"></i> Về Trang Chủ
        </a>
        <a href="/logout" className="btn btn-danger w-100 mt-2">
          <i className="fa fa-sign-out-alt"></i> Đăng xuất
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
