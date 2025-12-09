    

    // import React, { useState } from 'react';
    // import axios from 'axios';
    // import 'bootstrap/dist/css/bootstrap.min.css';
    // import '@fortawesome/fontawesome-free/css/all.min.css';

    // const ResetPassword = ({ token }) => {
    // const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
    // const [error, setError] = useState('');

    // const validatePassword = () => {
    //     if (password.length < 6) {
    //     setError('Mật khẩu phải có ít nhất 6 ký tự.');
    //     return false;
    //     }
    //     return true;
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     // Kiểm tra mật khẩu hợp lệ
    //     if (!validatePassword()) {
    //     return;
    //     }
    
    //     // Lấy token từ URL
    //     const token = new URLSearchParams(window.location.search).get('token');
    
    //     // Kiểm tra nếu token không tồn tại
    //     if (!token) {
    //     setMessage('Token không hợp lệ!');
    //     return;
    //     }
    
    //     try {
    //     // Gửi yêu cầu POST với token và password
    //     const res = await axios.post('http://localhost:8080/api/reset-password', 
    //         { password, token }, {
    //         headers: { 'Content-Type': 'application/json' }
    //         }
    //     );
    //     setMessage(res.data.message || 'Mật khẩu đã được thay đổi thành công!');
    //     } catch (error) {
    //     console.error('Lỗi khi gửi yêu cầu:', error.response);  // Log chi tiết lỗi trả về từ backend
    //     if (error.response) {
    //         setMessage(`Lỗi: ${error.response.data.message || 'Đã xảy ra lỗi. Vui lòng thử lại!'}`);
    //     } else {
    //         setMessage('Không thể kết nối với máy chủ.');
    //     }
    //     }
    // };
    
    

    // return (
    //     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    //     <div className="reset-container bg-white p-4 rounded shadow text-center" style={{ width: '350px' }}>
    //         <h2 className="mb-4">Đặt lại mật khẩu</h2>

    //         {error && <div className="alert alert-danger">{error}</div>}
    //         {message && <div className="alert alert-success">{message}</div>}

    //         <form onSubmit={handleSubmit}>
    //         <div className="form-group text-start mb-3">
    //             <label>Mật khẩu mới</label>
    //             <div className="input-group">
    //             <span className="input-group-text bg-light">
    //                 <i className="fa fa-lock"></i>
    //             </span>
    //             <input
    //                 type="password"
    //                 className="form-control"
    //                 placeholder="Nhập mật khẩu mới"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //             </div>
    //         </div>

    //         <button type="submit" className="btn btn-reset w-100 text-white">
    //             Đặt lại mật khẩu
    //         </button>
    //         </form>
    //     </div>
    //     </div>
    // );
    // };

    // export default ResetPassword;

    import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ResetPassword = ({ token }) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const validatePassword = () => {
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu hợp lệ
    if (!validatePassword()) {
      return;
    }

    // Lấy token từ URL
    const token = new URLSearchParams(window.location.search).get('token');

    // Kiểm tra nếu token không tồn tại
    if (!token) {
      setMessage('Token không hợp lệ!');
      return;
    }

    try {
      // Gửi yêu cầu POST với token và password
      const res = await axios.post('http://localhost:8080/api/quenmatkhau/reset-password', 
        { password, token }, {
        headers: { 'Content-Type': 'application/json' }
      });

      setMessage(res.data.message || 'Mật khẩu đã được thay đổi thành công!');
      
      // Nếu đổi mật khẩu thành công, chuyển hướng đến trang đăng nhập
      navigate('/auth/login'); // Điều hướng đến trang đăng nhập
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error.response);  // Log chi tiết lỗi trả về từ backend
      if (error.response) {
        setMessage(`Lỗi: ${error.response.data.message || 'Đã xảy ra lỗi. Vui lòng thử lại!'}`);
      } else {
        setMessage('Không thể kết nối với máy chủ.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="reset-container bg-white p-4 rounded shadow text-center" style={{ width: '350px' }}>
        <h2 className="mb-4">Đặt lại mật khẩu</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group text-start mb-3">
            <label>Mật khẩu mới</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-reset w-100 text-white">
            Đặt lại mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
