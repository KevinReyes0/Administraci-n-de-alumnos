import { Router } from "express";
import { check } from "express-validator";
import { crearCurso, mostrarCursos, deleteCourse, updateCourse } from "./courses.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    crearCurso
)

router.get("/", mostrarCursos)


router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check("id", "No es un id Valido").isMongoId(),
        validarCampos         
    ],
    deleteCourse
)

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole("TEACHER_ROLE"),
        check("id", "No es un id Valido").isMongoId(),
        validarCampos
    ],
    updateCourse
)

export default router;