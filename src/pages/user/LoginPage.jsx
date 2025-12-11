

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage('');

//         try {
//             const response = await axios.post('http://localhost:8080/auth/api/login', {
//                 email,
//                 password
//             });

//             const { token, user, isAdmin } = response.data;

//             if (!token) {
//                 throw new Error('Đăng nhập thất bại');
//             }

//             // ✅ Lưu token vào localStorage
//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));

//             if (isAdmin) {
//                 navigate('/admin/AdminDashboard');
//             } else {
//                 navigate('/trangChu/form');
//             }

//         } catch (error) {
//             setErrorMessage(
//                 error.response?.data?.message || error.message || 'Đăng nhập thất bại'
//             );
//         }
//     };

//     return (
//         <div className="container mt-5" style={{ maxWidth: '400px' }}>
//             <h2 className="mb-4">Đăng nhập</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="form-control"
//                         placeholder="Email"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="form-control"
//                         placeholder="Mật khẩu"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
//                 {errorMessage && (
//                     <div className="alert alert-danger mt-3">{errorMessage}</div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage('');
    
//         try {
//             const response = await axios.post('http://localhost:8080/auth/api/login', {
//                 email,
//                 password
//             });
    
//             const { token, user, isAdmin } = response.data;
    
//             if (!token) {
//                 throw new Error('Đăng nhập thất bại');
//             }
    
//             // Lưu token vào cookie
//             document.cookie = `token=${token}; path=/; Secure; HttpOnly; SameSite=Strict`;
    
//             // Lưu thông tin user và tên người dùng vào localStorage
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('userName', user.fullname);  // Lưu tên người dùng
//             window.dispatchEvent(new Event("userNameUpdated")); // 👈 dòng này rất quan trọng!

//             localStorage.setItem("isAdmin", response.data.isAdmin); // lưu vào localStorage
//             // Chuyển hướng người dùng dựa trên quyền admin
//             if (isAdmin) {
//                 navigate('/admin/AdminNavbar');
//             } else {
//                 navigate('/trangChu/form');
//             }
    
//         } catch (error) {
//             setErrorMessage(
//                 error.response?.data?.message || error.message || 'Đăng nhập thất bại'
//             );
//         }
//     };
    

//     return (
//         <div className="container mt-5" style={{ maxWidth: '400px' }}>
//             <h2 className="mb-4">Đăng nhập</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="form-control"
//                         placeholder="Email"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="form-control"
//                         placeholder="Mật khẩu"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
//                 {errorMessage && (
//                     <div className="alert alert-danger mt-3">{errorMessage}</div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default LoginPage;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage('');

//         try {
//             const response = await axios.post('http://localhost:8080/auth/api/login', {
//                 email,
//                 password
                
//             });
 
//             const { token, user, isAdmin } = response.data;

//             if (!token) {
//                 throw new Error('Đăng nhập thất bại');
//             }

//             // Lưu token vào cookie
//             document.cookie = `token=${token}; path=/; Secure; HttpOnly; SameSite=Strict`;

//             // Lưu thông tin user và quyền vào localStorage
//             localStorage.setItem('token', token);
// //             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('userName', user.fullname);
//             localStorage.setItem('isAdmin', isAdmin); // Lưu trước rồi mới dispatch
// // Sau khi login thành công
//         localStorage.setItem("userId", response.data.userId);

//             // 🔥 Quan trọng: dispatch sau khi set isAdmin
//             window.dispatchEvent(new Event("userNameUpdated"));

//             // Điều hướng
//             if (isAdmin) {
//                 navigate('/admin/AdminNavbar');
//             } else {
//                 navigate('/trangChu/form');
//             }

//         } catch (error) {
//             setErrorMessage(
//                 error.response?.data?.message || error.message || 'Đăng nhập thất bại'
//             );
//         }
//     };

//     return (
//         <div className="container mt-5" style={{ maxWidth: '400px' }}>
//             <h2 className="mb-4">Đăng nhập</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="form-control"
//                         placeholder="Email"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="form-control"
//                         placeholder="Mật khẩu"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
//                 {errorMessage && (
//                     <div className="alert alert-danger mt-3">{errorMessage}</div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default LoginPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8080/auth/api/login', {
                email,
                password
            });

            const { token, user, isAdmin } = response.data;

            if (!token || !user) {
                throw new Error('Đăng nhập thất bại');
            }

            // Ghi chú: HttpOnly không thể set từ JS, nên chỉ dùng khi backend set cookie
            document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

            // Lưu thông tin vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', user.id); // dùng user.id thay vì response.data.userId
            localStorage.setItem('userName', user.fullname);
            localStorage.setItem('isAdmin', isAdmin);

            // Gửi sự kiện cho các component khác nếu cần
            window.dispatchEvent(new Event("userNameUpdated"));

            // Điều hướng tùy theo vai trò
            if (isAdmin) {
                navigate('/admin/AdminNavbar');
            } else {
                navigate('/trangChu/form');
            }

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || error.message || 'Đăng nhập thất bại'
            );
        }
    };
 
    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4">Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Mật khẩu"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
                {errorMessage && (
                    <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
