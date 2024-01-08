import mongoose from "mongoose";

const Items = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    imageUrl: {type: String, required: true},
})

export default mongoose.model('Items', Items)

