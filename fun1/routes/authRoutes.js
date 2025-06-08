import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
        res.status(200).json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

authRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        res.status(201).json({ message: "User registered successfully!" });
    } else {
        res.status(400).json({ message: "Username and password are required" });
    }
});

authRouter.get("/profile", (req, res) => {
    const userProfile = {
        username: "admin",
        email: "rahul@gmail.com"
    };
    res.status(200).json(userProfile);
});

export { authRouter };