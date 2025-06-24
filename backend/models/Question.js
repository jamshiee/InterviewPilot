import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Session"
    },
    question: String,
    answer: String,


    
},{timestamps:true})

export default mongoose.model("Question", questionSchema)