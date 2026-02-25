import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const sid = sessionStorage.getItem("sid");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = async () => {
    if (!sid) return alert("Please login first");

    if (!oldPassword.trim()) return alert("Enter old password");
    if (!newPassword.trim()) return alert("Enter new password");
    if (!confirmPassword.trim()) return alert("Enter confirm password");

    if (newPassword !== confirmPassword) return alert("Password not matching");

    try {
      const res = await axios.put(
        `http://localhost:5000/shop/changepassword/${sid}`,
        { oldPassword, newPassword, confirmPassword }
      );

      alert(res.data.message || "Password updated");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Change password failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop Change Password</h2>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>Old Password</td>
            <td>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="enter old password"
              />
            </td>
          </tr>

          <tr>
            <td>New Password</td>
            <td>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="enter new password"
              />
            </td>
          </tr>

          <tr>
            <td>Confirm Password</td>
            <td>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm new password"
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2" align="center">
              <button type="button" onClick={handleChange}>
                Update Password
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChangePassword;