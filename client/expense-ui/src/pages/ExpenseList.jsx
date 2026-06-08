import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ExpenseList() {
  const navigate = useNavigate();

  const handleModify = (id) => {
    navigate(`/edit-expense/${id}`);
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:3000/api/expenses");

      const data = response.data;

      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.created_at}</td>
              <td>
                <button onClick={() => handleModify(expense.id)}>Modify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
