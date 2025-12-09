import React from 'react';

const UserList = () => {
    return (
        <div className="container mt-5">
            <h2>Danh sách người dùng</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dữ liệu người dùng sẽ được render tại đây */}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;