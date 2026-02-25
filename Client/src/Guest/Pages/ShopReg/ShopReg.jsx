import React, { useEffect, useState } from "react";
import axios from "axios";

const DISTRICT_API = "http://localhost:5000/district";
const PLACE_BY_DISTRICT_API = "http://localhost:5000/place/bydistrict";
const SHOP_API = "http://localhost:5000/shop";

const Shop = () => {
  const [districtList, setDistrictList] = useState([]);
  const [placeList, setPlaceList] = useState([]);

  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");

  const [shopName, setShopName] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [shopPassword, setShopPassword] = useState("");
  const [shopAddress, setShopAddress] = useState("");

  const [shopPhoto, setShopPhoto] = useState(null);
  const [shopProof, setShopProof] = useState(null);

  const loadDistricts = async () => {
    try {
      const res = await axios.get(DISTRICT_API);
      setDistrictList(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("District load failed");
    }
  };

  const loadPlacesByDistrict = async (dId) => {
    try {
      if (!dId) {
        setPlaceList([]);
        setPlaceId("");
        return;
      }
      const res = await axios.get(`${PLACE_BY_DISTRICT_API}/${dId}`);
      setPlaceList(res.data.data || []);
      setPlaceId("");
    } catch (err) {
      console.log(err);
      alert("Place load failed");
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  const resetForm = () => {
    setDistrictId("");
    setPlaceId("");
    setPlaceList([]);

    setShopName("");
    setShopEmail("");
    setShopPassword("");
    setShopAddress("");

    setShopPhoto(null);
    setShopProof(null);

    const photoInput = document.getElementById("shopPhoto");
    const proofInput = document.getElementById("shopProof");
    if (photoInput) photoInput.value = "";
    if (proofInput) proofInput.value = "";
  };

  const handleDistrictChange = (e) => {
    const dId = e.target.value;
    setDistrictId(dId);
    loadPlacesByDistrict(dId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!districtId) return alert("Select district");
    if (!placeId) return alert("Select place");

    if (!shopName.trim()) return alert("Enter shop name");
    if (!shopEmail.trim()) return alert("Enter shop email");
    if (!shopPassword.trim()) return alert("Enter shop password");
    if (!shopAddress.trim()) return alert("Enter shop address");

    if (!shopPhoto) return alert("Select shop photo");
    if (!shopProof) return alert("Select shop proof");

    try {
      const fd = new FormData();
      fd.append("placeId", placeId);
      fd.append("shopName", shopName.trim());
      fd.append("shopEmail", shopEmail.trim());
      fd.append("shopPassword", shopPassword.trim());
      fd.append("shopAddress", shopAddress.trim());

      fd.append("shopPhoto", shopPhoto);
      fd.append("shopProof", shopProof);

      await axios.post(SHOP_API, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Shop Inserted Successfully");
      resetForm();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Insert failed");
    }
  };

  return (
    <div>
      <center>
        <h2>Shop Insert</h2>
      </center>

      <form onSubmit={handleSubmit}>
        <table align="center" cellPadding="10">
          <tbody>
            <tr>
              <td>District</td>
              <td>
                <select value={districtId} onChange={handleDistrictChange}>
                  <option value="">--select--</option>
                  {districtList.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.districtName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td>Place</td>
              <td>
                <select
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                  disabled={!districtId}
                >
                  <option value="">--select--</option>
                  {placeList.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.placeName}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td>Shop Name</td>
              <td>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="enter shop name"
                />
              </td>
            </tr>

            <tr>
              <td>Shop Email</td>
              <td>
                <input
                  type="text"
                  value={shopEmail}
                  onChange={(e) => setShopEmail(e.target.value)}
                  placeholder="enter shop email"
                />
              </td>
            </tr>

            <tr>
              <td>Shop Password</td>
              <td>
                <input
                  type="text"
                  value={shopPassword}
                  onChange={(e) => setShopPassword(e.target.value)}
                  placeholder="enter shop password"
                />
              </td>
            </tr>

            <tr>
              <td>Shop Address</td>
              <td>
                <textarea
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  placeholder="enter shop address"
                />
              </td>
            </tr>

            <tr>
              <td>Shop Photo</td>
              <td>
                <input
                  id="shopPhoto"
                  type="file"
                  onChange={(e) => setShopPhoto(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td>Shop Proof</td>
              <td>
                <input
                  id="shopProof"
                  type="file"
                  onChange={(e) => setShopProof(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td>
                <input type="submit" value="Submit" />
              </td>
              <td>
                <input type="button" value="Reset" onClick={resetForm} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Shop;