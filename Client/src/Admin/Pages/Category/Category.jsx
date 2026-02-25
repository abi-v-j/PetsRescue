import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/category";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [editId, setEditId] = useState("");

  const loadCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategoryList(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Load failed");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setCategoryName("");
    setEditId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return alert("Enter category name");

    const payload = { categoryName: categoryName.trim() };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, payload); // UPDATE
      } else {
        await axios.post(API, payload); // CREATE
      }

      resetForm();
      loadCategories();
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || err.response?.data?.error || "Submit failed"
      );
    }
  };

  const handleEdit = (c) => {
    setEditId(c._id);
    setCategoryName(c.categoryName || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      if (editId === id) resetForm();
      loadCategories();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      

      <form onSubmit={handleSubmit}>
        <table align="center" cellPadding="10">
          <tbody>
            <tr>
              <td>Category Name</td>
              <td>
                <input
                  type="text"
                  placeholder="enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
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
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categoryList.length === 0 ? (
            <tr>
              <td colSpan="3" align="center">
                No categories
              </td>
            </tr>
          ) : (
            categoryList.map((c, i) => (
              <tr key={c._id}>
                <td>{i + 1}</td>
                <td>{c.categoryName}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(c)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(c._id)}>
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

export default Category;