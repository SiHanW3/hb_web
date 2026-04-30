import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const categorySlugMap: Record<string, string> = {
  RIGID_BOX: "rigid-box",
  BOOK_MANUAL: "book-manual",
  LABEL: "label",
};

function revalidateProductPages(category?: string) {
  revalidatePath("/our-work");
  if (category) {
    const slug = categorySlugMap[category];
    if (slug) revalidatePath(`/our-work/${slug}`);
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      images: body.images ? JSON.stringify(body.images) : undefined,
      features: body.features ? JSON.stringify(body.features) : undefined,
      materials: body.materials ? JSON.stringify(body.materials) : undefined,
      featured: body.featured,
      order: body.order,
    },
  });

  revalidateProductPages(product.category);
  return NextResponse.json(product);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  await prisma.product.delete({ where: { id } });

  revalidateProductPages(product?.category);
  return NextResponse.json({ success: true });
}
