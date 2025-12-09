// import React, { useState } from 'react';
// import axios from 'axios';

// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading

//   // Lấy token từ localStorage
//   const token = localStorage.getItem('token'); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Kiểm tra mật khẩu mới
//     if (newPassword.length < 6) {
//       alert("Mật khẩu mới phải có ít nhất 6 ký tự.");
//       return;
//     }

//     setIsLoading(true); // Bắt đầu yêu cầu

//     try {
//       const response = await axios.post('http://localhost:8080/api/doiMatKhau/submit', {
//         oldPassword,
//         newPassword
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}` // Gửi token trong header
//         }
//       });

//       if (response.data.message === 'Đổi mật khẩu thành công!') {
//         setMessage(response.data.message);
//         setError('');
//       } else {
//         setMessage('');
//         setError(response.data.message);
//       }
//     } catch (err) {
//       setMessage('');
//       if (err.response) {
//         // Nếu lỗi trả về từ server (ví dụ: 400, 500)
//         setError(err.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
//       } else {
//         // Nếu lỗi không phải từ server (mạng không ổn định)
//         setError('Không thể kết nối đến server. Vui lòng kiểm tra lại.');
//       }
//     } finally {
//       setIsLoading(false); // Kết thúc yêu cầu
//     }
//   };

//   return (
//     <div className="password-container">
//       <h2 className="text-center mb-4">Đổi Mật Khẩu</h2>

//       {message && (
//         <div className="alert alert-success text-center">
//           <span>{message}</span>
//         </div>
//       )}

//       {error && (
//         <div className="alert alert-danger text-center">
//           <span>{error}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Mật khẩu cũ</label>
//           <div className="input-group">
//             <span className="input-group-text"><i className="fa fa-lock"></i></span>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Nhập mật khẩu cũ"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Mật khẩu mới</label>
//           <div className="input-group">
//             <span className="input-group-text"><i className="fa fa-key"></i></span>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Nhập mật khẩu mới"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <button type="submit" className="btn btn-confirm" disabled={isLoading}>
//           {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const [backgroundColor, setBackgroundColor] = useState(''); // Trạng thái màu nền

  // Lấy token từ localStorage
  const token = localStorage.getItem('token'); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới
    if (newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    setIsLoading(true); // Bắt đầu yêu cầu

    try {
      const response = await axios.post('http://localhost:8080/api/doiMatKhau/submit', {
        oldPassword,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Gửi token trong header
        }
      });

      if (response.data.message === 'Đổi mật khẩu thành công!') {
        setMessage(response.data.message);
        setError('');
        setBackgroundColor('green'); // Thay đổi màu nền khi thành công
      } else {
        setMessage('');
        setError(response.data.message);
        setBackgroundColor(''); // Trở lại màu nền mặc định khi có lỗi
      }
    } catch (err) {
      setMessage('');
      if (err.response) {
        // Nếu lỗi trả về từ server (ví dụ: 400, 500)
        setError(err.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      } else {
        // Nếu lỗi không phải từ server (mạng không ổn định)
        setError('Không thể kết nối đến server. Vui lòng kiểm tra lại.');
      }
      setBackgroundColor(''); // Trở lại màu nền mặc định khi có lỗi
    } finally {
      setIsLoading(false); // Kết thúc yêu cầu
    }
  };

  return (
    <div className="password-container" style={{ backgroundColor: backgroundColor }}>
      <h2 className="text-center mb-4">Đổi Mật Khẩu</h2>

      {message && (
        <div className="alert alert-success text-center">
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mật khẩu cũ</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fa fa-lock"></i></span>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu cũ"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fa fa-key"></i></span>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-confirm" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
