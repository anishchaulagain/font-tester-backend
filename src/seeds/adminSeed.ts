import { AppDataSource } from "../data-source";
import { AdminUser } from "../entities/AdminUser";
import bcrypt from "bcrypt";

export const seedAdmin = async (): Promise<void> => {
  const repo = AppDataSource.getRepository(AdminUser);
  const exists = await repo.findOneBy({ email: "anishadmin@example.com" });

  if (!exists) {
    const plainPassword = process.env.ADMIN_PASSWORD;
    if (!plainPassword) {
      console.error("ADMIN_PASSWORD not set in .env file");
      return;
    }
    const adminEmail = process.env.EMAIL
    if(!adminEmail){
      console.error('EMAIL not set in .env')
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const admin = repo.create({
      firstName: "Anish",
      lastName: "Chaulagain",
      email: adminEmail,
      password: hashedPassword,
    });
    await repo.save(admin);
    console.log("Admin user seeded.");
  }
  else{
    console.log("Admin already seeded!!")
  }
};
