import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/adminreg";

const AdminReg = () => {
  // ADD
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // LIST
  const [adminList, setAdminList] = useState([]);

  // EDIT
  const [editId, setEditId] = useState("");

  const loadAdmins = async () => {
    try {
      const res = await axios.get(API);
      setAdminList(res.data.data || res.data || []);
    } catch (err) {
      console.log(err);
      alert("Load failed");
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const resetForm = () => {
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
    setEditId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // basic validation
      if (!adminName.trim()) return alert("Enter name");
      if (!adminEmail.trim()) return alert("Enter email");
      if (!adminPassword.trim()) return alert("Enter password");

      const payload = {
        adminName: adminName.trim(),
        adminEmail: adminEmail.trim(),
        adminPassword: adminPassword.trim(),
      };

      if (editId) {
        // UPDATE
        await axios.put(`${API}/${editId}`, payload);
      } else {
        // CREATE
        await axios.post(API, payload);
      }

      resetForm();
      loadAdmins();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.response?.data?.error || "Submit failed");
    }
  };

  const handleEdit = (a) => {
    setEditId(a._id);
    setAdminName(a.adminName || "");
    setAdminEmail(a.adminEmail || "");
    setAdminPassword(a.adminPassword || "");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleDelete = async (id) => {
    try {
      const ok = window.confirm("Delete this admin?");
      if (!ok) return;

      await axios.delete(`${API}/${id}`);
      if (editId === id) resetForm();
      loadAdmins();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <center>
          <h1>Admin Register</h1>
        </center>

        <table align="center" cellPadding="10">
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  placeholder="enter name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  placeholder="enter email id"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Password</td>
              <td>
                <input
                  type="text"
                  placeholder="enter password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <input type="submit" value={editId ? "Update" : "Submit"} />
              </td>
              <td>
                {editId ? (
                  <input type="button" value="Cancel" onClick={handleCancel} />
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
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {adminList.length === 0 ? (
            <tr>
              <td colSpan={5} align="center">
                No admins
              </td>
            </tr>
          ) : (
            adminList.map((a, i) => (
              <tr key={a._id}>
                <td>{i + 1}</td>
                <td>{a.adminName}</td>
                <td>{a.adminEmail}</td>
                <td>{a.adminPassword}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(a)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(a._id)}>
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

export default AdminReg;