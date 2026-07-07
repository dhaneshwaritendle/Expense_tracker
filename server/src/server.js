import 'dotenv/config';

import Expense from "./Expense.js";

import express from "express";
import prisma from "./db.js";
import User from "./User.js";
import cors from "cors";
import { authenticateToken } from "./auth.js";

// middleware to parse json request bodies
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'https://expense-tracker-1-mpy1.onrender.com' 
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/api/expenses", authenticateToken, async (req, res) => {
  try {
    const list = await Expense.findAll();
    console.log("get all expenses:", list);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 
app.get("/debug/db", async (req, res) => {
  const users = await prisma.user.findMany();
  const expenses = await prisma.expense.findMany();

  res.json({ users, expenses });
});

app.get("/api/expenses/:category", authenticateToken, async(req,res)=>{
  try {
    const category = req.params.category;
    return Expense.findByCategory(category)

  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

app.post("/api/expenses", authenticateToken, async (req, res) => {
  try {

    const fallbackUserId = req.body.userId ? parseInt(req.body.userId) : req.user.id;

    const { title, amount, category, date } = req.body;
    const verifiedUserId = req.user.id;
    console.log("BODY:", req.body);
    const newExpense = await Expense.create(
      title,
      Number(amount),
      category,
      new Date(date),
      verifiedUserId ,
    );
    res.status(200).json({ success: newExpense });
    console.log("success");
  } catch (error) {
    console.error("ROUTE CRASH LOG:", error.message);
    res.status(500).json({ 
      success:false,
      error: error.message,
    });
  }
});

app.patch("/api/expenses/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    // Trigger the dynamic update method
    const updatedRecord = await Expense.update(id, updates);

    if (!updatedRecord) {
      return res
        .status(404)
        .json({ error: "Expense item not found or no valid fields provided" });
    }

    res
      .status(200)
      .json({ message: "Updated successfully", data: updatedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/expenses/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedata = await Expense.delete(id);
    return res
      .status(200)
      .json({ message: "Expense item  deleted", data: deletedata });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

async function startExpense(params) {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("an error occurred during runtime:", error);
  }
}

startExpense();