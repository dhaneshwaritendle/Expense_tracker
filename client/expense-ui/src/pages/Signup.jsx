import { useState } from "react";
import api from "../api";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      fullName,
      email,
      username,
      password,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          fullName,
          email,
          username,
          password,
        },
      );
      alert("Signup Successful");
      
      console.log(response.data);

      // redirect to expenses
      navigate("/expense");
    } catch (error) {
      console.log("fail to login :", error);
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Full name:</label>
          <br />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
