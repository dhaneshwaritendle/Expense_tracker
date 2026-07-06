import api from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      await api.delete(`/expenses/${expense.id}`);
      alert("Expense Deleted");
      fetchExpenses(); // Re-fetch expenses to update the list
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);
  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");

      const data = response.data;

      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Styles for the component
  const styles = {
    pageContainer: {
      backgroundColor: "#f8f9fa", // A professional, minimal, off-white background
      minHeight: "100vh",
    },
    container: {
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    title: {
      color: "#333",
    },
    addButton: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      overflow: "hidden", // Ensures the border-radius is applied to the table corners
    },
    th: {
      borderBottom: "2px solid #ddd",
      padding: "12px",
      textAlign: "left",
      color: "#555",
    },
    tr: {
      borderBottom: "1px solid #eee",
    },
    td: {
      padding: "12px",
    },
    actionButton: {
      border: "none",
      background: "transparent",
      color: "#007bff",
      cursor: "pointer",
      marginRight: "10px",
      fontSize: "14px",
    },
    deleteButton: {
      border: "none",
      background: "transparent",
      color: "#dc3545",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>My Expenses</h2>
          <button style={styles.addButton} onClick={() => navigate("/add-expense")}>
            + Add Expense
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} style={styles.tr}>
                <td style={styles.td}>{expense.title}</td>
                <td style={styles.td}>${parseFloat(expense.amount).toFixed(2)}</td>
                <td style={styles.td}>{new Date(expense.date).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button style={styles.actionButton} onClick={() => handleModify(expense)}>Modify</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(expense)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
