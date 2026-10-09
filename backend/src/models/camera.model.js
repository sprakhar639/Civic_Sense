import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema(
    {
        cameraId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        },

        streamUrl: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["online", "offline"],
            default: "offline"
        },

        lastSeenAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Camera = mongoose.model("Camera", cameraSchema);

export default Camera;