import {Router} from "express";

import {check} from "express-validator";

import {getUsers, updateUser, updatePassword, deleteUser, asignarCurso, getUserById} from './user.controller.js';

import {existeUsuarioById} from '../helpers/db.validator.js';
import {validarCampos} from '../middlewares/validar-campos.js';


import { validarJWT } from "../middlewares/validar-jwt.js"; 


const router = Router();

router.get("/", getUsers)

router.get(
    "/findeUser/:id",
    [
        check("id", "No es un Id valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    getUserById
)

router.put(
    "/:id",
    [
        check("id", "No es un Id valido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updateUser
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un Id válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    deleteUser
)

router.put(
    "/passwordUpdate/:id",
    [
        check("id", "No es un Id válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    updatePassword
) 

router.put(
    "/asignarCurso/:id",
    [
        check("id", "No es un Id válido").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ],
    asignarCurso
) 


export default router;