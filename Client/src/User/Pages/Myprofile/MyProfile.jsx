import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  const uid = sessionStorage.getItem("uid");

  const loadProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${uid}`);
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    if (!uid) {
      alert("Please login first");
      return;
    }
    loadProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>Photo</td>
            <td>
              <img
                src={`http://localhost:5000/uploads/${user.userPhoto}`}
                alt="User"
                width="120"
              />
            </td>
          </tr>

          <tr>
            <td>Name</td>
            <td>{user.userName}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{user.userEmail}</td>
          </tr>

          <tr>
            <td>Phone</td>
            <td>{user.userPhone}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{user.userAddress}</td>
          </tr>

          <tr>
            <td>Place</td>
            <td>{user.placeId?.placeName}</td>
          </tr>

          <tr>
            <td>District</td>
            <td>{user.placeId?.districtId?.districtName}</td>
          </tr>

          <tr>
            <td>Proof</td>
            <td>
              <a
                href={`http://localhost:5000/uploads/${user.userProof}`}
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