import { Request, Response } from "express";
import { createFontSchema, updateFontSchema } from "../validators/font.schema";
import { handleError } from "../utils/helper.errorhandler";
import { fontRepo } from "../repositories/fonts.repository";

export const getFonts = async (_: Request, res: Response): Promise<void> => {
  try {
    const fonts = await fontRepo.find();
    res.status(200).json({ message: "Fonts fetched successfully", data: fonts });
  } catch (err) {
    handleError(res, err, "Error fetching fonts");
  }
};

export const createFont = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, subsets, google_fonts_url } = req.body;
    const result = createFontSchema.safeParse({ name, category, subsets, google_fonts_url });
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors });
      return;
    }
    const existingFont = await fontRepo.findOneBy({ name });
    if (existingFont) {
      res.status(400).json({ message: "A font with the same name already exists" });
      return;
    }

    const newFont = fontRepo.create(result.data);
    await fontRepo.save(newFont);
    res.status(201).json({ message: "Font created successfully", data: newFont });
  } catch (err) {
    handleError(res, err, "Error creating font");
  }
};

export const updateFont = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const font = await fontRepo.findOneBy({ id });

    if (!font) {
      res.status(404).json({ message: "Font not found" });
      return;
    }

    const { name, category, subsets, google_fonts_url } = req.body;

    const result = updateFontSchema.safeParse({
      name,
      category,
      subsets,
      google_fonts_url,
    });

    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors });
      return;
    }

    font.name = name;
    font.category = category;
    font.subsets = subsets;
    font.google_fonts_url = google_fonts_url;

    await fontRepo.save(font);
    res.status(200).json({ message: "Font updated successfully", data: font });
  } catch (err) {
    handleError(res, err, "Error updating font");
  }
};

export const deleteFont = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const font = await fontRepo.findOneBy({ id });

    if (!font) {
      res.status(404).json({ message: "Font not found" });
      return;
    }

    await fontRepo.remove(font);
    res.status(200).json({ message: "Font deleted successfully" });
  } catch (err) {
    handleError(res, err, "Error deleting font");
  }
};
