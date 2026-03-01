import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const AddGallery = () => {
  const [rescueId, setRescueId] = useState("");
  const [galleryFile, setGalleryFile] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load rescueId from session
  useEffect(() => {
    const id = sessionStorage.getItem("rid"); // <-- must be stored after login
    if (!id) {
      alert("Rescue Team not logged in!");
      return;
    }
    setRescueId(id);
  }, []);

  // ✅ Fetch gallery by rescueId
  const fetchGallery = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/gallery/byrescue/${id}`);
      setList(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  // load gallery when rescueId available
  useEffect(() => {
    if (rescueId) fetchGallery(rescueId);
  }, [rescueId]);

  // ✅ Add gallery
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rescueId) return alert("No rescueId in session");
    if (!galleryFile) return alert("Please select an image");

    try {
      const formData = new FormData();
      formData.append("rescueTeamId", rescueId);
      formData.append("galleryFile", galleryFile);

      await axios.post(`${API}/gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Gallery Added");
      setGalleryFile(null);
      document.getElementById("galleryFileInput").value = "";

      fetchGallery(rescueId);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  // ✅ Delete gallery
  const deleteGallery = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`${API}/gallery/${id}`);
      fetchGallery(rescueId);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2>Add Gallery</h2>

      <form onSubmit={handleSubmit}>
        <p>Rescue ID: {rescueId || "Not Found in Session"}</p>

        <input
          id="galleryFileInput"
          type="file"
          accept="image/*"
          onChange={(e) => setGalleryFile(e.target.files[0])}
        />

        <button type="submit">Upload</button>
      </form>

      <hr />

      <h3>My Gallery</h3>
      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Image</th>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="3" align="center">
                No images
              </td>
            </tr>
          ) : (
            list.map((g) => (
              <tr key={g._id}>
                <td>
                  <img
                    src={`${API}/public/uploads/${g.galleryFile}`}
                    alt="gallery"
                    width="120"
                  />
                </td>
                <td>{g.galleryFile}</td>
                <td>
                  <button onClick={() => deleteGallery(g._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddGallery;