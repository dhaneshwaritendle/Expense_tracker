import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            username,
          },
        },
      });

      if (error) throw error;

      alert("Signup successful! Please check your email to verify your account.");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.message || "Signup Failed");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
