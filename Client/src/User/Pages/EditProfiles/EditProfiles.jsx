import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProfiles = () => {
  const uid = sessionStorage.getItem("uid");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [oldPhoto, setOldPhoto] = useState("");
  const [oldProof, setOldProof] = useState("");

  const [userPhoto, setUserPhoto] = useState(null);
  const [userProof, setUserProof] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${uid}`);
      const u = res.data.data;

      setUserName(u.userName || "");
      setUserEmail(u.userEmail || "");
      setUserAddress(u.userAddress || "");
      setUserPhone(u.userPhone || "");

      setOldPhoto(u.userPhoto || "");
      setOldProof(u.userProof || "");
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userName.trim()) return alert("Enter name");
    if (!userEmail.trim()) return alert("Enter email");
    if (!userAddress.trim()) return alert("Enter address");
    if (!userPhone.trim()) return alert("Enter phone");

    try {
      const fd = new FormData();
      fd.append("userName", userName.trim());
      fd.append("userEmail", userEmail.trim());
      fd.append("userAddress", userAddress.trim());
      fd.append("userPhone", userPhone.trim());

      // optional files
      if (userPhoto) fd.append("userPhoto", userPhoto);
      if (userProof) fd.append("userProof", userProof);

      const res = await axios.put(`http://localhost:5000/user/${uid}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Updated");

      // refresh preview
      setUserPhoto(null);
      setUserProof(null);
      const photoInput = document.getElementById("userPhoto");
      const proofInput = document.getElementById("userProof");
      if (photoInput) photoInput.value = "";
      if (proofInput) proofInput.value = "";
      loadProfile();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Update failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Profile</h2>

      <form onSubmit={handleUpdate}>
        <table border="1" cellPadding="10">
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              </td>
            </tr>

            <tr>
              <td>Phone</td>
              <td>
                <input value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
              </td>
            </tr>

            <tr>
              <td>Address</td>
              <td>
                <textarea
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Current Photo</td>
              <td>
                {oldPhoto ? (
                  <img
                    src={`http://localhost:5000/uploads/${oldPhoto}`}
                    alt="old"
                    width="120"
                  />
                ) : (
                  "No Photo"
                )}
              </td>
            </tr>

            <tr>
              <td>New Photo</td>
              <td>
                <input
                  id="userPhoto"
                  type="file"
                  onChange={(e) => setUserPhoto(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td>Current Proof</td>
              <td>
                {oldProof ? (
                  <a
                    href={`http://localhost:5000/uploads/${oldProof}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Proof
                  </a>
                ) : (
                  "No Proof"
                )}
              </td>
            </tr>

            <tr>
              <td>New Proof</td>
              <td>
                <input
                  id="userProof"
                  type="file"
                  onChange={(e) => setUserProof(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EditProfiles;