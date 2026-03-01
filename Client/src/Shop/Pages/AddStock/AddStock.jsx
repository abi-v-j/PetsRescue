import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const API = "http://localhost:5000";

const AddStock = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [stockId, setStockId] = useState(null);
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockStatus, setStockStatus] = useState("Available");
  const [loading, setLoading] = useState(false);

  // ✅ fetch stock
  const fetchStock = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/stock/byproduct/${productId}`);

      const stock = res.data.data; // can be null
      if (stock) {
        setStockId(stock._id);
        setStockQuantity(String(stock.stockQuantity ?? ""));
        setStockStatus(stock.stockStatus ?? "Available");
      } else {
        // no stock yet
        setStockId(null);
        setStockQuantity("");
        setStockStatus("Available");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch stock");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchStock();
  }, [productId]);

  // ✅ SAVE (recommended: POST /stock upsert)
  const saveStock = async (e) => {
    e.preventDefault();

    if (stockQuantity === "") return alert("Enter stock quantity");
    const qty = Number(stockQuantity);
    if (isNaN(qty) || qty < 0) return alert("Invalid quantity");
    if (!stockStatus) return alert("Enter stock status");

    try {
      setLoading(true);

      // ✅ upsert create/update
      await axios.post(`${API}/stock`, {
        productId,
        stockQuantity: qty,
        stockStatus,
      });

      alert("Stock saved");
      fetchStock();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE ONLY (optional: PUT /stock/:id)
  const updateStockOnly = async () => {
    if (!stockId) return alert("No stock record found. Use Save first.");

    const qty = Number(stockQuantity);
    if (isNaN(qty) || qty < 0) return alert("Invalid quantity");

    try {
      setLoading(true);
      await axios.put(`${API}/stock/${stockId}`, {
        stockQuantity: qty,
        stockStatus,
      });
      alert("Stock updated");
      fetchStock();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add / Update Stock</h2>
      <button onClick={() => navigate(-1)}>Back</button>

      <p>
        <b>Product ID:</b> {productId}
      </p>

      <p>
        <b>Current Stock ID:</b> {stockId || "Not created yet"}
      </p>

      {loading && <p>Loading...</p>}

      <form onSubmit={saveStock}>
        <div>
          <label>Stock Quantity</label>
          <br />
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </div>

        <div>
          <label>Stock Status</label>
          <br />
          <input
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
          />
        </div>

        <br />
        <button type="submit" disabled={loading}>
          Save (Create/Update)
        </button>

        {/* optional button if you want strict PUT update */}
        <button
          type="button"
          onClick={updateStockOnly}
          disabled={loading}
          style={{ marginLeft: 10 }}
        >
          Update Only (PUT)
        </button>
      </form>
    </div>
  );
};

export default AddStock;