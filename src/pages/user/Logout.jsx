// // src/pages/Logout.js

// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Xóa token JWT khỏi localStorage hoặc cookie
//     localStorage.removeItem('token');  // Hoặc cookie.remove('your_token_name');

//     // Điều hướng đến trang login
//     navigate('/auth/login');
//   }, [navigate]);

//   return <h2>Đang đăng xuất...</h2>;
// };

// export default Logout;
// src/pages/Logout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa tất cả dữ liệu trong localStorage
    localStorage.clear();  // Xóa tất cả các mục trong localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    // Nếu bạn đang dùng cookie, có thể thêm mã xóa cookie ở đây (nếu cần)
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    // Điều hướng đến trang login
    navigate('/auth/login');
    window.dispatchEvent(new Event("userNameUpdated"));

  }, [navigate]);

  return <h2>Đang đăng xuất...</h2>;
};

export default Logout;

