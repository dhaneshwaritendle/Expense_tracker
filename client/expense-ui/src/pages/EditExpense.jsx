import { useState, useEffect } from "react"; // FIXED: Added useEffect
import { useNavigate, useLocation, useParams } from "react-router-dom"; // FIXED: Added useParams
import api from "../services/api";
import Navbar from "../components/Navbar";


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
        `api/expenses/${targetId}`, 
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
     <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-lg mx-auto p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Expense
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
        <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Coffee"
                required
              />
        </div>
        <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
                id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
            required
          />
        </div>
        <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
                id="category"
                type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Food"
            required
          />
        </div>
        <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date" // Visual anchor: Native tool picker fixes the parsing issues
            value={date ? date.split('T')[0] : ""} 
            onChange={(e) => setDate(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <br />

        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Save Changes
        </button>
        <button 
          type="button" 
          onClick={() => navigate("/expense-list")} 
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
          Cancel
        </button>
      </form>
    </div>
    </div>
</div>
    
  );
}


export default EditExpense;
