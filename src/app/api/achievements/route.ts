import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function GET() {
  await dbConnect();
  const achievements = await Achievement.find({}).sort({ date: -1 });
  return NextResponse.json(achievements);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    const body = await req.json();
    const ach = await Achievement.create(body);
    return NextResponse.json(ach, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
