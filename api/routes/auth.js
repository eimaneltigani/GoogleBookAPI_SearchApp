import express from "express";
import { createUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Create a new user (signup)
router.post('/signup', createUser);

// Login an existing user
router.post('/login', loginUser);

export default router;