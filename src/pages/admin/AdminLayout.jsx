// import React from "react";
// import AdminNavbar from "./AdminNavbar";

// const AdminLayout = ({ children, userName }) => {
//   return (
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       {/* Sidebar trái */}
//       <div style={{
//         width: "240px",
//         minHeight: "100vh",
//         backgroundColor: "#f8f9fa",
//         boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
//         position: "sticky",
//         top: 0
//       }}>
//         <AdminNavbar userName={userName} />
//       </div>

//       {/* Nội dung chính bên phải */}
//       <div className="flex-grow-1 p-4" style={{ backgroundColor: "#fff" }}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React from "react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children, userName }) => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar trái */}
      <div style={{
        width: "200px",  // Thay đổi giá trị width ở đây
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0
      }}>
        <AdminNavbar userName={userName} />
      </div>

      {/* Nội dung chính bên phải */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#fff" }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
