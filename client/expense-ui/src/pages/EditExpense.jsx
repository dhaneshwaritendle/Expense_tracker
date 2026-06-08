import { useState } from "react";
import api from "../api";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { stat } from "node:fs";

function EditExpense() {
  const navigate = useNavigate;
 
  const { state } = useLocation();
  
  if (!state) {
    return <h2>No expense selected</h2>;
  }

  const [title, setTitle] = useState(state.title);
  const [amount, setAmount] = useState(state.amount);
  const [category, setCategory] = useState(state.category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
console.log('state.id', state);
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/expenses/${state.id}",
        {
          title,
          amount,
          category,
        },
      );

      console.log(response.data);

      alert("Expense modified");

      //   setTitle("");
      //   setAmount("");
      //   setCategory("");

      navigate("/expense-list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Expense</h2>

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

        <button type="submit">Edit Expense</button>
      </form>
    </div>
  );
}

export default EditExpense;
