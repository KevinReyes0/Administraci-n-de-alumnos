import { Router } from "express";
import { login, registerProfes, registerAlumnos } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validator.js";
import { deleteFileOnError } from "../middlewares/deleteFileOnErros.js";
 
const router = Router();
 
router.post(
    '/login',
    loginValidator,
    login
);
 
router.post(
    '/registerProfes',
    registerValidator,
    deleteFileOnError,
    registerProfes
);

router.post(
    '/registerAlumos',
    registerValidator,
    deleteFileOnError,
    registerAlumnos
);
 
 
export default router;