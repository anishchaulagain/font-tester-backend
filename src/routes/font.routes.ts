import { Router } from "express"
import { getFonts, createFont, updateFont, deleteFont } from '../controllers/font.controller' 
import { authenticate } from "../middleware/auth.middleware"  

const router = Router()

router.get("/", getFonts)
router.post("/", authenticate, createFont)
router.put("/:id", authenticate, updateFont)
router.delete("/:id", authenticate, deleteFont)

export default router
