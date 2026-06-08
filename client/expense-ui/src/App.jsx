import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Expense from "./pages/Expense";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import EditExpense  from "./pages/EditExpense";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/expense-list" element={<ExpenseList />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
