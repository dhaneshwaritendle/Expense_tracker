import { useState } from "react";
import api from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  navigate = useNavigate;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:3000/api/expenses", {
        title,
        amount,
        category,
      });

      console.log(response.data);

      alert("Expense Added");

      setTitle("");
      setAmount("");
      setCategory("");

      navigate("/expense-list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <br />

        <div>
          <label>Amount:</label>
          <br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>Category:</label>
          <br />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
