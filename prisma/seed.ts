import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@huibao.com" },
    update: {},
    create: {
      email: "admin@huibao.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("Seed completed: admin user");

  // Seed products from pencil design
  const products = [
    // RIGID_BOX
    {
      title: "Luxury Perfume Box",
      description: "Magnetic closure rigid box with velvet insert for premium fragrance brand.",
      category: "RIGID_BOX",
      images: ["/images/generated-1777523681514.png", "/images/generated-1777523427607.png", "/images/generated-1777523449984.png"],
      features: ["Magnetic closure", "Velvet insert lining", "Hot foil stamping", "Custom die-cut foam"],
      materials: ["2mm greyboard", "Art paper wrap", "Velvet flocking", "Neodymium magnets"],
      order: 1,
    },
    {
      title: "Watch Presentation Case",
      description: "Custom two-piece rigid box with foam die-cut insert for luxury timepieces.",
      category: "RIGID_BOX",
      images: ["/images/generated-1777523685810.png", "/images/generated-1777523454104.png"],
      features: ["Two-piece construction", "Foam die-cut insert", "Soft-touch lamination", "Embossed logo"],
      materials: ["2.5mm greyboard", "Specialty paper", "EVA foam", "Satin ribbon"],
      order: 2,
    },
    {
      title: "Skincare Gift Set",
      description: "Collapsible rigid box with ribbon closure for premium skincare collection.",
      category: "RIGID_BOX",
      images: ["/images/generated-1777523686994.png", "/images/generated-1777523459580.png", "/images/generated-1777523514091.png"],
      features: ["Collapsible design", "Ribbon closure", "Spot UV coating", "Custom compartments"],
      materials: ["1.5mm greyboard", "Coated art paper", "Satin ribbon", "EVA dividers"],
      order: 3,
    },
    {
      title: "Jewelry Drawer Box",
      description: "Sliding drawer rigid box with satin lining for fine jewelry collection.",
      category: "RIGID_BOX",
      images: ["/images/generated-1777523692408.png", "/images/generated-1777523851017.png"],
      features: ["Sliding drawer mechanism", "Satin lining", "Gold foil accents", "Velvet cushion"],
      materials: ["2mm greyboard", "Leather-textured paper", "Satin fabric", "Gold foil"],
      order: 4,
    },
    {
      title: "Tea Collection Box",
      description: "Hinged lid rigid box with compartment dividers for artisan tea brand.",
      category: "RIGID_BOX",
      images: ["/images/generated-1777523699013.png", "/images/generated-1777523853493.png", "/images/generated-1777523854926.png"],
      features: ["Hinged lid", "Compartment dividers", "Debossed pattern", "Food-safe interior"],
      materials: ["2mm greyboard", "Kraft paper wrap", "Food-grade board", "Cotton ribbon"],
      order: 5,
    },
    {
      title: "Electronics Premium Pack",
      description: "Structured rigid box with EVA insert for consumer electronics unboxing.",
      category: "RIGID_BOX",
      images: ["/images/generated-1777523705965.png", "/images/generated-1777523855181.png"],
      features: ["Precision EVA insert", "Lift-off lid", "Matte lamination", "QR code integration"],
      materials: ["3mm greyboard", "Art paper", "EVA foam", "Fluted insert"],
      order: 6,
    },
    // BOOK_MANUAL
    {
      title: "Brand Guidelines Book",
      description: "Hardcover brand bible with embossed logo and custom endpapers.",
      category: "BOOK_MANUAL",
      images: ["/images/generated-1777523730540.png", "/images/generated-1777523859740.png", "/images/generated-1777523860221.png"],
      features: ["Hardcover binding", "Embossed cover logo", "Custom endpapers", "Lay-flat binding"],
      materials: ["157gsm art paper", "Cloth cover", "Greyboard core", "PUR adhesive"],
      order: 1,
    },
    {
      title: "Product Catalog",
      description: "Perfect-bound catalog with spot UV and metallic ink accents.",
      category: "BOOK_MANUAL",
      images: ["/images/generated-1777523756403.png", "/images/generated-1777523864994.png"],
      features: ["Perfect binding", "Spot UV highlights", "Metallic ink accents", "Bleed-edge printing"],
      materials: ["200gsm cover stock", "128gsm interior pages", "UV varnish", "Metallic ink"],
      order: 2,
    },
    {
      title: "Welcome Kit Manual",
      description: "Saddle-stitched welcome booklet with custom illustrations for onboarding.",
      category: "BOOK_MANUAL",
      images: ["/images/generated-1777523738769.png", "/images/generated-1777523869728.png"],
      features: ["Saddle-stitch binding", "Custom illustrations", "Die-cut cover", "Rounded corners"],
      materials: ["250gsm cover", "120gsm uncoated interior", "Staple wire", "Aqueous coating"],
      order: 3,
    },
    {
      title: "Annual Report",
      description: "Case-bound annual report with foil-stamped cover and infographic spreads.",
      category: "BOOK_MANUAL",
      images: ["/images/generated-1777523744506.png", "/images/generated-1777523730540.png"],
      features: ["Case binding", "Foil-stamped cover", "Data infographics", "French fold pages"],
      materials: ["300gsm cover board", "150gsm silk interior", "Gold foil", "Linen texture"],
      order: 4,
    },
    {
      title: "Recipe Booklet",
      description: "Wire-bound recipe booklet with food-safe coated pages for artisan food brand.",
      category: "BOOK_MANUAL",
      images: ["/images/generated-1777523743844.png", "/images/generated-1777523756403.png"],
      features: ["Wire-O binding", "Food-safe coating", "Lay-flat pages", "Waterproof cover"],
      materials: ["350gsm cover", "130gsm coated interior", "Metal wire", "PE lamination"],
      order: 5,
    },
    {
      title: "Instruction Manual",
      description: "Multi-language instruction manual with clear diagrams and premium paper stock.",
      category: "BOOK_MANUAL",
      images: ["/images/generated-1777523743387.png", "/images/generated-1777523738769.png", "/images/generated-1777523744506.png"],
      features: ["Multi-language support", "Technical diagrams", "QR code links", "Tab dividers"],
      materials: ["250gsm cover", "100gsm woodfree interior", "PUR binding", "Tab card stock"],
      order: 6,
    },
    // LABEL
    {
      title: "Wine Label Collection",
      description: "Textured paper labels with hot foil and embossed vineyard crest.",
      category: "LABEL",
      images: ["/images/generated-1777523780146.png", "/images/generated-1777523793550.png", "/images/generated-1777523791401.png"],
      features: ["Hot foil stamping", "Embossed crest", "Textured substrate", "Water-resistant"],
      materials: ["Laid-texture paper", "Gold foil", "Embossing die", "Pressure-sensitive adhesive"],
      order: 1,
    },
    {
      title: "Cosmetic Product Labels",
      description: "Waterproof labels with metallic ink for luxury skincare line.",
      category: "LABEL",
      images: ["/images/generated-1777523789009.png", "/images/generated-1777523780465.png"],
      features: ["Waterproof finish", "Metallic ink accents", "Clear-on-clear option", "Custom die-cut"],
      materials: ["BOPP film", "Metallic ink", "UV-cured overcoat", "Permanent adhesive"],
      order: 2,
    },
    {
      title: "Artisan Food Labels",
      description: "Die-cut kraft labels with hand-drawn illustrations for organic food brand.",
      category: "LABEL",
      images: ["/images/generated-1777523780465.png", "/images/generated-1777523780146.png"],
      features: ["Custom die-cut shape", "Hand-drawn illustrations", "Eco-friendly materials", "Tamper-evident seal"],
      materials: ["Unbleached kraft paper", "Soy-based ink", "Compostable adhesive", "Recycled liner"],
      order: 3,
    },
    {
      title: "Spirits Bottle Labels",
      description: "Multi-layer labels with transparent elements for craft spirits brand.",
      category: "LABEL",
      images: ["/images/generated-1777523793550.png", "/images/generated-1777523789009.png", "/images/generated-1777523793097.png"],
      features: ["Multi-layer design", "Transparent elements", "Tactile varnish", "Sequential numbering"],
      materials: ["Clear BOPP", "Cotton paper", "Raised UV varnish", "Alcohol-resistant adhesive"],
      order: 4,
    },
    {
      title: "Candle Wrap Labels",
      description: "Full-wrap labels with soft-touch lamination for luxury candle brand.",
      category: "LABEL",
      images: ["/images/generated-1777523793097.png", "/images/generated-1777523793550.png"],
      features: ["Full-wrap application", "Soft-touch lamination", "Foil details", "Heat-resistant"],
      materials: ["Soft-touch film", "Silver foil", "Heat-resistant adhesive", "Semi-gloss stock"],
      order: 5,
    },
    {
      title: "Health Supplement Labels",
      description: "FDA-compliant labels with clean modern design for wellness brand.",
      category: "LABEL",
      images: ["/images/generated-1777523791401.png", "/images/generated-1777523780146.png", "/images/generated-1777523789009.png"],
      features: ["FDA-compliant layout", "Barcode integration", "Peel-back panel", "Spot gloss"],
      materials: ["White BOPP", "FDA-approved ink", "Extended content label", "Repositionable adhesive"],
      order: 6,
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        category: p.category,
        images: JSON.stringify(p.images),
        features: JSON.stringify(p.features),
        materials: JSON.stringify(p.materials),
        order: p.order,
      },
    });
  }
  console.log(`Seed completed: ${products.length} products`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
