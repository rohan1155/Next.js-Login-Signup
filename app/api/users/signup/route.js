import User from "@/models/User";
import connectDB from "@/utils/db";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(request) {
  return new Response("Signup GET");
}

export async function POST(request) {
  await connectDB();
  try {
    const { name, email, password } = await request.json();
    const user = await User.findOne({ email });
    if (user) {
      return new Response("Email already exists", { status: 400 });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
    return new Response(token, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
}
