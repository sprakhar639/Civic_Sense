import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        camera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camera",
            required: true
        },

        type: {
            type: String,
            enum: ["pothole", "garbage"],
            required: true
        },

        status: {
            type: String,
            enum: ["detected", "verified", "resolved", "rejected"],
            default: "detected"
        },

        confidence: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        },

        position: {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            }
        },

        firstDetectedAt: {
            type: Date,
            required: true
        },

        lastDetectedAt: {
            type: Date,
            required: true
        },

        evidence: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;