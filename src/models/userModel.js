import mongoose  from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        "name":{
            type: String,
            required: true
        },
        "email":{
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        "username":{
            type: String,
            required: true,
            unique: true
        },
        "password":{
            type: String,
            required: true,
            select: false
        }
    }
);

userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
})

const User = mongoose.model('User', userSchema);
export default User;