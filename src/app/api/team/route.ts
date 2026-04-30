import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const member = await prisma.teamMember.create({
    data: {
      name: body.name,
      role: body.role,
      bio: body.bio || null,
      photo: body.photo || null,
      order: body.order || 0,
    },
  });
  return NextResponse.json(member, { status: 201 });
}
