


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null); // Tạo state cho userId

  // useEffect(() => {
  //   // Giả sử bạn lưu userId trong localStorage
  //   const storedUserId = localStorage.getItem('userId'); 
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //   }
  // }, []); // Chạy một lần khi component mount

  // useEffect(() => {
  //   if (!userId) return;  // Kiểm tra nếu chưa có userId
  //   axios.get(`http://localhost:8080/api/donHangND/list?userId=${userId}`)
  //     .then(response => {
  //       console.log(response.data); // Kiểm tra dữ liệu trả về từ API
  //       setOrders(response.data);
  //     })
  //     .catch(error => console.error("Lỗi khi tải đơn hàng:", error));
  // }, [userId]);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem('userId');
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //   }
  // }, []);

  // // Gọi API lấy đơn hàng khi đã có userId
  // useEffect(() => {
  //   if (!userId) return;

  //   const token = localStorage.getItem('token'); // Lấy JWT token

  //   axios.get(`http://localhost:8080/api/donHangND/list?userId=${userId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then(response => {
  //     console.log("Đơn hàng:", response.data);
  //     setOrders(response.data);
  //   })
  //   .catch(error => {
  //     console.error("Lỗi khi tải đơn hàng:", error.response?.status, error.response?.data || error.message);
  //   });
  // }, [userId]);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []); // Giữ nguyên
  
  useEffect(() => {
    if (!userId) return;
  
    const token = localStorage.getItem('token'); // Lấy JWT token
    if (!token) {
      console.error("Không tìm thấy token!");
      return;
    }
  
    axios.get(`http://localhost:8080/api/donHangND/list?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Đơn hàng:", response.data);
      setOrders(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.error("Lỗi khi tải đơn hàng:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        console.error("Lỗi khi cấu hình yêu cầu:", error.message);
      }
    });
  }, [userId]);
  

  const cancelOrder = (id) => {
    axios.post(`http://localhost:8080/api/donHangND/cancel/${id}`)
      .then(res => {
        alert(res.data);
        // Cập nhật trạng thái đơn hàng trong UI mà không cần gọi lại API
        setOrders(prev => prev.map(order => 
          order.id === id ? { ...order, status: 2 } : order
        ));
      })
      .catch(err => alert("Lỗi khi hủy đơn hàng: " + (err.response?.data || err.message)));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Danh Sách Đơn Hàng</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ngày Đặt</th>
            <th>Trạng Thái</th>
            <th>Chi Tiết</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td> {/* Hiển thị ngày đúng định dạng */}
              <td>
                {order.status === 1 && <span className="badge bg-success">Đã xác nhận</span>}
                {order.status === 0 && <span className="badge bg-warning">Chưa xác nhận</span>}
                {order.status === 2 && <span className="badge bg-danger">Đã hủy</span>}
              </td>
              <td>
                <a href={`/donHangND/detail/${order.id}`} className="btn btn-info btn-sm">Xem</a>

              </td>
              <td>
                {order.status === 0 ? (
                  <button className="btn btn-danger btn-sm" onClick={() => cancelOrder(order.id)}>
                    Hủy đơn
                  </button>
                ) : (
                  <span className="text-muted">Không thể hủy</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
