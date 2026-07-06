import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddExpense() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( !date || !category || !amount ) alert("missing input field");

    try {
      const response = await api.post("/expenses", {
        title,
        amount,
        category,
        date
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
      <Navbar/>
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

        <div>
          <label>Date:</label>
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <br />

      
      

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
