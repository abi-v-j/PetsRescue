// District.jsx
// npm install axios

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/district";

const District = () => {
  const [districtName, setDistrictName] = useState("");
  const [districtList, setDistrictList] = useState([]);
  const [editId, setEditId] = useState("");

  const loadDistricts = async () => {
    try {
      const res = await axios.get(API);
      setDistrictList(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Load failed");
    }
  };

  useEffect(() => {
    loadDistricts();
  }, []);

  const resetForm = () => {
    setDistrictName("");
    setEditId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!districtName.trim()) return alert("Enter district name");

    const payload = { districtName: districtName.trim() };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload); // UPDATE
      } else {
        await axios.post(API, payload); // CREATE
      }

      resetForm();
      loadDistricts();
    } catch (err) {
      console.log(err);
      alert("Submit failed");
    }
  };

  const handleEdit = (district) => {
    setEditId(district._id);
    setDistrictName(district.districtName);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this district?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      loadDistricts();
      if (editId === id) resetForm();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>District CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter district name"
          value={districtName}
          onChange={(e) => setDistrictName(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update" : "Submit"}
        </button>

        {editId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Si.No</th>
            <th>District Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {districtList.length === 0 ? (
            <tr>
              <td colSpan="3">No districts found</td>
            </tr>
          ) : (
            districtList.map((d, index) => (
              <tr key={d._id}>
                <td>{index + 1}</td>
                <td>{d.districtName}</td>
                <td>
                  <button onClick={() => handleEdit(d)}>Edit</button>
                  <button onClick={() => handleDelete(d._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default District;