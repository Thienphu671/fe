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

            document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.fullname);
            localStorage.setItem('isAdmin', isAdmin);

            window.dispatchEvent(new Event("userNameUpdated"));

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
        <div
            style={{
                backgroundImage: `url('/img/chup-anh-san-pham-phang-1596647399.jpg')`, // <-- cập nhật đường dẫn tùy nơi bạn đặt ảnh
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="container p-4 rounded" style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <h2 className="mb-4 text-center">Đăng nhập</h2>
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

                    <div className="text-center mt-3">
                    <span>Bạn chưa có tài khoản?</span>
                    <button
                        type="button"
                        onClick={() => navigate('/Dangky')}
                        className="btn btn-link p-0 ms-2"
                    >
                        Đăng ký
                    </button>
                </div>
                    {errorMessage && (
                        <div className="alert alert-danger mt-3">{errorMessage}</div>
                    )}
                </form>
            </div>
        </div>
    );
    
};

export default LoginPage;
