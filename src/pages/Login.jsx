import { useState } from "react";
import { API } from "../api/axios";
import { useNavigate } from "react-router-dom";   // ✅ IMPORTANT

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();   // ✅ IMPORTANT

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.access_token);

      // TEMP if backend doesn't send user_id
      const id = prompt("Enter your user ID");
      localStorage.setItem("userId", id);

      alert("Login success ✅");

      navigate("/match");   // ✅ THIS DOES REDIRECT

    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}