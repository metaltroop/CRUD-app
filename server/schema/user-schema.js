

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: Number,  // Use a simple integer as the primary key
    name: String,
    username: String,
    email: String,
    phone: String,
});

const User = mongoose.model('User', userSchema);

export default User;

