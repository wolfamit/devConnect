import mongoose from "mongoose";

const userSchema = mongoose.Schema({
        name: {
                type: String,
                required: true,
                min: 2,
                max: 50,
        },
        email: {
                type: String, required: true, max: 50,
                unique: true,
        },
        password: {
                type: String,
                min: 5,
                required: true,
        },
        bio: {
                type: String,
                max: 200,
        },
        skills: {
                type: String,
                max: 100,
        },
        joinedOn: {
                type: Date, default: () => new Date(),
        }
})

export default mongoose.model("User", userSchema)
