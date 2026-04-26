import { useState } from "react";
import { API } from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    weight: "",
    experience: "",
    latitude: "",
    longitude: ""
  });

  const handleSubmit = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("Signup successful ✅");
    } catch (err) {
      alert("Signup failed ❌");
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}