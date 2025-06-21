import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export const createFontSchema = z.object({
  name: z.string().min(1, "Font name is required").max(255, "Font name must be less than 255 characters"),
  category: z.string().min(1, "Category is required").max(100, "Category must be less than 100 characters"),
  subsets: z.array(z.string()).min(1, "At least one subset is required"),
  google_fonts_url: z.string().url("Please provide a valid Google Fonts URL"),
})

export const updateFontSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  subsets: z.array(z.string()).min(1, "At least one subset is required"),
  google_fonts_url: z.string().url("Must be a valid URL"),
});

export const fontIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Font ID must be a valid number").transform(Number),
})
