import { NextResponse } from "next/server";

// create dummy route
export const POST = async (req) => {
  const request = await req.json();
  console.log(request);

  return NextResponse.json({ success: true, username: "ranindu" });
};
