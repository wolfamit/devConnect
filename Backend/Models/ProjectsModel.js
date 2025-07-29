import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author : {
        type : String
    },
    title: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    techStack: {
        type: String,
        required: true,
        min: 2,
        max: 100,
    },
    github: {
        type: String,
        min: 5,
        required: true,
    },
    liveLink: {
        type: String,
        min: 5,
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            commentAuthor :{
                type : String,
                ref: "User",
                required : true,
            } ,
            comment: {
                type: String,
                required: true
            },
            commentedAt: {
                type: Date,
                default: () => new Date()
            }
        }
    ],
    postedOn: {
        type: Date,
        default: () => new Date(),
    }
})

export default mongoose.model("Project", projectSchema);
