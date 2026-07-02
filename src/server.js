import Expense from "./Expense.js";

import express from "express";
import prisma from "./db.js";
import User from "./User.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import cors from "cors";
import { generateToken, authenticateToken } from "./auth.js";

// middleware to parse json request bodies
const app = express();
const PORT = process.env.PORT ;
app.use(cookieParser());

app.use(express.json());
app.use(cors());

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

app.delete("/api/expenses/delete/:id", authenticateToken, async (req, res) => {
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

// POST: Register / Sign Up
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

// Login / Authenticate
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // check if user exists
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // compare encrypted database hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = generateToken(user);
    
    // Set the token in an HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true, // The cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      sameSite: 'strict', // Helps mitigate CSRF attacks
      maxAge: 60 * 60 * 1000 // 1 hour, same as the token's expiration
    });

    // Send a success response without the token in the body.
    // The user object can be sent for the client to use.
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