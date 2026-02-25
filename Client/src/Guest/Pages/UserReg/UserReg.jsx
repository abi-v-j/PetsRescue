import React, { useEffect, useState } from "react";
import axios from "axios";

const DISTRICT_API = "http://localhost:5000/district";
const PLACE_BY_DISTRICT_API = "http://localhost:5000/place/bydistrict";
const USER_API = "http://localhost:5000/user";

const User = () => {
  // dropdowns
  const [districtList, setDistrictList] = useState([]);
  const [placeList, setPlaceList] = useState([]);

  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");

  // user fields
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // files
  const [userPhoto, setUserPhoto] = useState(null);
  const [userProof, setUserProof] = useState(null);

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
      setPlaceId(""); // reset selected place
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

    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setUserAddress("");
    setUserPhone("");

    setUserPhoto(null);
    setUserProof(null);

    // clear file inputs (optional)
    const photoInput = document.getElementById("userPhoto");
    const proofInput = document.getElementById("userProof");
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

    // validations
    if (!districtId) return alert("Select district");
    if (!placeId) return alert("Select place");
    if (!userName.trim()) return alert("Enter name");
    if (!userEmail.trim()) return alert("Enter email");
    if (!userPassword.trim()) return alert("Enter password");
    if (!userAddress.trim()) return alert("Enter address");
    if (!userPhone.trim()) return alert("Enter phone");
    if (!userPhoto) return alert("Select photo");
    if (!userProof) return alert("Select proof");

    try {
      const fd = new FormData();
      fd.append("userName", userName.trim());
      fd.append("userEmail", userEmail.trim());
      fd.append("userPassword", userPassword.trim());
      fd.append("userAddress", userAddress.trim());
      fd.append("userPhone", userPhone.trim());
      fd.append("placeId", placeId);

      // multer field names must match backend:
      fd.append("userPhoto", userPhoto);
      fd.append("userProof", userProof);

      await axios.post(USER_API, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("User Inserted Successfully");
      resetForm();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Insert failed");
    }
  };

  return (
    <div>
      <center>
        <h2>User Insert</h2>
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
              <td>Name</td>
              <td>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="enter name"
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="enter email"
                />
              </td>
            </tr>

            <tr>
              <td>Password</td>
              <td>
                <input
                  type="text"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="enter password"
                />
              </td>
            </tr>

            <tr>
              <td>Address</td>
              <td>
                <textarea
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="enter address"
                />
              </td>
            </tr>

            <tr>
              <td>Phone</td>
              <td>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="enter phone"
                />
              </td>
            </tr>

            <tr>
              <td>Photo</td>
              <td>
                <input
                  id="userPhoto"
                  type="file"
                  onChange={(e) => setUserPhoto(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td>Proof</td>
              <td>
                <input
                  id="userProof"
                  type="file"
                  onChange={(e) => setUserProof(e.target.files[0])}
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

export default User;