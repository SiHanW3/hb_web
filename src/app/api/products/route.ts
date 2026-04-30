import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const categorySlugMap: Record<string, string> = {
  RIGID_BOX: "rigid-box",
  BOOK_MANUAL: "book-manual",
  LABEL: "label",
};

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { order: "asc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  revalidatePath("/our-work");
  const slug = categorySlugMap[body.category];
  if (slug) revalidatePath(`/our-work/${slug}`);

  return NextResponse.json(product, { status: 201 });
}
