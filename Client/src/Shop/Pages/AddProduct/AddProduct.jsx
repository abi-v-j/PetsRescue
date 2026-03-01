import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const API = "http://localhost:5000";

const AddProduct = () => {
  const [sid, setSid] = useState("");

  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStatus, setProductStatus] = useState("Available");
  const [productPhoto, setProductPhoto] = useState(null);

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ get shop id from session
  useEffect(() => {
    const id = sessionStorage.getItem("sid");
    if (!id) {
      alert("Shop not logged in!");
      return;
    }
    setSid(id);
  }, []);

  const loadProducts = async (shopId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/product/byshop/${shopId}`);
      setList(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sid) loadProducts(sid);
  }, [sid]);

  const resetForm = () => {
    setProductName("");
    setProductDetails("");
    setProductPrice("");
    setProductStatus("Available");
    setProductPhoto(null);
    setEditId(null);

    const fileInput = document.getElementById("productPhotoInput");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sid) return alert("No shop id in session");
    if (!productName) return alert("Enter product name");
    if (!productDetails) return alert("Enter product details");
    if (!productPrice) return alert("Enter product price");
    if (!productStatus) return alert("Enter product status");

    try {
      const fd = new FormData();
      fd.append("productName", productName);
      fd.append("productDetails", productDetails);
      fd.append("productPrice", productPrice);
      fd.append("productStatus", productStatus);
      fd.append("shopId", sid);

      // for create, photo required
      if (!editId && !productPhoto) return alert("Select product photo");
      if (productPhoto) fd.append("productPhoto", productPhoto);

      if (editId) {
        await axios.put(`${API}/product/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Updated");
      } else {
        await axios.post(`${API}/product`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product Added");
      }

      resetForm();
      loadProducts(sid);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Save failed");
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setProductName(p.productName);
    setProductDetails(p.productDetails);
    setProductPrice(String(p.productPrice));
    setProductStatus(p.productStatus);
    setProductPhoto(null);

    const fileInput = document.getElementById("productPhotoInput");
    if (fileInput) fileInput.value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/product/${id}`);
      loadProducts(sid);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>{editId ? "Edit Product" : "Add Product"}</h2>
      <p>Shop ID: {sid || "Not Found in Session"}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <br />
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <label>Product Details</label>
          <br />
          <textarea
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        </div>

        <div>
          <label>Product Price</label>
          <br />
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Product Status</label>
          <br />
          <input
            value={productStatus}
            onChange={(e) => setProductStatus(e.target.value)}
          />
        </div>

        <div>
          <label>Product Photo {editId ? "(optional)" : "(required)"}</label>
          <br />
          <input
            id="productPhotoInput"
            type="file"
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />
        </div>

        <button type="submit">{editId ? "Update" : "Save"}</button>
        {editId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <hr />

      <h3>My Products</h3>
      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Details</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">No products</td>
            </tr>
          ) : (
            list.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={`${API}/public/uploads/${p.productPhoto}`}
                    alt="product"
                    width="100"
                  />
                </td>
                <td>{p.productName}</td>
                <td>{p.productDetails}</td>
                <td>{p.productPrice}</td>
                <td>{p.productStatus}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                  <Link to={`/shop/addStock/${p._id}`}>Add Stock</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddProduct;