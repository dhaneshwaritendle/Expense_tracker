const initDb = require("./initDb");
const Expense = require("./Expense");
const { start } = require("node:repl");
const { hostname } = require("node:os");
const { expectFailure } = require("node:test");
const express = require("express");
const User = require("./User"); // Import user model
const bcrypt = require("bcrypt");
const cors = require("cors");

// middleware to parse json request bodies
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get("/api/expenses", async (req, res) => {
  try {
    const list = await Expense.findAll();
    console.log("get all expenses:", list);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Simple validation rule
    if (!title || !amount || !category || !date) {
      return res
        .status(400)
        .json({ error: "Missing title, amount, date or category" });
    }

    const newExpense = await Expense.create(title, amount, category, date);
    console.log("post expenses:", newExpense);
    res.status(201).json(newExpense);
    console.log("post expenses success:");
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// POST: Register / Sign Up
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = await User.create(fullName, email, username, password);
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Login / Authenticate
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
        fullName: user.full_name,
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
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("an error occurred during runtime:", error);
  }
}

startExpense();
