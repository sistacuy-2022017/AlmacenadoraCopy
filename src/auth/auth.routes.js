import { Router } from "express";
import { check } from "express-validator";
import { login } from "./authController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { comporbarExistenciaUserName } from "../helpers/db-validators.js";
import { validarJWT } from "../helpers/validar-jwt.js";
import { validarLogin } from "../middlewares/validarLogin.js";

const router = Router();

//Login
router.post(
    '/login',
    [
        check('userName', 'El userName es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('userName').custom(comporbarExistenciaUserName),
        validarCampos
    ],
    login
)


export default router;