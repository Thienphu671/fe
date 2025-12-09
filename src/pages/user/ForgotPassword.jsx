// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
  
      const res = await axios.post('http://localhost:8080/api/quenmatkhau', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      setMessage(res.data.message || 'Yêu cầu đã được gửi thành công!');
    } catch (error) {
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại!');
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.container} onSubmit={handleSubmit}>
        <h2 style={styles.title}>
          <i className="fas fa-lock"></i> Quên mật khẩu
        </h2>
        <label htmlFor="email">Nhập Email Của Bạn:</label>
        <div style={styles.inputGroup}>
          <i className="fas fa-envelope" style={styles.icon}></i>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          <i className="fas fa-paper-plane"></i> Gửi yêu cầu
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    background: '#fff',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: 300,
  },
  title: {
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: 4,
    marginBottom: 10,
    background: '#fff',
  },
  icon: {
    padding: 10,
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 10,
    border: 'none',
    outline: 'none',
    fontSize: 14,
    background: 'transparent',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: 10,
    width: '100%',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
    transition: '0.3s',
  },
  message: {
    color: 'green',
    marginTop: 10,
  },
};

export default ForgotPassword;
