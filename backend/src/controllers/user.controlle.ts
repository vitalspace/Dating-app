import { Context, error } from "elysia";
import { User } from "../models/user.model";
import { type IUser } from "../types/types";

export const Signup = async (ctx: Context) => {
  try {
    const body = ctx.body;

    const { name, age, password, email } = body as IUser;

    const existingUser = await User.findOne({ email });

    if (existingUser) return error(409, { message: "User already exists" });

    const hassPassword = await Bun.password.hash(password);

    const user = new User({
      name,
      age,
      password: hassPassword,
      email,
    });

    await user.save();

    return { message: "User created successfully" };
  } catch (err) {
    return error(500, { message: `Internal server error ${err}` });
  }
};

export const Signin = async (ctx: Context) => {
  try {
    const body = ctx.body;
    //@ts-ignore
    const jwt = ctx.jwt;
    const { auth } = ctx.cookie;

    const { email, password } = body as IUser;

    const user = await User.findOne({ email });

    if (!user) return error(404, { message: "User not found" });

    const isMatch = await Bun.password.verify(password, user.password);

    if (!isMatch) return error(401, { message: "Invalid credentials" });

    auth.set({
      value: await jwt.sign({
        _id: user._id,
        fullname: user.name,
        email: user.email,
      }),
      // httpOnly: true,
      maxAge: 7 * 86400,
      path: "/",
    });

    return { token: auth.value };
  } catch (err) {
    return error(500, { message: `Internal server error ${err}` });
  }
};

export const Update = async (ctx: Context) => {
  try {
    const body = ctx.body;
    //@ts-ignore
    const jwt = ctx.jwt;
    const { auth } = ctx.cookie;

    if (!auth) return error(401, { message: "Unauthorized dfsdfsdf" });

    const profile = await jwt.verify(auth.value);

    if (!profile || typeof profile._id !== "string")
      return error(401, { message: "Unauthorized id" });

    const updateUser = await User.findByIdAndUpdate(
      { _id: profile._id },
      //@ts-ignore
      { $set: { ...body } },
      { new: true }
    )
      .select("-password")
      .select("-_id")
      .select("-createdAt")
      .select("-updatedAt")
      .select("-__v");

    if (!updateUser) return error(404, { message: "User not found" });

    return JSON.stringify(updateUser);
  } catch (err) {
    return error(500, { message: `Internal server error ${err}` });
  }
};

export const Profile = async (ctx: Context) => {
  try {
    //@ts-ignore
    const jwt = ctx.jwt;
    const { auth } = ctx.cookie;

    if (!auth) return error(401, { message: "Unauthorized" });

    const token = await jwt.verify(auth.value);

    const user = await User.findById({ _id: token._id })
      .select("-password")
      .select("-__v");

    if (!user) return error(404, { message: "User not found" });

    return JSON.stringify(user);
  } catch (err) {
    return error(500, { message: `Internal server error ${err}` });
  }
};
