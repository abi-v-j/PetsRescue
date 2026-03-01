import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyShop = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchShops = async () => {
    try {
      const p = await axios.get("http://localhost:5000/admin/shops/status/0");
      const a = await axios.get("http://localhost:5000/admin/shops/status/1");
      const r = await axios.get("http://localhost:5000/admin/shops/status/2");

      setPending(p.data.data);
      setAccepted(a.data.data);
      setRejected(r.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const acceptShop = async (id) => {
    await axios.put(`http://localhost:5000/admin/shops/accept/${id}`);
    fetchShops();
  };

  const rejectShop = async (id) => {
    await axios.put(`http://localhost:5000/admin/shops/reject/${id}`);
    fetchShops();
  };

  const renderTable = (title, data, showActions = false) => (
    <div>
      <h2>{title}</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Place</th>
            <th>District</th>
            {showActions && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((shop) => (
            <tr key={shop._id}>
              <td>{shop.shopName}</td>
              <td>{shop.shopEmail}</td>
              <td>{shop.shopAddress}</td>
              <td>{shop.placeId?.placeName}</td>
              <td>{shop.placeId?.districtId?.districtName}</td>
              {showActions && (
                <td>
                  <button onClick={() => acceptShop(shop._id)}>Accept</button>
                  <button onClick={() => rejectShop(shop._id)}>Reject</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {renderTable("Pending Shops", pending, true)}
      {renderTable("Accepted Shops", accepted)}
      {renderTable("Rejected Shops", rejected)}
    </div>
  );
};

export default VerifyShop;