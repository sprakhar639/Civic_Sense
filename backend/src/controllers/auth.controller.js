import {
    registerUser,
    loginUser
} from "../services/auth.service.js";

import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Username, email, and password are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const user = await registerUser({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Log in an existing user
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await loginUser({
            email: email.trim().toLowerCase(),
            password
        });

        const token = jwt.sign(
            {
                userId: user.id.toString(),
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                token
            }
        });
    } catch (error) {
        next(error);
    }
};