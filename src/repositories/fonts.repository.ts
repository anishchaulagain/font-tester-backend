import { AppDataSource } from "../data-source";
import { Font } from "../entities/Fonts";


export const fontRepo = AppDataSource.getRepository(Font);