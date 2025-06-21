import { Request, Response } from "express";

import { comparePassword, generateToken } from "../utils/jwt";
import { loginSchema } from "../validators/font.schema";
import { adminUserRepo } from "../repositories/admin.repository";
import { handleError } from "../utils/helper.errorhandler";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
          const result = loginSchema.safeParse({ email, password});
          if (!result.success) {
      res.status(400).json({ errors: result.error.flatten().fieldErrors });
      return;
    }
        const user = await adminUserRepo.findOneBy({ email });

        if (!user || !(await comparePassword(password, user.password))) {
            res.status(401).json({ message: 'Please check your password and email and try again.' });
            return;
        }

        const token = generateToken({ id: user.id, email: user.email, role: "admin", });

        const { password: _, ...userWithoutPassword } = user;


        res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token,

        });
    } catch (err) {
        handleError(res, err, 'Login error');
    }
};