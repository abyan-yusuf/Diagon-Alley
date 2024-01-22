import { Router } from "express"
import { registerUser, loginUser, allUsers } from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js"

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', requireSignin, isAdmin, allUsers )

export default router