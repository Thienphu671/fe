// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Register = () => {
// //   const [userData, setUserData] = useState({
// //     email: "",
// //     password: "",
// //     fullname: "",
// //     phoneNumber: "",
// //     photoFile: null,
// //   });

// //   const [fileError, setFileError] = useState("");
// //   const [preview, setPreview] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");

// //   const navigate = useNavigate();

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     const maxSize = 20 * 1024 * 1024; // 20MB
// //     if (file) {
// //       if (file.size > maxSize) {
// //         setFileError("Ảnh quá lớn, vui lòng chọn ảnh khác.");
// //         setPreview("");
// //       } else {
// //         setFileError("");
// //         const reader = new FileReader();
// //         reader.onloadend = () => {
// //           setPreview(reader.result);
// //         };
// //         reader.readAsDataURL(file);
// //         setUserData((prevData) => ({
// //           ...prevData,
// //           photoFile: file,
// //         }));
// //       }
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const formData = new FormData();
// //     formData.append("email", userData.email);
// //     formData.append("password", userData.password);
// //     formData.append("fullname", userData.fullname);
// //     formData.append("phoneNumber", userData.phoneNumber);
// //     if (userData.photoFile) {
// //       formData.append("photoFile", userData.photoFile);
// //     }

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8080/auth/api/DangKy",
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       setSuccessMessage("Đăng ký thành công!");
// //       setErrorMessage("");
// //     } catch (error) {
// //       // Kiểm tra lỗi từ backend và hiển thị thông báo lỗi chi tiết
// //       if (error.response && error.response.data) {
// //         // Lấy thông báo lỗi chi tiết từ backend
// //         setErrorMessage(error.response.data.message || "Đăng ký thất bại, vui lòng thử lại!");
// //       } else {
// //         setErrorMessage("Đăng ký thất bại, vui lòng thử lại!");
// //       }
// //       setSuccessMessage("");
// //     }
// //   };

// //   // Điều hướng người dùng sau khi đăng ký thành công
// //   useEffect(() => {
// //     if (successMessage) {
// //       setTimeout(() => {
// //         navigate("/auth/login"); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
// //       }, 2000); // Sau 2 giây
// //     }
// //   }, [successMessage, navigate]);

// //   return (
// //     <div
// //       className="container"
// //       style={{
// //         maxWidth: "500px",
// //         padding: "30px",
// //         backgroundColor: "#fff",
// //         borderRadius: "8px",
// //         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// //       }}
// //     >
// //       <h2 className="text-center text-primary">Đăng Ký Tài Khoản Mới</h2>
// //       {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
// //       {successMessage && <div className="alert alert-success">{successMessage}</div>}

// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             className="form-control"
// //             id="email"
// //             name="email"
// //             value={userData.email}
// //             onChange={handleInputChange}
// //             placeholder="Nhập email"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="password">Mật khẩu</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="password"
// //             name="password"
// //             value={userData.password}
// //             onChange={handleInputChange}
// //             placeholder="Nhập mật khẩu"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="fullname">Họ tên</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="fullname"
// //             name="fullname"
// //             value={userData.fullname}
// //             onChange={handleInputChange}
// //             placeholder="Nhập họ tên"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="phoneNumber">Số điện thoại</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="phoneNumber"
// //             name="phoneNumber"
// //             value={userData.phoneNumber}
// //             onChange={handleInputChange}
// //             placeholder="Nhập số điện thoại"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="photoFile">Ảnh đại diện</label>
// //           <input
// //             type="file"
// //             className="form-control-file"
// //             id="photoFile"
// //             accept="image/*"
// //             onChange={handleFileChange}
// //           />
// //           {fileError && <p className="text-danger">{fileError}</p>}
// //           {preview && (
// //             <img
// //               src={preview}
// //               alt="Ảnh đại diện"
// //               className="img-fluid"
// //               style={{ maxWidth: "150px", marginTop: "10px" }}
// //             />
// //           )}
// //         </div>

// //         <button type="submit" className="btn btn-primary btn-block">
// //           Đăng Ký
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//     fullname: "",
//     phoneNumber: "",
//     photoFile: null,
//   });

//   const [fileError, setFileError] = useState("");
//   const [preview, setPreview] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const maxSize = 20 * 1024 * 1024; // 20MB
//     if (file) {
//       if (file.size > maxSize) {
//         setFileError("Ảnh quá lớn, vui lòng chọn ảnh khác.");
//         setPreview("");
//       } else {
//         setFileError("");
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreview(reader.result);
//         };
//         reader.readAsDataURL(file);
//         setUserData((prevData) => ({
//           ...prevData,
//           photoFile: file,
//         }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append("email", userData.email);
//     formData.append("password", userData.password);
//     formData.append("fullname", userData.fullname);
//     formData.append("phoneNumber", userData.phoneNumber);
  
//     if (userData.photoFile) {
//       formData.append("photoFile", userData.photoFile);
//     }
  
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/auth/api/DangKy",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       setSuccessMessage("Đăng ký thành công!");
//       setErrorMessage("");
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.message || "Đăng ký thất bại, vui lòng thử lại!");
//       } else {
//         setErrorMessage("Đăng ký thất bại, vui lòng thử lại!");
//       }
//       setSuccessMessage("");
//     }
//   };
  

//   // Điều hướng người dùng sau khi đăng ký thành công
//   useEffect(() => {
//     if (successMessage) {
//       setTimeout(() => {
//         navigate("/auth/login"); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
//       }, 2000); // Sau 2 giây
//     }
//   }, [successMessage, navigate]);

//   return (
//     <div
//       className="container"
//       style={{
//         maxWidth: "500px",
//         padding: "30px",
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <h2 className="text-center text-primary">Đăng Ký Tài Khoản Mới</h2>
//       {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
//       {successMessage && <div className="alert alert-success">{successMessage}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             value={userData.email}
//             onChange={handleInputChange}
//             placeholder="Nhập email"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Mật khẩu</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={handleInputChange}
//             placeholder="Nhập mật khẩu"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="fullname">Họ tên</label>
//           <input
//             type="text"
//             className="form-control"
//             id="fullname"
//             name="fullname"
//             value={userData.fullname}
//             onChange={handleInputChange}
//             placeholder="Nhập họ tên"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="phoneNumber">Số điện thoại</label>
//           <input
//             type="text"
//             className="form-control"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={userData.phoneNumber}
//             onChange={handleInputChange}
//             placeholder="Nhập số điện thoại"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="photoFile">Ảnh đại diện</label>
//           <input
//             type="file"
//             className="form-control-file"
//             id="photoFile"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//           {fileError && <p className="text-danger">{fileError}</p>}
//           {preview && (
//             <img
//               src={preview}
//               alt="Ảnh đại diện"
//               className="img-fluid"
//               style={{ maxWidth: "150px", marginTop: "10px" }}
//             />
//           )}
//         </div>

//         <button type="submit" className="btn btn-primary btn-block">
//           Đăng Ký
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    photoFile: null,
  });

  const [fileError, setFileError] = useState("");
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file) {
      if (file.size > maxSize) {
        setFileError("Ảnh quá lớn, vui lòng chọn ảnh khác.");
        setPreview("");
      } else {
        setFileError("");
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setUserData((prevData) => ({
          ...prevData,
          photoFile: file,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("fullname", userData.fullname);
    formData.append("phoneNumber", userData.phoneNumber);
  
    if (userData.photoFile) {
      formData.append("photoFile", userData.photoFile);
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/api/DangKy",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setSuccessMessage("Đăng ký thành công!");
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Đăng ký thất bại, vui lòng thử lại!");
      } else {
        setErrorMessage("Đăng ký thất bại, vui lòng thử lại!");
      }
      setSuccessMessage("");
    }
  };

  // Điều hướng người dùng sau khi đăng ký thành công
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/auth/login"); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      }, 2000); // Sau 2 giây
    }
  }, [successMessage, navigate]);

  return (
    <div
      className="container"
      style={{
        maxWidth: "500px",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-center text-primary">Đăng Ký Tài Khoản Mới</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Nhập email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Họ tên</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            value={userData.fullname}
            onChange={handleInputChange}
            placeholder="Nhập họ tên"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photoFile">Ảnh đại diện</label>
          <input
            type="file"
            className="form-control-file"
            id="photoFile"
            accept="image/*"
            onChange={handleFileChange}
          />
          {fileError && <p className="text-danger">{fileError}</p>}
          {preview && (
            <img
              src={preview}
              alt="Ảnh đại diện"
              className="img-fluid"
              style={{ maxWidth: "150px", marginTop: "10px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default Register;
