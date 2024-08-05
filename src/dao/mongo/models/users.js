import mongoose from "mongoose";
const { Schema } = mongoose;

const collection = "Users";

const schema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
    },
    documents: [{
        name: {
            type: String
        },
        reference: {
            type: String
        },
    }],

    role: {
        type: String
    },
    last_connection: {
        type: Number
    }
});

const userModel = mongoose.model(collection, schema);
export { userModel };