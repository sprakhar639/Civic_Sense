export const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        statusCode = 409;

        const duplicatedField = Object.keys(err.keyPattern || {})[0];

        if (duplicatedField === "email") {
            message = "Email already registered";
        } else if (duplicatedField === "username") {
            message = "Username already taken";
        } else {
            message = "A record with this value already exists";
        }
    }

    // Hide internal error details from clients
    if (statusCode >= 500) {
        console.error(err);
        message = "Internal server error";
    }

    return res.status(statusCode).json({
        success: false,
        message
    });
};