import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ username, email, password }) => {
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        const error = new Error(
            existingUser.email === email
                ? "Email already registered"
                : "Username already taken"
        );

        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        email,
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