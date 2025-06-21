import { AdminUser } from "../../entities/AdminUser";

declare global {
  namespace Express {
    interface Request {
      user?: AdminUser;
    }
  }
}
