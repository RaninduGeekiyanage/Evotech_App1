import {db} from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const request = await req.json();
    const { name, email, password } = request;
    // console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email, and Password are required!" },
        { status: 400 }
      );
    }

    // can do more validation before insert


    //console.log("Database connection established");

    //check existing user in db
    const existingUser = await db.collection("users").findOne({ email });
    //console.log("Is existing User", existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exsists" },
        { status: 409 }
      );
    }

    // if not exsisting user

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("Hashed password:", hashedPassword);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      created: new Date(),
    });

    if (result && result.acknowledged) {
      console.log("MongoDB Result:", result);
      return NextResponse.json({
        success: true,
        user: {
          userId: result.insertedId,
          name,
          email,
        },
      });
    } else {
      return NextResponse.json(
        { error: "User Registration Failed..!" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("MongoDB Error :", error);
    return NextResponse.json(
      { error: "Invalid JSON input or no body provided." },
      { status: 400 }
    );
  }
};
