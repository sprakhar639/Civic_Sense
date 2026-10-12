import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async ({ username, email, password }) => {
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        $or: [
            { email: normalizedEmail },
            { username: normalizedUsername }
        ]
    });

    if (existingUser) {
        const error = new Error(
            existingUser.email === normalizedEmail
                ? "Email already registered"
                : "Username already taken"
        );

        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username: normalizedUsername,
        email: normalizedEmail,
        password: hashedPassword
    });

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
};

// Log in an existing user
export const loginUser = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail
    });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };
};