import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const API = "http://localhost:5000";

const ViewShopProducts = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const uid = sessionStorage.getItem("uid"); // ✅ user id from session

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/product/byshop/${shopId}`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shopId) loadProducts();
  }, [shopId]);

  // ✅ ADD TO CART
  const addToCart = async (productId) => {
    if (!uid) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(`${API}/cart/${uid}`, {
        productId,
        cartQuantity: 1, // default 1
      });

      alert(res.data.message || "Added");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Add to cart failed");
    }
  };

  return (
    <div>
      <h2>Shop Products</h2>
      <button onClick={() => navigate(-1)}>Back</button>

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
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" align="center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={`${API}/public/uploads/${p.productPhoto}`}
                    alt="product"
                    width="90"
                  />
                </td>
                <td>{p.productName}</td>
                <td>{p.productDetails}</td>
                <td>{p.productPrice}</td>
                <td>{p.productStatus}</td>
                <td>
                  <button onClick={() => addToCart(p._id)}>Add To Cart</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewShopProducts;