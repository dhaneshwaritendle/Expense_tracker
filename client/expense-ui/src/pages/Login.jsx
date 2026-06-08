import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "/auth/login",
      {
        username,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    alert("Login Successful");
    navigate("/expense");

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

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

        <br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          style={{
            border: "none",
            background: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;