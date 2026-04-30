import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { order: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      images: JSON.stringify(body.images || []),
      features: JSON.stringify(body.features || []),
      materials: JSON.stringify(body.materials || []),
      featured: body.featured || false,
      order: body.order || 0,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
