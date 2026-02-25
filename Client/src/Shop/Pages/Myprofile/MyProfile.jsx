import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [shop, setShop] = useState(null);

  const sid = sessionStorage.getItem("sid");

  const loadProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/shop/${sid}`);
      setShop(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    if (!sid) {
      alert("Please login first");
      return;
    }
    loadProfile();
  }, []);

  if (!shop) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop Profile</h2>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>Photo</td>
            <td>
              <img
                src={`http://localhost:5000/uploads/${shop.shopPhoto}`}
                alt="Shop"
                width="120"
              />
            </td>
          </tr>

          <tr>
            <td>Shop Name</td>
            <td>{shop.shopName}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{shop.shopEmail}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{shop.shopAddress}</td>
          </tr>

          <tr>
            <td>Place</td>
            <td>{shop.placeId?.placeName}</td>
          </tr>

          <tr>
            <td>District</td>
            <td>{shop.placeId?.districtId?.districtName}</td>
          </tr>

          <tr>
            <td>Proof</td>
            <td>
              <a
                href={`http://localhost:5000/uploads/${shop.shopProof}`}
                target="_blank"
                rel="noreferrer"
              >
                View Proof
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyProfile;