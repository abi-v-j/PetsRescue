import React, { useEffect, useState } from "react";
import axios from "axios";

const DISTRICT_API = "http://localhost:5000/district";
const RESCUE_API = "http://localhost:5000/rescueteam";

const RescueTeam = () => {
  const [districtList, setDistrictList] = useState([]);
  const [districtId, setDistrictId] = useState("");

  const [rescueTeamName, setRescueTeamName] = useState("");
  const [rescueTeamEmail, setRescueTeamEmail] = useState("");
  const [rescueTeamPassword, setRescueTeamPassword] = useState("");
  const [rescueTeamAddress, setRescueTeamAddress] = useState("");

  const [rescueTeamPhoto, setRescueTeamPhoto] = useState(null);
  const [rescueTeamProof, setRescueTeamProof] = useState(null);

  const loadDistricts = async () => {
    try {
      const res = await axios.get(DISTRICT_API);
      setDistrictList(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("District load failed");
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  const resetForm = () => {
    setDistrictId("");
    setRescueTeamName("");
    setRescueTeamEmail("");
    setRescueTeamPassword("");
    setRescueTeamAddress("");
    setRescueTeamPhoto(null);
    setRescueTeamProof(null);

    const photoInput = document.getElementById("rescueTeamPhoto");
    const proofInput = document.getElementById("rescueTeamProof");
    if (photoInput) photoInput.value = "";
    if (proofInput) proofInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!districtId) return alert("Select district");
    if (!rescueTeamName.trim()) return alert("Enter name");
    if (!rescueTeamEmail.trim()) return alert("Enter email");
    if (!rescueTeamPassword.trim()) return alert("Enter password");
    if (!rescueTeamAddress.trim()) return alert("Enter address");
    if (!rescueTeamPhoto) return alert("Select photo");
    if (!rescueTeamProof) return alert("Select proof");

    try {
      const fd = new FormData();
      fd.append("districtId", districtId);
      fd.append("rescueTeamName", rescueTeamName.trim());
      fd.append("rescueTeamEmail", rescueTeamEmail.trim());
      fd.append("rescueTeamPassword", rescueTeamPassword.trim());
      fd.append("rescueTeamAddress", rescueTeamAddress.trim());

      // multer names must match backend
      fd.append("rescueTeamPhoto", rescueTeamPhoto);
      fd.append("rescueTeamProof", rescueTeamProof);

      await axios.post(RESCUE_API, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Rescue Team Inserted Successfully");
      resetForm();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Insert failed");
    }
  };

  return (
    <div>
      <center>
        <h2>Rescue Team Insert</h2>
      </center>

      <form onSubmit={handleSubmit}>
        <table align="center" cellPadding="10">
          <tbody>
            <tr>
              <td>District</td>
              <td>
                <select value={districtId} onChange={(e) => setDistrictId(e.target.value)}>
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
              <td>Name</td>
              <td>
                <input
                  type="text"
                  value={rescueTeamName}
                  onChange={(e) => setRescueTeamName(e.target.value)}
                  placeholder="enter name"
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  value={rescueTeamEmail}
                  onChange={(e) => setRescueTeamEmail(e.target.value)}
                  placeholder="enter email"
                />
              </td>
            </tr>

            <tr>
              <td>Password</td>
              <td>
                <input
                  type="text"
                  value={rescueTeamPassword}
                  onChange={(e) => setRescueTeamPassword(e.target.value)}
                  placeholder="enter password"
                />
              </td>
            </tr>

            <tr>
              <td>Address</td>
              <td>
                <textarea
                  value={rescueTeamAddress}
                  onChange={(e) => setRescueTeamAddress(e.target.value)}
                  placeholder="enter address"
                />
              </td>
            </tr>

            <tr>
              <td>Photo</td>
              <td>
                <input
                  id="rescueTeamPhoto"
                  type="file"
                  onChange={(e) => setRescueTeamPhoto(e.target.files[0])}
                />
              </td>
            </tr>

            <tr>
              <td>Proof</td>
              <td>
                <input
                  id="rescueTeamProof"
                  type="file"
                  onChange={(e) => setRescueTeamProof(e.target.files[0])}
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

export default RescueTeam;