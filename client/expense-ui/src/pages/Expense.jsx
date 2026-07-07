import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Expense() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold italic text-gray-800 text-center mb-12">
          Welcome to Expense Tracker
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/add-expense")}
            className="px-6 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            Add Expense
          </button>
          <button
            onClick={() => navigate("/expense-list")}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Expense List
          </button>
        </div>
      </div>
    </div>
  );
}

export default Expense;