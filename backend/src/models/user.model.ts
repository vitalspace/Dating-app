import mongoose, { type Document } from "mongoose";

interface IUser extends Document {
  avatar: string;
  name: string;
  age: number;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export { User };
