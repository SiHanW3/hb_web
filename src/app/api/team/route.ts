import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  revalidatePath("/team");
  return NextResponse.json(member, { status: 201 });
}
