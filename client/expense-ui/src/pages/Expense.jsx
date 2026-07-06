import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Expense() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Navbar/>
      <h1>Welcome to Expense Tracker</h1>
      <br />
      <button onClick={() => navigate("/add-expense")}>
        Add Expense
      </button>

      <button
        onClick={() => navigate("/expense-list")}
        style={{ marginLeft: "10px" }}
      >
        Expense List
      </button>
    </div>
  );
}

export default Expense;