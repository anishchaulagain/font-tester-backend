import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import fontRoutes from "./routes/font.routes";
import authRoutes from "./routes/auth.routes";
import { seedAdmin } from "./seeds/adminSeed";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

AppDataSource.initialize().then(async () => {
  await seedAdmin();

  app.use("/v1/fonts", fontRoutes);
  app.use("/v1/auth", authRoutes);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
