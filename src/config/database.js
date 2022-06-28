import mongoose from "mongoose";

//mongoose.connect("mongodb://localhost:27017/users")
mongoose.connect("mongodb://0.0.0.0:27017/users");

let db = mongoose.Connection;

export default db;