import connectDB from "@/utils/db";
import User from "@/models/User";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(request) {
  return new Response("Login GET");
}

export async function POST(request) {
  await connectDB();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return new Response("Invalid password", { status: 401 });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return new Response(token, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
}
