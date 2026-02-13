import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Created admin user:", admin.email);

  const categories = ["News", "Tutorial", "Update"];
  for (const name of categories) {
    const slug = name.toLowerCase();
    for (const locale of ["en", "sr"]) {
      const localName = locale === "sr" && name === "News" ? "Vesti"
        : locale === "sr" && name === "Tutorial" ? "Tutorijal"
        : locale === "sr" && name === "Update" ? "Ažuriranje"
        : name;
      await prisma.category.upsert({
        where: { slug_locale: { slug, locale } },
        update: {},
        create: { slug, locale, name: localName },
      });
    }
  }
  console.log("Created categories");

  const tags = ["nextjs", "react", "typescript", "prisma", "docker"];
  for (const name of tags) {
    for (const locale of ["en", "sr"]) {
      await prisma.tag.upsert({
        where: { slug_locale: { slug: name, locale } },
        update: {},
        create: { slug: name, locale, name },
      });
    }
  }
  console.log("Created tags");

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
