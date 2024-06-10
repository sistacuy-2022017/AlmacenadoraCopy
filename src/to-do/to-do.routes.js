import { Router } from "express";
import { check } from "express-validator";
import { createToDo, viewToDo, deleteToDo, updateToDo } from "./to-do.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarLogin } from "../middlewares/validarLogin.js";
import { validarJWT } from "../helpers/validar-jwt.js";

const router = Router();

router.post('/createToDo',
    [
        validarJWT,
        check('nameTask', 'el nombre es obligatorio').not().isEmpty(),
        check('description', 'la descripción es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createToDo
);

router.put('/updateToDo/:id', updateToDo);

router.get('/viewToDo', viewToDo);

router.delete('/deleteToDo/:id', deleteToDo);


export default router;