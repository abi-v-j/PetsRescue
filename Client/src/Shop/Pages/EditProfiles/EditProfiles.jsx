import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProfiles = () => {
  const sid = sessionStorage.getItem("sid");

  const [shopName, setShopName] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [shopAddress, setShopAddress] = useState("");

  const [oldPhoto, setOldPhoto] = useState("");
  const [oldProof, setOldProof] = useState("");

  const [shopPhoto, setShopPhoto] = useState(null);
  const [shopProof, setShopProof] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/shop/${sid}`);
      const s = res.data.data;

      setShopName(s.shopName || "");
      setShopEmail(s.shopEmail || "");
      setShopAddress(s.shopAddress || "");

      setOldPhoto(s.shopPhoto || "");
      setOldProof(s.shopProof || "");
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!shopName.trim()) return alert("Enter shop name");
    if (!shopEmail.trim()) return alert("Enter shop email");
    if (!shopAddress.trim()) return alert("Enter address");

    try {
      const fd = new FormData();
      fd.append("shopName", shopName.trim());
      fd.append("shopEmail", shopEmail.trim());
      fd.append("shopAddress", shopAddress.trim());

      // optional files
      if (shopPhoto) fd.append("shopPhoto", shopPhoto);
      if (shopProof) fd.append("shopProof", shopProof);

      const res = await axios.put(`http://localhost:5000/shop/${sid}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Updated");

      // clear file inputs
      setShopPhoto(null);
      setShopProof(null);
      const photoInput = document.getElementById("shopPhoto");
      const proofInput = document.getElementById("shopProof");
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
      <h2>Edit Shop Profile</h2>

      <form onSubmit={handleUpdate}>
        <table border="1" cellPadding="10">
          <tbody>
            <tr>
              <td>Shop Name</td>
              <td>
                <input value={shopName} onChange={(e) => setShopName(e.target.value)} />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input value={shopEmail} onChange={(e) => setShopEmail(e.target.value)} />
              </td>
            </tr>

            <tr>
              <td>Address</td>
              <td>
                <textarea value={shopAddress} onChange={(e) => setShopAddress(e.target.value)} />
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
                  id="shopPhoto"
                  type="file"
                  onChange={(e) => setShopPhoto(e.target.files[0])}
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
                  id="shopProof"
                  type="file"
                  onChange={(e) => setShopProof(e.target.files[0])}
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