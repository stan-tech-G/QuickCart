import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    // 🔴 REQUIRED: handle unauthenticated users
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }


    await connectDB();

  const user = await User.findOne({ clerkId: userId });

    //const user = await User.findById(userId);

    console.log("Fetched user:", user); // Debug log to check the fetched user
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { success: true, data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
