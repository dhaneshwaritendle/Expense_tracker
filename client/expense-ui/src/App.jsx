import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Expense from "./pages/Expense";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import EditExpense  from "./pages/EditExpense";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/expense" element={<Expense />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
