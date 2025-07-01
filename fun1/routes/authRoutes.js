import { Router } from "express";

const authRouter = Router();


const mockUser = {
  username: "admin",
  password: "password", 
  email: "rahul@gmail.com"
};

// Login route
authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (username === mockUser.username && password === mockUser.password) {
    // Issue token here in real apps
    return res.status(200).json({ message: "Login successful!" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Register route (mock only)
authRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  res.status(201).json({ message: "User registered successfully!" });
});

// Profile route (mock only)
authRouter.get("/profile", (req, res) => {
  res.status(200).json({
    username: mockUser.username,
    email: mockUser.email
  });
});

export { authRouter };