


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    phone: '',
    photo: null,
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    // Gọi API để lấy thông tin người dùng
    axios.get('http://localhost:8080/api/thongtin', {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
    })
      .then(res => {
        const data = res.data;
        setUser(data);
        setFormData({
          email: data.email,
          fullname: data.fullname,
          phone: data.phoneNumber,
          photo: null,
        });
        setPhotoPreview(data.photo ? `http://localhost:8080/uploads/${data.photo}` : '/images/default-avatar.png');
      })
      .catch(err => {
        console.error(err);
        setMessage({ type: 'error', content: 'Không thể tải thông tin người dùng' });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        alert('Ảnh phải nhỏ hơn 2MB!');
        return;
      }
      setFormData({ ...formData, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    const data = new FormData();
    data.append('email', formData.email);
    data.append('fullname', formData.fullname);
    data.append('phone', formData.phone);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/thayDoiThongTin', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setMessage({ type: 'success', content: 'Cập nhật thành công!' });
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Đã có lỗi xảy ra';
      setMessage({ type: 'error', content: errorMsg });
    }
  };

  return (
    <div style={styles.container}>
      <h2><i className="fas fa-user-edit"></i> Thay đổi thông tin cá nhân</h2>

      {message.content && (
        <div style={message.type === 'success' ? styles.alert : styles.error}>
          {message.content}
        </div>
      )}

      <img src={photoPreview} alt="Ảnh đại diện" style={styles.avatar} />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <LabelInput icon="fas fa-envelope" name="email" type="email" value={formData.email} onChange={handleChange} />
        <LabelInput icon="fas fa-user" name="fullname" type="text" value={formData.fullname} onChange={handleChange} />
        <LabelInput icon="fas fa-phone" name="phone" type="text" value={formData.phone} onChange={handleChange} />

        <label>Hình ảnh (tối đa 2MB):</label>
        <div style={styles.inputGroup}>
          <i className="fas fa-image" style={styles.icon}></i>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} style={styles.inputFile} />
        </div>

        <button type="submit" style={styles.button}><i className="fas fa-save"></i> Lưu thay đổi</button>
      </form>

      <a href="/thongtin" style={styles.backLink}><i className="fas fa-arrow-left"></i> Quay lại</a>
    </div>
  );
};

const LabelInput = ({ icon, name, type, value, onChange }) => (
  <>
    <label style={styles.label}>{name === 'fullname' ? 'Họ tên' : name === 'phone' ? 'Số điện thoại' : 'Email'}:</label>
    <div style={styles.inputGroup}>
      <i className={icon} style={styles.icon}></i>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={name === 'email'}
        style={styles.input}
      />
    </div>
  </>
);

const styles = {
  container: {
    background: 'white',
    padding: '20px',
    width: '400px',
    margin: '50px auto',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'left',
    display: 'block',
    marginTop: '15px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: 'white',
  },
  icon: {
    padding: '10px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
  },
  inputFile: {
    flex: 1,
    padding: '10px',
    border: 'none',
    outline: 'none',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    border: 'none',
    width: '100%',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  backLink: {
    display: 'block',
    marginTop: '15px',
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '14px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ccc',
    marginBottom: '10px',
  },
  alert: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  error: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default EditProfile;
