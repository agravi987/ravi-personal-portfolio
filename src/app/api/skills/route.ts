import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";

export async function GET() {
  await dbConnect();
  const skills = await Skill.find({}).sort({ category: 1 });
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    const body = await req.json();
    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
