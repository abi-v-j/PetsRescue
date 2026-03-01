import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API = "http://localhost:5000";

const ViewShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadShops = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/shops/accepted`);
      setShops(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShops();
  }, []);

  const goProducts = (shopId) => {
    // ✅ pass shopId to next page
    navigate(`/user/serachProduct/${shopId}`);
  };

  return (
    <div>
      <h2>View Shops</h2>
      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Shop Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Place</th>
            <th>District</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {shops.length === 0 ? (
            <tr>
              <td colSpan="7" align="center">
                No shops found
              </td>
            </tr>
          ) : (
            shops.map((s) => (
              <tr key={s._id}>
                <td>
                  <img
                    src={`${API}/public/uploads/${s.shopPhoto}`}
                    alt="shop"
                    width="90"
                  />
                </td>
                <td>{s.shopName}</td>
                <td>{s.shopEmail}</td>
                <td>{s.shopAddress}</td>
                <td>{s.placeId?.placeName || "-"}</td>
                <td>{s.placeId?.districtId?.districtName || "-"}</td>
                <td>
                  <button onClick={() => goProducts(s._id)}>
                    View Products
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewShops;