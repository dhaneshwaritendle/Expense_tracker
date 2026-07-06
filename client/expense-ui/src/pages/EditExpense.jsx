import { useState, useEffect } from "react"; // FIXED: Added useEffect
import { useNavigate, useLocation, useParams } from "react-router-dom"; // FIXED: Added useParams
import api from "../services/api";


function EditExpense() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { state } = useLocation();

  // Handle missing state cleanly so the component doesn't crash on direct refresh
  const initialTitle = state ? state.title : "";
  const initialAmount = state ? state.amount : "";
  const initialCategory = state ? state.category : "";
  const initialDate = state ? state.date : "";

  const [title, setTitle] = useState(initialTitle);
  const [amount, setAmount] = useState(initialAmount);
  const [category, setCategory] = useState(initialCategory);
  const [date, setDate] = useState(initialDate);

  // FIXED: Moved useEffect out of the handleSubmit handler into the main component body
  useEffect(() => {
    console.log("Current ID Parameter from URL:", id);
    if (state) {
      console.log("State passed from navigation:", state);
    }
  }, [id, state]);

  // Fallback UI rendering if someone accesses this page without routing data properly
  if (!state) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No expense selected</h2>
        <button onClick={() => navigate("/expense-list")}>Back to List</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Targeting ID for patch:', state.id || id);

    try {
      // Extract target ID from state fallback to url params
      const targetId = state.id || id;
      
      const response = await api.patch(
        `/expenses/${targetId}`, 
        {
          title,
          amount: parseFloat(amount),
          category,
          date
        }
      );

      console.log("Update Success:", response.data);
      alert("Expense modified successfully!");
      navigate("/expense-list");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error saving your edits. Check server logs.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar/>
      <h2>Edit Expense</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <br />

        <div>
          <label>Amount:</label>
          <br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Category:</label>
          <br />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Date:</label>
          <br />
          <input
            type="date" // Visual anchor: Native tool picker fixes the parsing issues
            value={date ? date.split('T')[0] : ""} 
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Save Changes
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/expense-list")} 
          style={{ marginLeft: "10px", padding: "8px 16px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditExpense;
