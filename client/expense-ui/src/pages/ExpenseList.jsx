import api from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingSkeleton from "../components/LoadingSkeleton";

function ExpenseList() {
  const navigate = useNavigate();

  const handleModify = (expense) => {
    console.log("handle modify on id:", expense.id);
    navigate(`/edit-expense/${expense.id}`, { state: expense });
    console.log("editexpense is rendering ...");
  };

  const handleDelete = async (expense) => {
    console.log("handle delete on id:", expense.id);
    try {
      await api.delete(`api/expenses/${expense.id}`);
      alert("Expense Deleted");
      fetchExpenses(); // Re-fetch expenses to update the list
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);
  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("api/expenses");

      const data = response.data;

      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Expenses</h2>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate("/add-expense")}
          >
            + Add Expense
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <LoadingSkeleton rows={5} />
              ) : expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(expense.amount).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleModify(expense)} className="text-indigo-600 hover:text-indigo-900 mr-4">Modify</button>
                      <button onClick={() => handleDelete(expense)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">
                    No expenses found. Add one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
