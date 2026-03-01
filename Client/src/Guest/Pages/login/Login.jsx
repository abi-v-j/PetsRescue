import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        const { role, id, name, message } = res.data;
        alert(message);

        if (role === "admin") {
          sessionStorage.setItem("aid", id);
          sessionStorage.setItem("adminName", name);
          navigate("/admin/home");
        } else if (role === "user") {
          sessionStorage.setItem("uid", id);
          sessionStorage.setItem("userName", name);
          navigate("/user/home");
        } else if (role === "rescueteam") {
          sessionStorage.setItem("rid", id);
          sessionStorage.setItem("rescueTeamName", name);
          navigate("/rescueteam/home");
        } else if (role === "shop") {
          sessionStorage.setItem("sid", id);
          sessionStorage.setItem("shopName", name);
          navigate("/shop/home");
        } else {
          alert("Unknown role");
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Login</h3>

      <table border="1" cellPadding="8">
        <tbody>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter email"
              />
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter password"
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2" align="center">
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;