import React, { useEffect, useState } from "react";
import axios from "axios";

const PLACE_API = "http://localhost:5000/place";
const DISTRICT_API = "http://localhost:5000/district";

const Place = () => {
  // form
  const [placeName, setPlaceName] = useState("");
  const [districtId, setDistrictId] = useState("");

  // lists
  const [districtList, setDistrictList] = useState([]);
  const [placeList, setPlaceList] = useState([]);

  // edit
  const [editId, setEditId] = useState("");

  const loadDistricts = async () => {
    try {
      const res = await axios.get(DISTRICT_API);
      setDistrictList(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("District load failed");
    }
  };

  const loadPlaces = async () => {
    try {
      const res = await axios.get(PLACE_API);
      setPlaceList(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Place load failed");
    }
  };

  useEffect(() => {
    loadDistricts();
    loadPlaces();
  }, []);

  const resetForm = () => {
    setPlaceName("");
    setDistrictId("");
    setEditId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placeName.trim()) return alert("Enter place name");
    if (!districtId) return alert("Select district");

    const payload = {
      placeName: placeName.trim(),
      districtId,
    };

    try {
      if (editId) {
        await axios.put(`${PLACE_API}/${editId}`, payload); // UPDATE
      } else {
        await axios.post(PLACE_API, payload); // CREATE
      }

      resetForm();
      loadPlaces();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Submit failed");
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setPlaceName(p.placeName || "");
    // if populated, districtId is object, else string
    setDistrictId(p.districtId?._id || p.districtId || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this place?")) return;

    try {
      await axios.delete(`${PLACE_API}/${id}`);
      if (editId === id) resetForm();
      loadPlaces();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <center>
        <h1>Place CRUD</h1>
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
              <td>Place Name</td>
              <td>
                <input
                  type="text"
                  placeholder="enter place name"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <input type="submit" value={editId ? "Update" : "Submit"} />
              </td>
              <td>
                {editId ? (
                  <input type="button" value="Cancel" onClick={resetForm} />
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <br />

      <table border="1" align="center" cellPadding="10">
        <thead>
          <tr>
            <th>Si.No</th>
            <th>District</th>
            <th>Place</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {placeList.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">
                No places
              </td>
            </tr>
          ) : (
            placeList.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.districtId?.districtName || "-"}</td>
                <td>{p.placeName}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(p._id)}>
                    Delete
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

export default Place;