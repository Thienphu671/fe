import React from 'react';

const SanPhamForm = () => {
    return (
        <div className="container mt-5">
            <h2>Thêm sản phẩm</h2>
            <form method="post" encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá:</label>
                    <input type="number" className="form-control" id="price" name="price" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Ảnh:</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*" />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Loại sản phẩm:</label>
                    <select className="form-select" id="category" name="category">
                        <option value="a">Loại A</option>
                        <option value="b">Loại B</option>
                        <option value="c">Loại C</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
            </form>
        </div>
    );
};

export default SanPhamForm;