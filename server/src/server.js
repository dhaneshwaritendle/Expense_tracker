import Expense from "../Expense.js";

import express from "express";
import prisma from "./db.js";
import User from "../User.js";
import bcrypt from "bcrypt";
import cors from "cors";

// middleware to parse json request bodies
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/expenses", async (req, res) => {
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

app.post("/api/expenses", async (req, res) => {
  try {

    const fallbackUserId = req.body.userId ? parseInt(req.body.userId) : 1;

    const { title, amount, category, date, userId } = req.body;
    console.log("BODY:", req.body);
    const newExpense = await Expense.create(
      title,
      Number(amount),
      category,
      new Date(date),
      Number(fallbackUserId) ,
    );
    res.status(200).json({ success: newExpense });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.patch("/api/expenses/:id", async (req, res) => {
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

app.delete("/api/expenses/delete/:id", async (req, res) => {
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

// // POST: Register / Sign Up
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = await User.create(name, email, username, password);
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// // Login / Authenticate
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // check if user exists in pgAdmin
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // compare encrypted database hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Success
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        fullName: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.log(err);

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
