import { AppDataSource } from '../data-source'; 
import { AdminUser } from '../entities/AdminUser';  

export const adminUserRepo = AppDataSource.getRepository(AdminUser);