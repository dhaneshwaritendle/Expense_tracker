import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert("Login Successful");
      navigate("/expense"); // Navigate to the expense list
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Login Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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